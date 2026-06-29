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
  const thumbGrid = document.getElementById('thumbGrid');
  const pvCount = document.getElementById('pvCount');
  const thumbCount = document.getElementById('thumbCount');

  function renderGalleries() {
    pvGrid.innerHTML = '';
    thumbGrid.innerHTML = '';
    let pCount = 0;
    let tCount = 0;
    
    portfolioData.forEach((item, index) => {
      const el = document.createElement('div');
      el.className = 'gallery-item';
      
      let mediaContent = '';
      if (item.category === 'pv') {
        mediaContent = `<iframe src="${item.mediaUrl}" title="${item.title || 'Video'}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        el.innerHTML = `
          <div class="item-media">${mediaContent}</div>
          <div class="item-title">${item.title || 'Video_' + index}</div>
        `;
        pvGrid.appendChild(el);
        pCount++;
      } else if (item.category === 'thumbnail') {
        mediaContent = `<img src="${item.mediaUrl}" alt="${item.title || 'Image'}">`;
        el.innerHTML = `
          <div class="item-media">${mediaContent}</div>
          <div class="item-title">${item.title || 'Image_' + index}</div>
        `;
        thumbGrid.appendChild(el);
        tCount++;
      }
    });

    if(pvCount) pvCount.textContent = `${pCount} object(s)`;
    if(thumbCount) thumbCount.textContent = `${tCount} object(s)`;
  }

  // Init Galleries
  renderGalleries();

  // 3. Taskbar Tabs (Bringing windows to front)
  const taskTabs = document.querySelectorAll('.task-tab');
  const pvWin = document.querySelector('.pv-window');
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

  document.getElementById('taskTabPv').addEventListener('click', () => {
    bringToFront(pvWin);
    document.querySelectorAll('.task-tab').forEach(t => t.classList.remove('active'));
    document.getElementById('taskTabPv').classList.add('active');
  });

  document.getElementById('taskTabThumb').addEventListener('click', () => {
    bringToFront(thumbWin);
    document.querySelectorAll('.task-tab').forEach(t => t.classList.remove('active'));
    document.getElementById('taskTabThumb').classList.add('active');
  });

  // 4. Retro Alert Box for Email Copy
  const emailLink = document.querySelector('.email-link');
  const alertBox = document.getElementById('alertBox');
  const alertMessage = document.getElementById('alertMessage');
  const closeAlertBox = document.getElementById('closeAlertBox');
  const confirmAlert = document.getElementById('confirmAlert');

  function showAlert(msg) {
    alertMessage.innerHTML = msg; // Allows html like <br>
    alertBox.classList.add('show');
  }

  function hideAlert() {
    alertBox.classList.remove('show');
  }

  closeAlertBox.addEventListener('click', hideAlert);
  confirmAlert.addEventListener('click', hideAlert);

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
