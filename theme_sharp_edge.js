document.addEventListener('DOMContentLoaded', () => {
  const galleryGrid = document.getElementById('galleryGrid');
  const tabs = document.querySelectorAll('.sharp-tab-btn');
  const pvCountEl = document.getElementById('pvCount');
  const thumbCountEl = document.getElementById('thumbCount');

  // Modal elements
  const modal = document.getElementById('sharpModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  // Theme Toggle elements
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeToggleText = document.getElementById('themeToggleText');

  let currentCategory = 'pv';

  // 1. Nordic Sharp Light Mode System (Light Mode Exclusive)
  document.documentElement.setAttribute('data-theme', 'light');
  localStorage.setItem('theme_sharp_mode', 'light');

  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // 2. Render Gallery Grid
  function renderGallery() {
    if (!galleryGrid) return;
    galleryGrid.innerHTML = '';

    let pvCount = 0;
    let thumbCount = 0;

    const shuffledData = shuffleArray(portfolioData);

    shuffledData.forEach((item, index) => {
      if (item.category === 'pv') pvCount++;
      if (item.category === 'thumbnail') thumbCount++;

      const article = document.createElement('article');
      article.className = 'sharp-card';
      article.dataset.category = item.category;
      article.dataset.index = index;

      let thumbSrc = '';
      if (item.category === 'pv') {
        thumbSrc = item.thumbnailUrl || (item.mediaUrl.match(/embed\/([^?]+)/) ? `https://img.youtube.com/vi/${item.mediaUrl.match(/embed\/([^?]+)/)[1]}/hqdefault.jpg` : '');
      } else {
        thumbSrc = item.mediaUrl;
      }

      article.innerHTML = `
        <div class="card-media-wrapper">
          <img src="${thumbSrc}" alt="${item.title || 'Portfolio item'}" loading="lazy">
          ${item.category === 'pv' ? `
            <div class="play-badge-overlay">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
          ` : ''}
        </div>
        <div class="card-content">
          <div class="card-title">${item.title || 'Untitled'}</div>
          <span class="card-category-badge">${item.category.toUpperCase()}</span>
        </div>
      `;

      // Open Modal on Card Click & Set Selected State
      article.addEventListener('click', () => {
        document.querySelectorAll('.sharp-card').forEach(c => c.classList.remove('selected'));
        article.classList.add('selected');
        openModal(item);
      });

      galleryGrid.appendChild(article);
    });

    if (pvCountEl) pvCountEl.textContent = pvCount;
    if (thumbCountEl) thumbCountEl.textContent = thumbCount;

    filterCategory(currentCategory);
  }

  // 3. Category Filter Logic
  function filterCategory(category) {
    currentCategory = category;
    const cards = document.querySelectorAll('.sharp-card');

    cards.forEach(card => {
      if (card.dataset.category === category) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });

    tabs.forEach(t => {
      t.classList.toggle('active', t.dataset.target === category);
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetCategory = tab.dataset.target;
      filterCategory(targetCategory);

      if (typeof window.gtag === 'function') {
        window.gtag('event', 'switch_portfolio_tab', {
          'tab_category': targetCategory
        });
      }
    });
  });

  // 4. Modal Viewer Logic
  function openModal(item) {
    if (!modal || !modalBody || !modalTitle) return;

    modalTitle.textContent = item.title ? `[${item.category.toUpperCase()}] ${item.title}` : 'MEDIA VIEWER';
    modalBody.innerHTML = '';

    if (item.category === 'pv') {
      const videoEmbedUrl = item.mediaUrl.includes('?') ? `${item.mediaUrl}&autoplay=1` : `${item.mediaUrl}?autoplay=1&enablejsapi=1`;
      modalBody.innerHTML = `<iframe src="${videoEmbedUrl}" title="${item.title || 'YouTube Video'}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    } else {
      modalBody.innerHTML = `<img src="${item.mediaUrl}" alt="${item.title || 'Full size image'}">`;
    }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'view_portfolio_item', {
        'item_title': item.title,
        'item_category': item.category
      });
    }
  }

  function closeModal() {
    if (!modal || !modalBody) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    setTimeout(() => {
      modalBody.innerHTML = ''; // Stop video playback
    }, 200);
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // 5. External Link GA4 Event Handlers
  const scheduleBtn = document.querySelector('.schedule-btn');
  if (scheduleBtn) {
    scheduleBtn.addEventListener('click', () => {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'click_schedule', {
          'event_category': 'Engagement',
          'event_label': 'Work Schedule'
        });
      }
    });
  }

  const commissionBtn = document.querySelector('.commission-btn');
  if (commissionBtn) {
    commissionBtn.addEventListener('click', () => {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'click_commission', {
          'event_category': 'Engagement',
          'event_label': 'View Commission Prices'
        });
      }
    });
  }

  const socialIcons = document.querySelectorAll('.social-icon');
  socialIcons.forEach(icon => {
    icon.addEventListener('click', () => {
      const platform = icon.getAttribute('aria-label');
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'click_social_outbound', {
          'platform_name': platform
        });
      }
    });
  });

  // 6. Toast Notification Helper
  function showToast(message, x, y) {
    let toast = document.getElementById('toastNotification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastNotification';
      toast.className = 'toast-notification';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    
    if (typeof x === 'number' && typeof y === 'number') {
      toast.style.left = `${x}px`;
      toast.style.top = `${y}px`;
    } else {
      toast.style.left = '50%';
      toast.style.top = '20px';
    }
    
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  }

  // 7. Email Copy Logic
  const emailLink = document.querySelector('.email-link');
  if (emailLink) {
    emailLink.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'wkjnaver@gmail.com';
      
      const mouseX = e.pageX;
      const mouseY = e.pageY;
      
      navigator.clipboard.writeText(email).then(() => {
        showToast('COPIED!', mouseX, mouseY);
        
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'click_contact_email', {
            'email_address': email,
            'copy_status': 'success'
          });
        }
      }).catch(err => {
        console.error('Failed to copy email:', err);
        window.location.href = `mailto:${email}`;
        
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'click_contact_email', {
            'email_address': email,
            'copy_status': 'failed'
          });
        }
      });
    });

    emailLink.addEventListener('copy', () => {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'copy_contact_email', {
          'email_address': 'wkjnaver@gmail.com'
        });
      }
    });
  }

  // 8. Email Promo Banner Localization & Close
  const userLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
  const emailPromoEl = document.getElementById('emailPromo');
  const emailPromoPopup = document.getElementById('emailPromoPopup');
  const urlParams = new URLSearchParams(window.location.search);
  const isNoPromo = document.documentElement.classList.contains('no-promo') || 
                    urlParams.has('nopromo') || 
                    urlParams.get('promo') === 'false' || 
                    urlParams.get('promo') === '0' || 
                    urlParams.get('promo') === 'off' || 
                    urlParams.has('nopopup') || 
                    urlParams.has('clean') || 
                    urlParams.has('no_promo');

  // 이벤트 종료 - 프로모 팝업 숨김 처리
  if (emailPromoPopup) {
    emailPromoPopup.style.display = 'none';
  }

  const closePromoBtn = document.getElementById('closePromoBtn');
  if (closePromoBtn && emailPromoPopup) {
    closePromoBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      emailPromoPopup.style.display = 'none';
    });
  }

  // Initialize
  renderGallery();
});
