/**
 * WAVIT_studio Nordic Sharp OS - i18n Multilingual Engine (KR / JP / EN)
 */

const I18N_TRANSLATIONS = {
  ko: {
    system: {
      booting: "NORDIC_SHARP /// OS 초기화 중...",
      profileTitle: "[SYS.PROFILE] WAVIT_studio",
      portfolioTitle: "[SYS.PORTFOLIO] 포트폴리오 아카이브",
      scheduleTitle: "[SYS.SCHEDULE] 작업 일정 트래커",
      quoteTitle: "[SYS.QUOTE] 커미션 단가표",
      mediaViewer: "미디어 뷰어",
      sysNotification: "시스템 알림",
      confirm: "확인"
    },
    dock: {
      profile: "프로필",
      portfolio: "포트폴리오",
      schedule: "작업일정",
      prices: "가격안내"
    },
    profile: {
      tagline: "MV Design.",
      bio: "문의는 메일, X 등 편하신 방법으로 부탁드립니다.",
      copyEmail: "이메일 복사 (wkjnaver@gmail.com)",
      copiedEmail: "이메일 주소가 클립보드에 복사되었습니다!"
    },
    portfolio: {
      tabPv: "PV 영상",
      tabThumb: "썸네일",
      countTag: "{count}개 항목",
      watchYoutube: "유튜브에서 보기 ↗"
    },
    meta: {
      description: "WAVIT_studio — MV Design. PV, MV, Live2D & Graphic Design Portfolio."
    }
  },
  ja: {
    system: {
      booting: "NORDIC_SHARP /// OS 初期化中...",
      profileTitle: "[SYS.PROFILE] WAVIT_studio",
      portfolioTitle: "[SYS.PORTFOLIO] ポートフォリオ アーカイブ",
      scheduleTitle: "[SYS.SCHEDULE] 制作スケジュール",
      quoteTitle: "[SYS.QUOTE] 依頼・料金表 Guide",
      mediaViewer: "メディアビューア",
      sysNotification: "システム通知",
      confirm: "確認"
    },
    dock: {
      profile: "プロフィール",
      portfolio: "作品集",
      schedule: "日程表",
      prices: "料金表"
    },
    profile: {
      tagline: "MV Design.",
      bio: "お問い合わせはメール、Xなどご都合の良い方法でお願いいたします。",
      copyEmail: "メールアドレスをコピー (wkjnaver@gmail.com)",
      copiedEmail: "メールアドレスをクリップボードにコピーしました！"
    },
    portfolio: {
      tabPv: "PV 映像",
      tabThumb: "サムネイル",
      countTag: "{count}個の作品",
      watchYoutube: "YouTubeで見る ↗"
    },
    meta: {
      description: "WAVIT_studio — MV Design. PV, MV, Live2D & グラフィックデザイン ポートフォリオ。"
    }
  },
  en: {
    system: {
      booting: "NORDIC_SHARP /// INITIALIZING OS...",
      profileTitle: "[SYS.PROFILE] WAVIT_studio",
      portfolioTitle: "[SYS.PORTFOLIO] PORTFOLIO ARCHIVE",
      scheduleTitle: "[SYS.SCHEDULE] WORK SCHEDULE TRACKER",
      quoteTitle: "[SYS.QUOTE] COMMISSION PRICING GUIDE",
      mediaViewer: "MEDIA VIEWER",
      sysNotification: "SYSTEM NOTIFICATION",
      confirm: "CONFIRM"
    },
    dock: {
      profile: "PROFILE",
      portfolio: "PORTFOLIO",
      schedule: "SCHEDULE",
      prices: "PRICES"
    },
    profile: {
      tagline: "MV Design.",
      bio: "Please feel free to contact via email, X, or any preferred method.",
      copyEmail: "COPY EMAIL (wkjnaver@gmail.com)",
      copiedEmail: "EMAIL COPIED TO CLIPBOARD!"
    },
    portfolio: {
      tabPv: "PV VIDEO",
      tabThumb: "THUMBNAIL",
      countTag: "{count} OBJECT(S)",
      watchYoutube: "WATCH ON YOUTUBE ↗"
    },
    meta: {
      description: "WAVIT_studio — MV Design. PV, MV, Live2D & Graphic Design Portfolio. Contact & Commissions Available (KR / JP / EN)."
    }
  }
};

class I18nEngine {
  constructor() {
    this.supportedLanguages = ['ko', 'ja', 'en'];
    this.defaultLanguage = 'ko';
    this.currentLanguage = this.resolveInitialLanguage();
    this.listeners = [];
  }

  /**
   * Resolution Hierarchy:
   * 1. URL Query Parameter (?lang=ja or ?lang=ko or ?lang=en)
   * 2. LocalStorage ('wavit_lang')
   * 3. Browser Navigator Language (e.g. ja-JP -> ja, ko-KR -> ko)
   * 4. Default Fallback ('ko')
   */
  resolveInitialLanguage() {
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang')?.toLowerCase();
    if (urlLang && this.supportedLanguages.includes(urlLang)) {
      localStorage.setItem('wavit_lang', urlLang);
      return urlLang;
    }

    const savedLang = localStorage.getItem('wavit_lang')?.toLowerCase();
    if (savedLang && this.supportedLanguages.includes(savedLang)) {
      return savedLang;
    }

    const navLang = navigator.language || navigator.userLanguage;
    if (navLang) {
      const primaryLang = navLang.split('-')[0].toLowerCase();
      if (this.supportedLanguages.includes(primaryLang)) {
        return primaryLang;
      }
    }

    return this.defaultLanguage;
  }

  get(keyPath, params = {}) {
    const keys = keyPath.split('.');
    let value = I18N_TRANSLATIONS[this.currentLanguage];
    
    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        // Fallback to defaultLanguage
        let fallback = I18N_TRANSLATIONS[this.defaultLanguage];
        for (const fk of keys) {
          if (fallback && fallback[fk] !== undefined) {
            fallback = fallback[fk];
          } else {
            return keyPath;
          }
        }
        value = fallback;
        break;
      }
    }

    if (typeof value === 'string' && params) {
      Object.keys(params).forEach(p => {
        value = value.replace(new RegExp(`\\{${p}\\}`, 'g'), params[p]);
      });
    }

    return value;
  }

  setLanguage(lang) {
    if (!this.supportedLanguages.includes(lang)) return;
    if (this.currentLanguage === lang) return;

    this.currentLanguage = lang;
    localStorage.setItem('wavit_lang', lang);

    // Sync URL parameter without reload
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    window.history.replaceState(null, '', url.toString());

    if (typeof window.triggerBootTransition === 'function') {
      window.triggerBootTransition(() => {
        this.updateDOM();
        this.notifyListeners();
      });
    } else {
      this.updateDOM();
      this.notifyListeners();
    }
  }

  updateDOM() {
    // 1. Update html lang attribute
    document.documentElement.lang = this.currentLanguage;

    // 2. Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', this.get('meta.description'));
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', this.get('meta.description'));
    }

    // 3. Update element texts with data-i18n
    const i18nElements = document.querySelectorAll('[data-i18n]');
    i18nElements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      const htmlFlag = el.hasAttribute('data-i18n-html');
      const val = this.get(key);
      
      if (htmlFlag) {
        el.innerHTML = val;
      } else {
        el.textContent = val;
      }
    });

    // 4. Update element attributes with data-i18n-attr (e.g. title:key.path;aria-label:key.path)
    const attrElements = document.querySelectorAll('[data-i18n-attr]');
    attrElements.forEach(el => {
      const attrRule = el.getAttribute('data-i18n-attr');
      // Format: "attrName:keyPath;attrName2:keyPath2"
      const pairs = attrRule.split(';');
      pairs.forEach(pair => {
        const [attr, key] = pair.split(':').map(s => s.trim());
        if (attr && key) {
          el.setAttribute(attr, this.get(key));
        }
      });
    });

    // 5. Update active class on language selectors & mobile dropdown items
    const langBtns = document.querySelectorAll('.lang-btn, .lang-dropdown-item');
    langBtns.forEach(btn => {
      if (btn.getAttribute('data-lang') === this.currentLanguage) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });

    const pillText = document.getElementById('currentLangPillText');
    if (pillText) {
      pillText.textContent = this.currentLanguage.toUpperCase();
    }

    const isNoPromo = document.documentElement.classList.contains('no-promo');

    // 6. Update external iframe parameters if loaded
    const iframeSchedule = document.getElementById('iframe-schedule');
    if (iframeSchedule && iframeSchedule.getAttribute('data-src')) {
      const baseSrc = iframeSchedule.getAttribute('data-src').split('?')[0];
      iframeSchedule.setAttribute('data-src', `${baseSrc}?lang=${this.currentLanguage}`);
      if (iframeSchedule.src) {
        iframeSchedule.src = `${baseSrc}?lang=${this.currentLanguage}`;
      }
    }
    const iframeQuote = document.getElementById('iframe-quote');
    if (iframeQuote && iframeQuote.getAttribute('data-src')) {
      const baseSrc = iframeQuote.getAttribute('data-src').split('?')[0];
      const params = isNoPromo ? `embedded=true&lang=${this.currentLanguage}` : `lang=${this.currentLanguage}`;
      const quoteUrl = `${baseSrc}?${params}`;
      iframeQuote.setAttribute('data-src', quoteUrl);
      if (iframeQuote.src) {
        iframeQuote.src = quoteUrl;
      }
    }

    // 7. Update win-quote external link button data-url conditionally
    const quoteExtBtn = document.querySelector('#win-quote .external-link-btn');
    if (quoteExtBtn) {
      const baseSrc = 'https://wavykhy.github.io/WAVIT-quote/';
      const params = isNoPromo ? `embedded=true&lang=${this.currentLanguage}` : `lang=${this.currentLanguage}`;
      quoteExtBtn.setAttribute('data-url', `${baseSrc}?${params}`);
    }
  }

  onLanguageChange(callback) {
    if (typeof callback === 'function') {
      this.listeners.push(callback);
    }
  }

  notifyListeners() {
    this.listeners.forEach(cb => cb(this.currentLanguage));
  }
}

// Global Singleton Instance
window.i18n = new I18nEngine();

document.addEventListener('DOMContentLoaded', () => {
  window.i18n.updateDOM();
});
