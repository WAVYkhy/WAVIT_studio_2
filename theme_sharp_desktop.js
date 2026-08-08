document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. Boot Screen Animation
  // ==========================================
  const bootOverlay = document.getElementById('bootOverlay');
  const bootProgressBar = document.getElementById('bootProgressBar');

  if (bootProgressBar) {
    setTimeout(() => {
      bootProgressBar.style.width = '100%';
    }, 50);
  }

  if (bootOverlay) {
    setTimeout(() => {
      bootOverlay.classList.add('hidden');
    }, 850);
  }

  // ==========================================
  // 2. KST Clock Display
  // ==========================================
  const sysClock = document.getElementById('sys-clock');
  function updateClock() {
    if (!sysClock) return;
    const now = new Date();
    // KST time formatting
    const options = {
      timeZone: 'Asia/Seoul',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    const timeStr = new Intl.DateTimeFormat('en-US', options).format(now);
    sysClock.textContent = `${timeStr} KST`;
  }
  setInterval(updateClock, 1000);
  updateClock();

  // ==========================================
  // 3. Nordic Sharp Light Mode System (Light Mode Exclusive)
  // ==========================================
  const htmlEl = document.documentElement;
  htmlEl.setAttribute('data-theme', 'light');
  localStorage.setItem('nordic-theme', 'light');

  // ==========================================
  // 4. Window Manager State & Logic
  // ==========================================
  let zIndexCounter = 100;
  const lastCustomPositions = {};
  
  const windowDefs = [
    { id: 'win-profile', name: 'Profile', defaultOpen: true },
    { id: 'win-portfolio', name: 'Portfolio Archive', defaultOpen: true },
    { id: 'win-schedule', name: 'Work Schedule', defaultOpen: false },
    { id: 'win-quote', name: 'Commission Prices', defaultOpen: false }
  ];

  const windows = document.querySelectorAll('.os-window');
  const taskTabsContainer = document.getElementById('taskTabsContainer');

  // Center Portfolio Window proportionally to screen resolution (FHD, QHD, 4K)
  function centerPortfolioWindow(targetWin) {
    const win = targetWin || document.getElementById('win-portfolio');
    if (!win) return;
    if (window.innerWidth <= 1024) return; // Desktop only

    // Restore last user-dragged position if user previously moved/resized this window
    if (lastCustomPositions[win.id]) {
      const pos = lastCustomPositions[win.id];
      if (pos.left) win.style.left = pos.left;
      if (pos.top) win.style.top = pos.top;
      if (pos.width) win.style.width = pos.width;
      if (pos.height) win.style.height = pos.height;
      return;
    }

    const desktopArea = document.querySelector('.desktop-area');
    const areaWidth = desktopArea ? desktopArea.clientWidth : window.innerWidth;
    const areaHeight = desktopArea ? desktopArea.clientHeight : (window.innerHeight - 48);

    // Dynamic width & height proportional to resolution
    // FHD (1920): ~1114x700px, QHD (2560): ~1485x946px, 4K (3840): ~2000x1300px
    const targetW = Math.min(2000, Math.max(760, Math.round(areaWidth * 0.58)));
    const targetH = Math.min(1300, Math.max(520, Math.round(areaHeight * 0.68)));

    const left = Math.max(20, Math.round((areaWidth - targetW) / 2));
    const top = Math.max(20, Math.round((areaHeight - targetH) / 2));

    win.style.width = `${targetW}px`;
    win.style.height = `${targetH}px`;
    win.style.left = `${left}px`;
    win.style.top = `${top}px`;
  }

  // Smart Grid Search: Calculates desktop area with minimum overlap for newly opened windows
  function findLeastOverlappingPosition(targetWin) {
    if (window.innerWidth <= 1024) return; // Desktop only

    // Restore last user-dragged position if user previously moved/resized this window
    if (lastCustomPositions[targetWin.id]) {
      const pos = lastCustomPositions[targetWin.id];
      if (pos.left) targetWin.style.left = pos.left;
      if (pos.top) targetWin.style.top = pos.top;
      if (pos.width) targetWin.style.width = pos.width;
      if (pos.height) targetWin.style.height = pos.height;
      return;
    }

    // Always keep Portfolio window centered when opened (unless custom dragged)
    if (targetWin.id === 'win-portfolio') {
      centerPortfolioWindow(targetWin);
      return;
    }

    const desktopArea = document.querySelector('.desktop-area');
    const areaWidth = desktopArea ? desktopArea.clientWidth : window.innerWidth;
    const areaHeight = desktopArea ? desktopArea.clientHeight : window.innerHeight;

    const winRect = targetWin.getBoundingClientRect();
    const targetW = winRect.width || 480;
    const targetH = winRect.height || 400;

    // Gather currently active visible open windows
    const openWindows = Array.from(document.querySelectorAll('.os-window')).filter(w => {
      return w.id !== targetWin.id && 
             !w.classList.contains('hidden-win') && 
             !w.classList.contains('minimized');
    });

    if (openWindows.length === 0) {
      targetWin.style.left = '140px';
      targetWin.style.top = '40px';
      return;
    }

    let bestLeft = 140;
    let bestTop = 40;
    let minOverlapArea = Infinity;

    const minLeft = 140;
    const maxLeft = Math.max(minLeft, areaWidth - targetW - 20);
    const minTop = 40;
    const maxTop = Math.max(minTop, areaHeight - targetH - 60);

    const leftStep = 50;
    const topStep = 40;

    for (let candL = minLeft; candL <= maxLeft; candL += leftStep) {
      for (let candT = minTop; candT <= maxTop; candT += topStep) {
        let totalOverlap = 0;

        openWindows.forEach(openWin => {
          const r = openWin.getBoundingClientRect();
          const openL = parseInt(openWin.style.left, 10) || r.left;
          const openT = parseInt(openWin.style.top, 10) || r.top;
          const openR = openL + (r.width || 400);
          const openB = openT + (r.height || 300);

          const candR = candL + targetW;
          const candB = candT + targetH;

          const intersectL = Math.max(candL, openL);
          const intersectT = Math.max(candT, openT);
          const intersectR = Math.min(candR, openR);
          const intersectB = Math.min(candB, openB);

          if (intersectR > intersectL && intersectB > intersectT) {
            totalOverlap += (intersectR - intersectL) * (intersectB - intersectT);
          }
        });

        // Small tie-breaker for aesthetic top-left preference
        const score = totalOverlap + (candL * 0.01) + (candT * 0.01);

        if (score < minOverlapArea) {
          minOverlapArea = score;
          bestLeft = candL;
          bestTop = candT;
        }
      }
    }

    targetWin.style.left = `${bestLeft}px`;
    targetWin.style.top = `${bestTop}px`;
  }

  // Bring Window to Front
  function bringToFront(win) {
    if (!win) return;
    zIndexCounter++;
    win.style.zIndex = zIndexCounter;

    windows.forEach(w => w.classList.remove('active-win'));
    win.classList.add('active-win');
    
    updateTaskbarTabs();
  }

  // Open / Show Window
  function openWindow(winId) {
    const win = document.getElementById(winId);
    if (!win) return;

    // Mobile single-window mode: auto-minimize all other windows so ONLY 1 window is visible
    if (window.innerWidth <= 1024) {
      windows.forEach(w => {
        if (w.id !== winId) {
          w.classList.add('minimized');
          w.classList.remove('active-win');
        }
      });
    }

    const wasHidden = win.classList.contains('hidden-win');
    win.classList.remove('hidden-win', 'minimized');
    
    // Check for lazy iframe loading & skeleton hide
    const iframe = win.querySelector('iframe[data-src]');
    if (iframe) {
      const skeleton = win.querySelector('.iframe-skeleton');
      if (!iframe.src) {
        iframe.src = iframe.getAttribute('data-src');
      }
      if (skeleton && !skeleton.classList.contains('loaded')) {
        iframe.addEventListener('load', () => {
          skeleton.classList.add('loaded');
        }, { once: true });
        // Fallback hide after 4s
        setTimeout(() => {
          skeleton.classList.add('loaded');
        }, 4000);
      }
    }

    // Apply Smart Grid Placement when opening a previously closed window (desktop only)
    if (wasHidden) {
      findLeastOverlappingPosition(win);
    }

    bringToFront(win);

    // Auto-scroll window into view on mobile viewports for seamless UX
    if (window.innerWidth <= 1024) {
      setTimeout(() => {
        win.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  }




  // Minimize Window
  function minimizeWindow(win) {
    if (!win) return;
    win.classList.add('minimized');
    win.classList.remove('active-win');
    updateTaskbarTabs();
  }

  // Maximize / Restore Window
  function maximizeWindow(win) {
    if (!win) return;
    win.classList.toggle('maximized');
    bringToFront(win);
  }

  // Close Window
  function closeWindow(win) {
    if (!win) return;
    win.classList.add('hidden-win');
    win.classList.remove('active-win', 'maximized');
    updateTaskbarTabs();
  }

  // Bind Titlebar Controls & Window Mousedown
  windows.forEach(win => {
    win.addEventListener('mousedown', () => bringToFront(win));

    const expandBtn = win.querySelector('.expand-btn');
    const minBtn = win.querySelector('.min-btn');
    const maxBtn = win.querySelector('.max-btn');
    const closeBtn = win.querySelector('.close-btn');

    if (expandBtn) expandBtn.addEventListener('click', (e) => { e.stopPropagation(); win.classList.toggle('expanded-height'); bringToFront(win); });
    if (minBtn) minBtn.addEventListener('click', (e) => { e.stopPropagation(); minimizeWindow(win); });
    if (maxBtn) maxBtn.addEventListener('click', (e) => { e.stopPropagation(); maximizeWindow(win); });
    if (closeBtn) closeBtn.addEventListener('click', (e) => { e.stopPropagation(); closeWindow(win); });

    // Titlebar External Link Button
    const extBtn = win.querySelector('.external-link-btn');
    if (extBtn) {
      extBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const url = extBtn.getAttribute('data-url');
        if (url) window.open(url, '_blank', 'noopener,noreferrer');
      });
    }


    // Dragging Logic
    const titlebar = win.querySelector('.os-titlebar');
    if (titlebar) {
      let isDragging = false;
      let startX = 0;
      let startY = 0;

      titlebar.addEventListener('mousedown', (e) => {
        if (e.target.closest('.win-control-btn')) return;
        if (window.innerWidth <= 1024) return; // Disable drag on mobile
        if (win.classList.contains('maximized')) return;

        isDragging = true;
        document.body.classList.add('is-dragging');
        startX = e.clientX;
        startY = e.clientY;
        bringToFront(win);
      });

      document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        const rect = win.getBoundingClientRect();
        win.style.left = `${rect.left + deltaX}px`;
        win.style.top = `${rect.top + deltaY}px`;

        startX = e.clientX;
        startY = e.clientY;
      });

      document.addEventListener('mouseup', () => {
        if (isDragging) {
          isDragging = false;
          document.body.classList.remove('is-dragging');
          lastCustomPositions[win.id] = {
            left: win.style.left,
            top: win.style.top
          };
        }
      });
    }

    // 8-Direction Window Border Resizing Logic (Free Resizing & Narrow Height Stretch)
    const sides = ['t', 'r', 'b', 'l', 'tl', 'tr', 'bl', 'br'];
    sides.forEach(dir => {
      const handle = document.createElement('div');
      handle.className = `resize-handle resize-handle-${dir}`;
      if (dir === 'b') {
        const indicator = document.createElement('div');
        indicator.className = 'resize-indicator-bar';
        handle.appendChild(indicator);
      }
      win.appendChild(handle);

      function startResize(e) {
        const isNarrow = window.innerWidth <= 1024;
        // On narrow screen (<=1024), allow bottom border / bottom-corner vertical height resizing!
        if (isNarrow && !dir.includes('b')) return;
        if (win.classList.contains('maximized')) return;

        if (e.cancelable && e.type === 'touchstart') {
          e.preventDefault();
        }
        e.stopPropagation();

        win.classList.add('resizing');
        document.body.classList.add('is-resizing');
        bringToFront(win);

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const startMouseX = clientX;
        const startMouseY = clientY;
        const rect = win.getBoundingClientRect();
        const startW = rect.width;
        const startH = rect.height;
        const startL = rect.left;
        const startT = rect.top;
        const minW = 240;
        const minH = 200;

        function onMove(evt) {
          const moveX = evt.touches ? evt.touches[0].clientX : evt.clientX;
          const moveY = evt.touches ? evt.touches[0].clientY : evt.clientY;

          const deltaX = moveX - startMouseX;
          const deltaY = moveY - startMouseY;

          if (dir.includes('b')) {
            const newH = Math.max(minH, startH + deltaY);
            win.style.setProperty('height', `${newH}px`, 'important');
            win.classList.remove('expanded-height');
          }

          if (!isNarrow) {
            if (dir.includes('r')) {
              win.style.width = `${Math.max(minW, startW + deltaX)}px`;
            }
            if (dir.includes('l')) {
              const possibleW = startW - deltaX;
              if (possibleW >= minW) {
                win.style.width = `${possibleW}px`;
                win.style.left = `${startL + deltaX}px`;
              }
            }
            if (dir.startsWith('t')) {
              const possibleH = startH - deltaY;
              if (possibleH >= minH) {
                win.style.height = `${possibleH}px`;
                win.style.top = `${startT + deltaY}px`;
              }
            }
          }
        }

        function onEnd() {
          win.classList.remove('resizing');
          document.body.classList.remove('is-resizing');
          lastCustomPositions[win.id] = {
            left: win.style.left,
            top: win.style.top,
            width: win.style.width,
            height: win.style.height
          };
          document.removeEventListener('mousemove', onMove);
          document.removeEventListener('mouseup', onEnd);
          document.removeEventListener('touchmove', onMove);
          document.removeEventListener('touchend', onEnd);
        }

        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onEnd);
        document.addEventListener('touchmove', onMove, { passive: false });
        document.addEventListener('touchend', onEnd);
      }

      handle.addEventListener('mousedown', startResize);
      handle.addEventListener('touchstart', startResize, { passive: false });
    });

  });


  // ==========================================
  // Internal Portfolio Tab Switcher (PV vs Thumbnail)
  // ==========================================
  const portfolioTabBtns = document.querySelectorAll('.portfolio-tab-btn');
  portfolioTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      portfolioTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      document.querySelectorAll('.portfolio-tab-content').forEach(content => {
        content.classList.add('hidden');
        content.classList.remove('active');
      });

      const activeContent = document.getElementById(`tab-content-${targetTab}`);
      if (activeContent) {
        activeContent.classList.remove('hidden');
        activeContent.classList.add('active');
      }
    });
  });

  // ==========================================
  // Dock Click Handling (Static Clean Dock)
  // ==========================================
  const dockItems = document.querySelectorAll('.dock-item');

  // Dock Items Click Listeners
  dockItems.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      if (!targetId) return;
      const win = document.getElementById(targetId);
      if (!win) return;

      const isHidden = win.classList.contains('hidden-win');
      const isMinimized = win.classList.contains('minimized');
      const isActive = win.classList.contains('active-win') && !isMinimized && !isHidden;

      if (isHidden || isMinimized) {
        openWindow(targetId);
      } else if (isActive) {
        minimizeWindow(win);
      } else {
        openWindow(targetId);
      }
    });
  });

  // System Brand Button Opens Profile (if exists)
  const sysBrandBtn = document.getElementById('sysBrandBtn');
  if (sysBrandBtn) {
    sysBrandBtn.addEventListener('click', () => openWindow('win-profile'));
  }

  // Update Mobile Nav & macOS Dock Status
  const mobileNavBtns = document.querySelectorAll('.mobile-nav-btn');
  mobileNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      if (targetId) openWindow(targetId);
    });
  });

  function updateMobileNav() {
    const activeWin = document.querySelector('.os-window.active-win:not(.hidden-win):not(.minimized)');
    const activeId = activeWin ? activeWin.id : '';
    mobileNavBtns.forEach(btn => {
      if (btn.getAttribute('data-target') === activeId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  function updateDockButtons() {
    document.querySelectorAll('.dock-item, .dock-btn').forEach(btn => {
      const targetId = btn.getAttribute('data-target');
      if (!targetId) return;
      const win = document.getElementById(targetId);
      if (!win) return;

      const isHidden = win.classList.contains('hidden-win');
      const isMinimized = win.classList.contains('minimized');
      const isActive = win.classList.contains('active-win') && !isMinimized && !isHidden;
      const isOpen = !isHidden;

      if (isOpen) {
        btn.classList.add('is-open');
      } else {
        btn.classList.remove('is-open');
      }

      if (isActive) {
        btn.classList.add('is-active');
      } else {
        btn.classList.remove('is-active');
      }
    });
  }

  function updateTaskbarTabs() {
    updateMobileNav();
    updateDockButtons();
    if (!taskTabsContainer) return;
    taskTabsContainer.innerHTML = '';

    windowDefs.forEach(def => {
      const win = document.getElementById(def.id);
      if (!win) return;

      const isHidden = win.classList.contains('hidden-win');
      const isMinimized = win.classList.contains('minimized');
      const isActive = win.classList.contains('active-win') && !isMinimized && !isHidden;

      if (!isHidden) {
        const tab = document.createElement('button');
        tab.className = `task-tab ${isActive ? 'active' : ''}`;
        tab.textContent = def.name;
        tab.addEventListener('click', () => {
          if (isMinimized || !isActive) {
            openWindow(def.id);
          } else {
            minimizeWindow(win);
          }
        });
        taskTabsContainer.appendChild(tab);
      }
    });
  }

  // Initialize Default Windows State
  const isMobile = window.innerWidth <= 1024;
  windowDefs.forEach(def => {
    const win = document.getElementById(def.id);
    if (win) {
      if (isMobile) {
        if (def.id === 'win-profile') {
          win.classList.remove('hidden-win', 'minimized');
          win.classList.add('active-win');
        } else {
          win.classList.add('hidden-win');
          win.classList.remove('active-win');
        }
      } else {
        if (def.defaultOpen) {
          win.classList.remove('hidden-win', 'minimized');
        } else {
          win.classList.add('hidden-win');
        }
      }
    }
  });

  if (!isMobile) {
    centerPortfolioWindow();
  } else {
    windowDefs.forEach(def => {
      const win = document.getElementById(def.id);
      if (win) {
        win.style.left = '';
        win.style.top = '';
        win.style.width = '';
        win.style.height = '';
      }
    });
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
      centerPortfolioWindow();
    } else {
      windowDefs.forEach(def => {
        const win = document.getElementById(def.id);
        if (win) {
          win.style.left = '';
          win.style.top = '';
          win.style.width = '';
          win.style.height = '';
        }
      });
    }
  });

  updateTaskbarTabs();


  // ==========================================
  // 5. Portfolio Data Rendering & Lightbox
  // ==========================================
  const pvGrid = document.getElementById('pvGrid');
  const thumbGrid = document.getElementById('thumbGrid');
  const pvCountTag = document.getElementById('pvCountTag');
  const thumbCountTag = document.getElementById('thumbCountTag');

  const sharpModal = document.getElementById('sharpModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  function openModal(title, contentHtml) {
    if (modalTitle) modalTitle.textContent = title;
    if (modalBody) modalBody.innerHTML = contentHtml;
    if (sharpModal) {
      sharpModal.classList.add('active');
      sharpModal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeModal() {
    if (sharpModal) {
      sharpModal.classList.remove('active');
      sharpModal.setAttribute('aria-hidden', 'true');
    }
    if (modalBody) modalBody.innerHTML = '';
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (sharpModal) {
    sharpModal.addEventListener('click', (e) => {
      if (e.target === sharpModal) closeModal();
    });
  }

  function renderGalleries() {
    if (typeof portfolioData === 'undefined') return;

    let pCount = 0;
    let tCount = 0;

    if (pvGrid) pvGrid.innerHTML = '';
    if (thumbGrid) thumbGrid.innerHTML = '';

    portfolioData.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'gallery-item';

      if (item.category === 'pv' && pvGrid) {
        const videoId = item.mediaUrl.match(/embed\/([^?]+)/) ? item.mediaUrl.match(/embed\/([^?]+)/)[1] : '';
        const thumbSrc = item.thumbnailUrl || (videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '');
        
        card.innerHTML = `
          <div class="item-media">
            <img src="${thumbSrc}" alt="${item.title || 'Video'}" loading="lazy">
            <div class="play-overlay">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
          <div class="item-title">${item.title || 'PV_WORK_' + (index + 1)}</div>
        `;

        card.addEventListener('click', () => {
          document.querySelectorAll('.gallery-item').forEach(c => c.classList.remove('selected'));
          card.classList.add('selected');
          const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`;
          openModal(item.title || 'PV WORK', `<iframe src="${embedUrl}" allow="autoplay; encrypted-media" allowfullscreen></iframe>`);
        });

        pvGrid.appendChild(card);
        pCount++;
      } else if (item.category === 'thumbnail' && thumbGrid) {
        card.innerHTML = `
          <div class="item-media">
            <img src="${item.mediaUrl}" alt="${item.title || 'Thumbnail'}" loading="lazy">
          </div>
          <div class="item-title">${item.title || 'GRAPHIC_WORK_' + (index + 1)}</div>
        `;

        card.addEventListener('click', () => {
          document.querySelectorAll('.gallery-item').forEach(c => c.classList.remove('selected'));
          card.classList.add('selected');
          openModal(item.title || 'GRAPHIC WORK', `<img src="${item.mediaUrl}" alt="${item.title}">`);
        });

        thumbGrid.appendChild(card);
        tCount++;
      }
    });

    if (pvCountTag) pvCountTag.textContent = `${pCount} OBJECT(S)`;
    if (thumbCountTag) thumbCountTag.textContent = `${tCount} OBJECT(S)`;
  }

  renderGalleries();

  // ==========================================
  // 6. Copy Email & Alert Notification
  // ==========================================
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const alertBox = document.getElementById('alertBox');
  const alertMessage = document.getElementById('alertMessage');
  const closeAlertBox = document.getElementById('closeAlertBox');
  const confirmAlert = document.getElementById('confirmAlert');

  function showAlert(msg) {
    if (alertMessage && alertBox) {
      alertMessage.innerHTML = msg;
      alertBox.classList.add('show');
    }
  }

  function hideAlert() {
    if (alertBox) alertBox.classList.remove('show');
  }

  if (closeAlertBox) closeAlertBox.addEventListener('click', hideAlert);
  if (confirmAlert) confirmAlert.addEventListener('click', hideAlert);

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'wkjnaver@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showAlert('EMAIL COPIED TO CLIPBOARD.<br>Inquiries: wkjnaver@gmail.com');
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'click_contact_email', { 'email_address': email });
        }
      }).catch(() => {
        window.location.href = `mailto:${email}`;
      });
    });
  }

});
