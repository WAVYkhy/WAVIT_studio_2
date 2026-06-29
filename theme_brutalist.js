document.addEventListener('DOMContentLoaded', () => {
  const galleryGrid = document.getElementById('galleryGrid');
  const carouselControls = document.getElementById('carouselControls');
  const carouselDots = document.getElementById('carouselDots');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const limelightTabs = document.querySelectorAll('.limelight-btn');
  const indicator = document.getElementById('limelightIndicator');

  let currentThumbIndex = 0;
  let thumbCards = []; 

  // 1. data.js 기반 렌더링
  function renderGallery() {
    galleryGrid.innerHTML = '';
    thumbCards = [];

    portfolioData.forEach((item, index) => {
      const article = document.createElement('article');
      article.className = 'card';
      article.dataset.category = item.category;

      let mediaContent = '';
      if (item.category === 'pv') {
        mediaContent = `<iframe id="yt-player-${index}" src="${item.mediaUrl}" title="${item.title || 'YouTube video'}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      } else if (item.category === 'thumbnail') {
        mediaContent = `<img src="${item.mediaUrl}" alt="${item.title || 'Portfolio image'}">`;
      }

      article.innerHTML = `<div class="media-container">${mediaContent}</div>`;
      galleryGrid.appendChild(article);

      // 썸네일 카드는 따로 배열에 보관 (캐러셀 조작용)
      if (item.category === 'thumbnail') {
        thumbCards.push(article);
      }
    });

    // 썸네일 하단 닷(dot) 버튼 생성
    carouselDots.innerHTML = '';
    thumbCards.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.className = 'carousel-dot';
      dot.addEventListener('click', () => {
        currentThumbIndex = idx;
        updateCarousel();
        
        // [추가] 특정 번호의 닷 클릭 추적
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'interact_carousel', { 
            'action': 'click_dot',
            'target_index': idx 
          });
        }
      });
      carouselDots.appendChild(dot);
    });
  }

  // 🌟 Brutalist 캐러셀 상태 업데이트 (수평 스크롤)
  function updateCarousel() {
    // 닷(dot) 활성화 상태 변경
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentThumbIndex);
    });

    // 해당 카드로 스크롤 이동
    if (thumbCards[currentThumbIndex]) {
      thumbCards[currentThumbIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }


  // 2. 필터 기능 및 레이아웃 스위치
  function filterGallery(category) {
    if (category === 'pv') {
      galleryGrid.className = 'gallery-grid layout-grid';
      carouselControls.style.display = 'none'; // PV에서는 네비게이션 숨김
      
      // PV 카드의 인라인 스타일 초기화 (캐러셀 설정 지우기)
      const cards = document.querySelectorAll('.card');
      cards.forEach(card => {
        if (card.dataset.category === 'pv') {
          card.style.transform = '';
          card.style.zIndex = '';
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; }, 10);
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    } else if (category === 'thumbnail') {
      galleryGrid.className = 'gallery-grid layout-fan';
      carouselControls.style.display = 'flex'; // 네비게이션 표시
      
      const cards = document.querySelectorAll('.card');
      cards.forEach(card => {
        if (card.dataset.category === 'thumbnail') {
          card.style.display = 'block';
          setTimeout(() => { card.style.opacity = '1'; }, 10);
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
      
      updateCarousel(); // 캐러셀 위치 렌더링
    }
  }

  // 3. 이전 / 다음 화살표 버튼 로직
  prevBtn.addEventListener('click', () => {
    if (currentThumbIndex > 0) {
      currentThumbIndex--;
      updateCarousel();
      
      // [추가] 이전 버튼 클릭 추적
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'interact_carousel', { 'action': 'click_prev' });
      }
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentThumbIndex < thumbCards.length - 1) {
      currentThumbIndex++;
      updateCarousel();
      
      // [추가] 다음 버튼 클릭 추적
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'interact_carousel', { 'action': 'click_next' });
      }
    }
  });

  // 4. Limelight 탭 애니메이션 로직
  function updateIndicator(activeTab) {
    if (!activeTab || !indicator) return;
    indicator.style.width = `${activeTab.offsetWidth}px`;
    indicator.style.transform = `translateX(${activeTab.offsetLeft}px)`; 
  }

  // 초기 실행 설정
  renderGallery();
  const initialActiveTab = document.querySelector('.limelight-btn.active');
  if (initialActiveTab) {
    filterGallery(initialActiveTab.dataset.target);
    setTimeout(() => updateIndicator(initialActiveTab), 50); 
  }

  limelightTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      limelightTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      updateIndicator(tab);
      
      const targetCategory = tab.dataset.target; // 'pv' 또는 'thumbnail'
      filterGallery(targetCategory);

      // [여기에 GA4 이벤트 추가] 탭 클릭 시 이벤트 전송
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'switch_portfolio_tab', {
          'tab_category': targetCategory
        });
      }
    });
  });

  window.addEventListener('resize', () => {
    const currentActive = document.querySelector('.limelight-btn.active');
    updateIndicator(currentActive);
  });

  // 1. 커미션 단가표 클릭 추적
  const commissionBtn = document.querySelector('.btn-primary');
  if (commissionBtn) {
    commissionBtn.addEventListener('click', () => {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'click_commission', {
          'event_category': 'Engagement',
          'event_label': 'View Commission Prices'
        });
        console.log('GA4 이벤트 전송: click_commission'); // 개발자 도구 확인용
      }
    });
  }

  // 2. 외부 소셜 링크 클릭 추적
  const socialIcons = document.querySelectorAll('.social-icon');
  socialIcons.forEach(icon => {
    icon.addEventListener('click', () => {
      const platform = icon.getAttribute('aria-label'); // 예: "X logo", "Artmug" 등
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'click_social_outbound', {
          'platform_name': platform
        });
      }
    });
  });

  // Toast notification helper
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
    }
    
    toast.classList.add('show');
    
    // Reset layout transition state
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  }

  // 3. 이메일 클릭 및 복사 추적 + 클립보드 복사
  const emailLink = document.querySelector('.email-link');
  if (emailLink) {
    emailLink.addEventListener('click', (e) => {
      e.preventDefault(); // 기본 mailto 브라우저 반응 방지
      const email = 'wkjnaver@gmail.com';
      
      const mouseX = e.pageX;
      const mouseY = e.pageY;
      
      navigator.clipboard.writeText(email).then(() => {
        showToast('Copied!', mouseX, mouseY);
        
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'click_contact_email', {
            'email_address': email,
            'copy_status': 'success'
          });
        }
      }).catch(err => {
        console.error('Failed to copy email:', err);
        // 복사 실패 시 fallback으로 mailto 실행
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

  // 4. 방문자 브라우저 언어 설정 추적
  const userLang = navigator.language || navigator.userLanguage;
  if (typeof window.gtag === 'function') {
    window.gtag('set', 'user_properties', {
      'user_language': userLang
    });
    window.gtag('event', 'user_language_config', {
      'browser_language': userLang
    });
  }

  // 5. System Clock Logic for Brutalist Header
  const sysClock = document.getElementById('sys-clock');
  if (sysClock) {
    function updateClock() {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      sysClock.textContent = `${h}:${m}:${s}`;
    }
    setInterval(updateClock, 1000);
    updateClock();
  }

});

// ==========================================
// [추가] YouTube Iframe Player API 및 추적 로직
// ==========================================

// 1. YouTube API 스크립트를 동적으로 로드합니다.
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let ytPlayers = []; // 생성된 플레이어 객체를 담을 배열

// 2. YouTube API가 준비되면 자동으로 실행되는 약속된 함수입니다.
function onYouTubeIframeAPIReady() {
  // 'youtube.com'이 포함된 모든 iframe을 찾습니다.
  const iframes = document.querySelectorAll('iframe[src*="youtube.com"]');
  
  iframes.forEach((iframe) => {
    // 각 iframe을 YouTube 플레이어 객체로 변환하고 이벤트를 연결합니다.
    const player = new YT.Player(iframe.id, {
      events: {
        'onStateChange': onPlayerStateChange
      }
    });
    ytPlayers.push(player);
  });
}

// 3. 영상의 상태가 변할 때마다 실행되는 함수입니다.
function onPlayerStateChange(event) {
  // 현재 재생 중인 영상의 제목을 가져옵니다.
  const videoData = event.target.getVideoData();
  const videoTitle = videoData ? videoData.title : 'Unknown Video';

  // 상태에 따라 GA4로 이벤트를 전송합니다.
  if (event.data === YT.PlayerState.PLAYING) {
    sendGA4VideoEvent('video_play', videoTitle);
    
  } else if (event.data === YT.PlayerState.PAUSED) {
    // 영상이 끝났을 때도 PAUSED 상태를 거치므로, 끝난 게 아닐 때만 일시정지로 판별합니다.
    const duration = event.target.getDuration();
    const currentTime = event.target.getCurrentTime();
    if (currentTime < duration) {
      sendGA4VideoEvent('video_pause', videoTitle);
    }
    
  } else if (event.data === YT.PlayerState.ENDED) {
    sendGA4VideoEvent('video_complete', videoTitle);
  }
}

// 4. GA4로 이벤트를 쏘는 공통 함수입니다.
function sendGA4VideoEvent(action, title) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'youtube_interaction', {
      'video_action': action, // play, pause, complete 중 하나
      'video_title': title    // 재생한 영상의 실제 유튜브 제목
    });
    console.log(`GA4 이벤트 전송됨: ${action} - ${title}`); // F12 개발자 도구 확인용
  }
}
