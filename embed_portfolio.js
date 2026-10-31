/**
 * WAVIT_studio - Embed Portfolio Standalone Controller
 * Dedicated script for standalone portfolio embedding (iframe / external embeds)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. URL Query Parameters Handling
  const urlParams = new URLSearchParams(window.location.search);
  const initialTab = urlParams.get('tab') || 'pv';
  const initialLang = urlParams.get('lang');
  const bgParam = urlParams.get('bg');

  if (bgParam === 'transparent') {
    document.documentElement.style.backgroundColor = 'transparent';
    document.body.style.backgroundColor = 'transparent';
  } else if (bgParam === 'white') {
    document.documentElement.style.backgroundColor = '#ffffff';
    document.body.style.backgroundColor = '#ffffff';
  }

  // Set Language if i18n is available
  if (window.i18n && initialLang && ['ko', 'ja', 'en'].includes(initialLang.toLowerCase())) {
    window.i18n.setLanguage(initialLang.toLowerCase());
  }

  // 2. Elements Selection
  const pvGrid = document.getElementById('pvGrid');
  const live2dGrid = document.getElementById('live2dGrid');
  const thumbGrid = document.getElementById('thumbGrid');

  const portfolioTabs = document.querySelectorAll('.portfolio-tab-btn');
  const tabContents = {
    pv: document.getElementById('tab-content-pv'),
    live2d: document.getElementById('tab-content-live2d'),
    thumb: document.getElementById('tab-content-thumb')
  };

  const modal = document.getElementById('sharpModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  // 3. Modal Functions
  function openModal(title, contentHtml) {
    if (!modal || !modalBody || !modalTitle) return;
    modalTitle.textContent = title;
    modalBody.innerHTML = contentHtml;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
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

  // 4. Data Processing (Group & Sort by Month Descending)
  function groupAndSortByMonth(data, category) {
    const items = data.filter(item => item.category === category);
    items.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

    const grouped = {};
    items.forEach(item => {
      const m = item.date ? item.date.substring(0, 7).replace('-', '.') : 'UNDATED';
      if (!grouped[m]) grouped[m] = [];
      grouped[m].push(item);
    });
    return grouped;
  }

  function getLocalizedTitle(item, currentLang) {
    if (item.title_i18n && item.title_i18n[currentLang]) {
      return item.title_i18n[currentLang];
    }
    return item.title || '';
  }

  // 5. Card Element Builder
  function createCardElement(item, index, currentLang) {
    const card = document.createElement('div');
    card.className = 'gallery-item';

    const localizedTitle = getLocalizedTitle(item, currentLang);
    card.title = localizedTitle;

    if (item.category === 'pv' || item.category === 'live2d') {
      const videoId = item.mediaUrl.match(/embed\/([^?]+)/) ? item.mediaUrl.match(/embed\/([^?]+)/)[1] : '';
      const thumbSrc = item.thumbnailUrl || (videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '');
      const prefix = item.category === 'pv' ? 'PV_WORK_' : 'LIVE2D_WORK_';

      card.innerHTML = `
        <div class="item-media">
          <img src="${thumbSrc}" alt="${localizedTitle || 'Video'}" loading="lazy">
          <div class="play-overlay">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
        <div class="item-title" title="${localizedTitle}">${localizedTitle || prefix + (index + 1)}</div>
      `;

      card.addEventListener('click', () => {
        document.querySelectorAll('.gallery-item').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`;
        const watchText = window.i18n ? window.i18n.get('portfolio.watchYoutube') : 'WATCH ON YOUTUBE ↗';

        if (typeof window.gtag === 'function') {
          window.gtag('event', 'youtube_interaction', {
            'action': 'open_modal',
            'video_id': videoId,
            'title': localizedTitle || item.title || (item.category.toUpperCase() + ' WORK')
          });
        }

        openModal(
          localizedTitle || (item.category.toUpperCase() + ' WORK'),
          `<iframe src="${embedUrl}" allow="autoplay; encrypted-media" allowfullscreen></iframe>
           <div class="modal-footer-link" style="margin-top: 12px; text-align: right;">
             <a href="https://youtu.be/${videoId}" target="_blank" rel="noopener noreferrer" style="color: var(--text-secondary); text-decoration: none; font-size: 12px; font-weight: 700; font-family: var(--font-mono);">${watchText}</a>
           </div>`
        );
      });
    } else if (item.category === 'thumbnail') {
      card.innerHTML = `
        <div class="item-media">
          <img src="${item.mediaUrl}" alt="${localizedTitle || 'Thumbnail'}" loading="lazy">
        </div>
        <div class="item-title" title="${localizedTitle}">${localizedTitle || 'THUMB_WORK_' + (index + 1)}</div>
      `;

      card.addEventListener('click', () => {
        document.querySelectorAll('.gallery-item').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');

        if (typeof window.gtag === 'function') {
          window.gtag('event', 'thumbnail_interaction', {
            'action': 'open_modal',
            'title': localizedTitle || item.title || 'THUMBNAIL WORK'
          });
        }

        openModal(
          localizedTitle || 'THUMBNAIL WORK',
          `<img src="${item.mediaUrl}" alt="${localizedTitle || 'Thumbnail'}" style="max-width: 100%; max-height: 75vh; object-fit: contain; display: block; margin: 0 auto; border-radius: var(--radius-sharp);">`
        );
      });
    }

    return card;
  }

  // 6. Category Container Renderer
  function renderCategoryContainer(container, category, currentLang) {
    if (!container || typeof portfolioData === 'undefined') return;
    container.innerHTML = '';

    const grouped = groupAndSortByMonth(portfolioData, category);
    const months = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

    if (months.length === 0) {
      container.innerHTML = '<div style="color: var(--text-muted); font-family: var(--font-mono); padding: 24px; text-align: center;">NO ITEMS FOUND</div>';
      return;
    }

    months.forEach(monthKey => {
      const items = grouped[monthKey];
      const section = document.createElement('div');
      section.className = 'month-section';
      section.setAttribute('data-month', monthKey);

      section.innerHTML = `
        <div class="month-header">
          <div class="minimal-text">${monthKey}</div>
          <div class="minimal-line"></div>
        </div>
      `;

      const grid = document.createElement('div');
      grid.className = 'month-gallery-grid';
      items.forEach((item, idx) => {
        const card = createCardElement(item, idx, currentLang);
        grid.appendChild(card);
      });

      section.appendChild(grid);
      container.appendChild(section);
    });
  }

  function renderGalleries() {
    if (typeof portfolioData === 'undefined') return;
    const currentLang = window.i18n ? window.i18n.currentLanguage : 'ko';

    renderCategoryContainer(pvGrid, 'pv', currentLang);
    renderCategoryContainer(live2dGrid, 'live2d', currentLang);
    renderCategoryContainer(thumbGrid, 'thumbnail', currentLang);
  }

  // 7. Tab Switching Logic
  function switchTab(targetTab) {
    portfolioTabs.forEach(b => {
      const isActive = b.getAttribute('data-tab') === targetTab;
      b.classList.toggle('active', isActive);
    });

    Object.keys(tabContents).forEach(key => {
      if (tabContents[key]) {
        if (key === targetTab) {
          tabContents[key].classList.remove('hidden');
          tabContents[key].classList.add('active');
        } else {
          tabContents[key].classList.add('hidden');
          tabContents[key].classList.remove('active');
        }
      }
    });

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'switch_embed_portfolio_tab', {
        'tab_category': targetTab
      });
    }
  }

  portfolioTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });

  // 8. Language Switcher (if present in header)
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      if (window.i18n && lang) {
        window.i18n.setLanguage(lang);
      }
    });
  });

  if (window.i18n) {
    window.i18n.onLanguageChange(() => {
      renderGalleries();
      // Update active state of lang buttons
      langButtons.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === window.i18n.currentLanguage);
      });
    });
  }

  // Initial Run
  renderGalleries();
  if (['pv', 'live2d', 'thumb'].includes(initialTab.toLowerCase())) {
    switchTab(initialTab.toLowerCase());
  }
});
