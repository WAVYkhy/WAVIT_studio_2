document.addEventListener('DOMContentLoaded', () => {
  // 1. Clock Logic
  const sysClock = document.getElementById('sys-clock');
  function updateClock() {
    const now = new Date();
    let h = now.getHours();
    const m = String(now.getMinutes()).padStart(2, '0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    sysClock.textContent = `${h}:${m} ${ampm}`;
  }
  setInterval(updateClock, 1000);
  updateClock();

  // 2. Gallery Rendering
  const pvGrid = document.getElementById('pvGrid');
  const live2dGrid = document.getElementById('live2dGrid');
  const thumbGrid = document.getElementById('thumbGrid');

  function renderGalleries() {
    if (pvGrid) pvGrid.innerHTML = '';
    if (live2dGrid) live2dGrid.innerHTML = '';
    if (thumbGrid) thumbGrid.innerHTML = '';
    
    portfolioData.forEach((item, index) => {
      const el = document.createElement('div');
      el.className = 'gallery-item';
      
      let mediaContent = '';
      if (item.category === 'pv') {
        const thumbSrc = item.thumbnailUrl || (item.mediaUrl.match(/embed\/([^?]+)/) ? `https://img.youtube.com/vi/${item.mediaUrl.match(/embed\/([^?]+)/)[1]}/hqdefault.jpg` : '');
        const targetUrl = item.videoUrl || item.mediaUrl;
        mediaContent = `<a href="${targetUrl}" target="_blank" rel="noopener noreferrer" class="pv-link"><img src="${thumbSrc}" alt="${item.title || 'Video'}"><div class="play-overlay"><svg width="40" height="40" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg></div></a>`;
        el.innerHTML = `
          <div class="item-media">${mediaContent}</div>
          <div class="item-title">${item.title || 'Video_' + index}</div>
        `;
        el.addEventListener('click', (e) => {
          if (!e.target.closest('a')) {
            window.open(targetUrl, '_blank', 'noopener,noreferrer');
          }
        });
        if (pvGrid) pvGrid.appendChild(el);
      } else if (item.category === 'live2d') {
        const thumbSrc = item.thumbnailUrl || (item.mediaUrl.match(/embed\/([^?]+)/) ? `https://img.youtube.com/vi/${item.mediaUrl.match(/embed\/([^?]+)/)[1]}/hqdefault.jpg` : '');
        const targetUrl = item.videoUrl || item.mediaUrl;
        mediaContent = `<a href="${targetUrl}" target="_blank" rel="noopener noreferrer" class="pv-link"><img src="${thumbSrc}" alt="${item.title || 'Video'}"><div class="play-overlay"><svg width="40" height="40" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg></div></a>`;
        el.innerHTML = `
          <div class="item-media">${mediaContent}</div>
          <div class="item-title">${item.title || 'Live2D_' + index}</div>
        `;
        el.addEventListener('click', (e) => {
          if (!e.target.closest('a')) {
            window.open(targetUrl, '_blank', 'noopener,noreferrer');
          }
        });
        if (live2dGrid) live2dGrid.appendChild(el);
      } else if (item.category === 'thumbnail') {
        const targetUrl = item.mediaUrl;
        mediaContent = `<a href="${targetUrl}" target="_blank" rel="noopener noreferrer" class="thumb-link"><img src="${targetUrl}" alt="${item.title || 'Image'}"></a>`;
        el.innerHTML = `
          <div class="item-media">${mediaContent}</div>
          <div class="item-title">${item.title || 'Image_' + index}</div>
        `;
        el.addEventListener('click', (e) => {
          if (!e.target.closest('a')) {
            window.open(targetUrl, '_blank', 'noopener,noreferrer');
          }
        });
        if (thumbGrid) thumbGrid.appendChild(el);
      }
    });
  }

  // Init Galleries
  renderGalleries();

  // 3. Taskbar Tabs (Bringing windows to front)
  const taskTabs = document.querySelectorAll('.task-tab');
  const pvWin = document.querySelector('.pv-window');
  const live2dWin = document.querySelector('.live2d-window');
  const thumbWin = document.querySelector('.thumb-window');

  // Activate a window visually
  function bringToFront(win) {
    if (!win) return;
    zIndexCounter++;
    win.style.zIndex = zIndexCounter;
    document.querySelectorAll('.os-titlebar').forEach(tb => tb.classList.remove('active-titlebar'));
    const titlebar = win.querySelector('.os-titlebar');
    if(titlebar) titlebar.classList.add('active-titlebar');
  }

  const taskTabPv = document.getElementById('taskTabPv');
  if (taskTabPv) {
    taskTabPv.addEventListener('click', () => {
      bringToFront(pvWin);
      document.querySelectorAll('.task-tab').forEach(t => t.classList.remove('active'));
      taskTabPv.classList.add('active');
    });
  }

  const taskTabLive2d = document.getElementById('taskTabLive2d');
  if (taskTabLive2d) {
    taskTabLive2d.addEventListener('click', () => {
      bringToFront(live2dWin);
      document.querySelectorAll('.task-tab').forEach(t => t.classList.remove('active'));
      taskTabLive2d.classList.add('active');
    });
  }

  const taskTabThumb = document.getElementById('taskTabThumb');
  if (taskTabThumb) {
    taskTabThumb.addEventListener('click', () => {
      bringToFront(thumbWin);
      document.querySelectorAll('.task-tab').forEach(t => t.classList.remove('active'));
      taskTabThumb.classList.add('active');
    });
  }

  // 4. Retro Alert Box for Email Copy
  const emailLink = document.querySelector('.email-link');
  const alertBox = document.getElementById('alertBox');
  const alertMessage = document.getElementById('alertMessage');
  const closeAlertBox = document.getElementById('closeAlertBox');
  const confirmAlert = document.getElementById('confirmAlert');

  function showAlert(msg) {
    if (alertMessage && alertBox) {
      alertMessage.innerHTML = msg; // Allows html like <br>
      alertBox.classList.add('show');
    }
  }

  function hideAlert() {
    if (alertBox) alertBox.classList.remove('show');
  }

  if (closeAlertBox) closeAlertBox.addEventListener('click', hideAlert);
  if (confirmAlert) confirmAlert.addEventListener('click', hideAlert);

  if (emailLink) {
    emailLink.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'wkjnaver@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showAlert('EMAIL COPIED TO CLIPBOARD.<br>Please wait warmly for a reply.');
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'click_contact_email', {
            'email_address': email,
            'copy_status': 'success'
          });
        }
      }).catch(() => {
        window.location.href = `mailto:${email}`;
      });
    });
  }

  // 5. Schedule button click tracking & email promo text
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

  const scheduleBtns = document.querySelectorAll('.schedule-btn, .schedule-icon-btn, .schedule-sticky-btn');
  scheduleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'click_schedule', {
          'event_category': 'Engagement',
          'event_label': 'Work Schedule'
        });
      }
    });
  });

  // 6. Simple Window Dragging (Desktop Only) - Bug Fixed
  const windows = document.querySelectorAll('.os-window:not(.alert-window)');
  let zIndexCounter = 50;

  windows.forEach(win => {
    const titlebar = win.querySelector('.os-titlebar');
    if (!titlebar) return;

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    // Bring to front on mousedown
    win.addEventListener('mousedown', () => {
      bringToFront(win);
      
      // Update taskbar based on which window is clicked
      if(win.classList.contains('pv-window')) {
        document.querySelectorAll('.task-tab').forEach(t => t.classList.remove('active'));
        const tab = document.getElementById('taskTabPv');
        if(tab) tab.classList.add('active');
      } else if(win.classList.contains('thumb-window')) {
        document.querySelectorAll('.task-tab').forEach(t => t.classList.remove('active'));
        const tab = document.getElementById('taskTabThumb');
        if(tab) tab.classList.add('active');
      }
    });

    titlebar.addEventListener('mousedown', (e) => {
      if (e.target.classList.contains('btn-deco')) return; // ignore clicks on close buttons
      if (window.innerWidth <= 1024) return; // Don't drag on mobile

      isDragging = true;
      // Use client coordinates directly to calculate deltas later
      offsetX = e.clientX;
      offsetY = e.clientY;
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      
      const deltaX = e.clientX - offsetX;
      const deltaY = e.clientY - offsetY;
      
      const style = window.getComputedStyle(win);
      const currentLeft = parseInt(style.left, 10) || 0;
      const currentTop = parseInt(style.top, 10) || 0;
      
      win.style.left = `${currentLeft + deltaX}px`;
      win.style.top = `${currentTop + deltaY}px`;
      
      offsetX = e.clientX;
      offsetY = e.clientY;
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
    });
  });
});
