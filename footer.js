// ========== ALMAYA FOOTER - AUTO-INITIALISATION ==========
(function () {
  'use strict';

  // ==========================================
  //  THEME MANAGER — مركزي، لا تكرار
  // ==========================================
  const AlmayaTheme = (function () {
    const STORAGE_KEY  = 'almaya-theme';
    const WHITE_CLASS  = 'white-theme';
    const BTN_CLASS    = 'theme-toggle-btn';
    const BTN_SELECTOR = '.' + BTN_CLASS;

    function _isWhite() {
      return document.body.classList.contains(WHITE_CLASS);
    }

    function _updateButtons() {
      document.querySelectorAll(BTN_SELECTOR).forEach(function (btn) {
        if (_isWhite()) {
          btn.innerHTML = '<i class="fas fa-sun"></i>';
          btn.setAttribute('title',      'التحويل للوضع الداكن');
          btn.setAttribute('aria-label', 'التحويل للوضع الداكن');
        } else {
          btn.innerHTML = '<i class="fas fa-moon"></i>';
          btn.setAttribute('title',      'التحويل للوضع الفاتح');
          btn.setAttribute('aria-label', 'التحويل للوضع الفاتح');
        }
      });
    }

    function applyTheme(theme) {
      if (theme === 'white') {
        document.body.classList.add(WHITE_CLASS);
      } else {
        document.body.classList.remove(WHITE_CLASS);
      }
      _updateButtons();
    }

    function loadSaved() {
      var saved = localStorage.getItem(STORAGE_KEY);
      applyTheme(saved === 'white' ? 'white' : 'dark');
    }

    function toggle() {
      var next = _isWhite() ? 'dark' : 'white';
      localStorage.setItem(STORAGE_KEY, next);
      applyTheme(next);
    }

    function _createButtonIfMissing() {
      if (document.querySelector(BTN_SELECTOR)) return;
      var btn = document.createElement('button');
      btn.className = BTN_CLASS;
      btn.setAttribute('aria-label', 'تغيير السمة');
      btn.setAttribute('title', 'تغيير السمة');
      btn.innerHTML = '<i class="fas fa-moon"></i>';
      document.body.appendChild(btn);
    }

    function _bindDelegatedClick() {
      document.addEventListener('click', function (e) {
        if (e.target.closest(BTN_SELECTOR)) {
          toggle();
        }
      });
    }

    function init() {
      // 1. طبق الثيم قبل أي render — يمنع الوميض
      loadSaved();

      // 2. عند جهوز DOM أنشئ الزر وربط events
      function onReady() {
        _createButtonIfMissing();
        _bindDelegatedClick();
        _updateButtons();
        console.log('🎨 AlmayaTheme ready');
      }

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', onReady);
      } else {
        onReady();
      }
    }

    return { init: init, toggle: toggle, applyTheme: applyTheme };
  })();

  // شغّل Theme Manager مباشرة — قبل أي شيء آخر
  AlmayaTheme.init();

  // ==========================================
  //  FOOTER HTML & CSS INJECTION
  // ==========================================
  console.log('🚀 Footer auto-loader start');

  function whenReady(callback) {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      setTimeout(callback, 1);
    } else {
      document.addEventListener('DOMContentLoaded', callback);
    }
  }

  whenReady(function () {
    if (document.getElementById('almayaFooter')) {
      console.log('ℹ️ Footer déjà présent');
      return;
    }

    // ---- CSS ----
    var style = document.createElement('style');
    style.textContent =
      '@import url("https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700&family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap");' +

      // Dark theme
      ':root{--gold:#C4A06A;--gold-light:#D4B896;--gold-dim:rgba(196,160,106,0.15);--bg:#1A1510;--bg2:#221C14;--text:#E8DDD0;--text-muted:#A89880;--text-dim:#8B7B68;--success:#25D366;--danger:#FF4757}' +

      // White theme
      'body.white-theme{--bg:#FDFCF8;--bg2:#F5F0E8;--text:#2A2218;--text-muted:#6B5F52;--text-dim:#8B7B68}' +

      // Footer base
      '.almaya-footer{position:relative;z-index:1;background:rgba(34,28,20,0.7);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-top:1px solid rgba(196,160,106,0.12);font-family:"Tajawal",sans-serif;direction:rtl;color:var(--text-dim);transition:background 0.5s ease,color 0.5s ease}' +

      // White footer
      'body.white-theme .almaya-footer{background:rgba(245,240,232,0.85)!important}' +
      'body.white-theme .almaya-footer__about,' +
      'body.white-theme .almaya-footer__contact-link,' +
      'body.white-theme .almaya-footer__list a,' +
      'body.white-theme .almaya-footer__bottom{color:#5A4E3C!important}' +
      'body.white-theme .almaya-footer__list a:hover,' +
      'body.white-theme .almaya-footer__contact-link:hover{color:#A07840!important}' +
      'body.white-theme .almaya-footer__social{border-color:rgba(160,120,64,0.2)!important;color:#5A4E3C!important}' +
      'body.white-theme .almaya-footer__social:hover{background:rgba(160,120,64,0.08)!important;border-color:rgba(160,120,64,0.4)!important}' +

      // Divider
      '.almaya-footer__divider{display:flex;align-items:center;justify-content:center;padding:0;position:relative}' +
      '.almaya-footer__divider::before,.almaya-footer__divider::after{content:"";flex:1;height:1px;background:linear-gradient(90deg,transparent,rgba(196,160,106,0.25),transparent)}' +
      '.almaya-footer__diamond{display:inline-block;width:8px;height:8px;background:var(--gold);transform:rotate(45deg);margin:0 1rem;flex-shrink:0;position:relative;top:-1px;opacity:0.7}' +

      // Inner grid
      '.almaya-footer__inner{max-width:1200px;margin:0 auto;padding:3rem 2rem 2rem;display:grid;grid-template-columns:2fr 1fr 1fr 1.2fr;gap:2rem;align-items:start}' +

      // Logo
      '.almaya-footer__logo{display:flex;align-items:center;gap:0.75rem;text-decoration:none;margin-bottom:1rem}' +
      '.almaya-footer__logo img{height:50px;width:auto;border-radius:8px;opacity:0.9;transition:opacity 0.3s}' +
      '.almaya-footer__logo:hover img{opacity:1}' +
      '.almaya-footer__logo-name{display:block;font-family:"Playfair Display","Cormorant Garamond",serif;font-size:1.15rem;font-weight:400;font-style:italic;color:var(--gold);letter-spacing:1.5px}' +
      '.almaya-footer__logo-tagline{display:block;font-family:"Tajawal",sans-serif;font-size:0.6rem;font-weight:300;letter-spacing:1.5px;color:var(--text-dim);margin-top:2px}' +
      '.almaya-footer__about{font-family:"Tajawal",sans-serif;font-size:0.72rem;font-weight:300;color:var(--text-dim);line-height:1.9;max-width:280px}' +

      // Columns
      '.almaya-footer__col-title{font-family:"Tajawal",sans-serif;font-size:0.6rem;letter-spacing:2.5px;text-transform:uppercase;color:var(--gold);margin-bottom:1.1rem;font-weight:600}' +
      '.almaya-footer__list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:0.6rem}' +
      '.almaya-footer__list a{font-family:"Tajawal",sans-serif;font-size:0.68rem;font-weight:400;letter-spacing:1.2px;color:var(--text-dim);text-decoration:none;transition:color 0.3s,padding-right 0.3s;display:inline-block}' +
      '.almaya-footer__list a:hover{color:var(--gold);padding-right:4px}' +

      // Contact
      '.almaya-footer__contact{list-style:none;padding:0;margin:0 0 1.25rem;display:flex;flex-direction:column;gap:0.65rem}' +
      '.almaya-footer__contact-link{display:flex;align-items:center;gap:8px;font-family:"Tajawal",sans-serif;font-size:0.68rem;font-weight:400;color:var(--text-dim);text-decoration:none;transition:color 0.3s}' +
      '.almaya-footer__contact-link:hover{color:var(--gold)}' +
      '.almaya-footer__contact-link i{font-size:0.9rem;width:16px;text-align:center}' +
      '.almaya-footer__icon--whatsapp{color:#25D366}' +
      '.almaya-footer__icon--mail{color:var(--gold)}' +

      // Socials
      '.almaya-footer__socials{display:flex;gap:0.6rem;align-items:center}' +
      '.almaya-footer__social{display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:8px;border:1px solid rgba(196,160,106,0.18);background:rgba(255,255,255,0.03);color:var(--text-dim);font-size:0.9rem;text-decoration:none;transition:color 0.3s,border-color 0.3s,background 0.3s,transform 0.3s}' +
      '.almaya-footer__social:hover{color:var(--gold);border-color:rgba(196,160,106,0.45);background:var(--gold-dim);transform:translateY(-3px)}' +
      '.almaya-footer__social--yt:hover{color:#FF0000;border-color:rgba(255,0,0,0.35);background:rgba(255,0,0,0.08)}' +

      // Bottom
      '.almaya-footer__bottom{max-width:1200px;margin:0 auto;padding:1.25rem 2rem;border-top:1px solid rgba(196,160,106,0.08);display:flex;align-items:center;justify-content:center;gap:0.75rem;font-family:"Tajawal",sans-serif;font-size:0.55rem;font-weight:300;letter-spacing:1px;color:var(--text-dim);flex-wrap:wrap;text-align:center}' +
      '.almaya-footer__bottom-sep{color:var(--gold);opacity:0.5;font-size:0.45rem}' +

      // Theme Toggle Button
      '.theme-toggle-btn{position:fixed;bottom:30px;right:30px;width:50px;height:50px;border-radius:50%;background:rgba(34,28,20,0.85);border:2px solid rgba(196,160,106,0.3);color:#C4A06A;font-size:1.2rem;cursor:pointer;z-index:9999;display:flex;align-items:center;justify-content:center;transition:all 0.4s cubic-bezier(0.175,0.885,0.32,1.275);box-shadow:0 4px 15px rgba(0,0,0,0.3);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);animation:almaya-theme-pulse 2s ease-in-out infinite}' +
      '.theme-toggle-btn:hover{transform:scale(1.1) rotate(15deg);border-color:#C4A06A;box-shadow:0 6px 25px rgba(196,160,106,0.25)}' +
      '.theme-toggle-btn:active{transform:scale(0.95)}' +
      'body.white-theme .theme-toggle-btn{background:rgba(255,255,255,0.92);border-color:rgba(160,120,64,0.3);color:#A07840;box-shadow:0 4px 15px rgba(0,0,0,0.1)}' +
      'body.white-theme .theme-toggle-btn:hover{border-color:#A07840;box-shadow:0 6px 25px rgba(160,120,64,0.2)}' +
      '@keyframes almaya-theme-pulse{0%,100%{box-shadow:0 4px 15px rgba(196,160,106,0.2)}50%{box-shadow:0 4px 25px rgba(196,160,106,0.4)}}' +

      // Responsive
      '@media(max-width:1000px){.almaya-footer__inner{grid-template-columns:1fr 1fr;gap:2rem}.almaya-footer__brand{grid-column:1/-1}.almaya-footer__about{max-width:100%}}' +
      '@media(max-width:600px){.almaya-footer__inner{grid-template-columns:1fr;padding:2rem 1.25rem 1.5rem;gap:1.75rem}.almaya-footer__bottom{padding:1rem 1.25rem;font-size:0.5rem}.theme-toggle-btn{bottom:20px;right:20px;width:44px;height:44px;font-size:1.1rem}}' +
      '@media(max-width:400px){.almaya-footer__inner{padding:1.5rem 1rem 1.25rem;gap:1.5rem}.almaya-footer__logo img{height:42px}.almaya-footer__social{width:30px;height:30px;font-size:0.8rem}}';

    document.head.appendChild(style);
    console.log('🎨 Footer CSS injecté');

    // ---- HTML ----
    var footerHTML =
      '<footer class="almaya-footer" id="almayaFooter">' +
        '<div class="almaya-footer__divider">' +
          '<span class="almaya-footer__diamond"></span>' +
        '</div>' +
        '<div class="almaya-footer__inner">' +

          // Col 1 — Brand
          '<div class="almaya-footer__brand">' +
            '<a href="index.html" class="almaya-footer__logo">' +
              '<img src="images/logo.jpg" alt="Almaya Couture" onerror="this.src=\'https://placehold.co/60x60/C4A06A/1A1510?text=AC\'">' +
              '<div>' +
                '<span class="almaya-footer__logo-name">Almaya Couture</span>' +
                '<span class="almaya-footer__logo-tagline">من أيادي الميمة لدارك</span>' +
              '</div>' +
            '</a>' +
            '<p class="almaya-footer__about">تصاميم مغربية أصيلة بلمسة عصرية — جلابة، قفطان، تكشيطة وأكثر، كل قطعة تحكي قصة.</p>' +
          '</div>' +

          // Col 2 — Navigation
          '<div class="almaya-footer__col">' +
            '<h4 class="almaya-footer__col-title">التصفح</h4>' +
            '<ul class="almaya-footer__list">' +
              '<li><a href="index.html">الرئيسية</a></li>' +
              '<li><a href="collections.html">المنتجات</a></li>' +
              '<li><a href="design.html">صممي قطعتك</a></li>' +
              '<li><a href="story.html">حكايتنا</a></li>' +
              '<li><a href="contact.html">اتصل بنا</a></li>' +
            '</ul>' +
          '</div>' +

          // Col 3 — Legal
          '<div class="almaya-footer__col">' +
            '<h4 class="almaya-footer__col-title">معلومات قانونية</h4>' +
            '<ul class="almaya-footer__list">' +
              '<li><a href="retour.html">سياسة الإرجاع والاستبدال</a></li>' +
              '<li><a href="livraison.html">سياسة التوصيل والشحن</a></li>' +
              '<li><a href="cgv.html">الشروط العامة للبيع</a></li>' +
              '<li><a href="privacy-policy.html">سياسة الخصوصية</a></li>' +
            '</ul>' +
          '</div>' +

          // Col 4 — Contact & Socials
          '<div class="almaya-footer__col">' +
            '<h4 class="almaya-footer__col-title">تواصلي معنا</h4>' +
            '<ul class="almaya-footer__contact">' +
              '<li>' +
                '<a href="https://wa.me/212601245733" target="_blank" rel="noopener" class="almaya-footer__contact-link">' +
                  '<i class="fab fa-whatsapp almaya-footer__icon--whatsapp"></i>' +
                  '<span>0601245733</span>' +
                '</a>' +
              '</li>' +
              '<li>' +
                '<a href="mailto:almayacouture@gmail.com" class="almaya-footer__contact-link">' +
                  '<i class="far fa-envelope almaya-footer__icon--mail"></i>' +
                  '<span>almayacouture@gmail.com</span>' +
                '</a>' +
              '</li>' +
            '</ul>' +
            '<div class="almaya-footer__socials">' +
              '<a href="https://www.instagram.com/almaya_couture" target="_blank" rel="noopener" class="almaya-footer__social" aria-label="Instagram">' +
                '<i class="fab fa-instagram"></i>' +
              '</a>' +
              '<a href="https://www.tiktok.com/@almayacouture" target="_blank" rel="noopener" class="almaya-footer__social" aria-label="TikTok">' +
                '<i class="fab fa-tiktok"></i>' +
              '</a>' +
              '<a href="https://www.youtube.com/@InnovatorEssence" target="_blank" rel="noopener" class="almaya-footer__social almaya-footer__social--yt" aria-label="YouTube">' +
                '<i class="fab fa-youtube"></i>' +
              '</a>' +
            '</div>' +
          '</div>' +

        '</div>' +

        // Bottom bar
        '<div class="almaya-footer__bottom">' +
          '<span>© 2026 Almaya Couture — المغرب</span>' +
          '<span class="almaya-footer__bottom-sep">✦</span>' +
          '<span>صُنع بـ ♡ للمرأة المغربية</span>' +
        '</div>' +
      '</footer>';

    document.body.insertAdjacentHTML('beforeend', footerHTML);
    console.log('📝 Footer HTML injecté');
    console.log('✅ Footer + Theme chargés avec succès');
  });

  // API عامة — للاستخدام من أي صفحة
  window.AlmayaTheme = AlmayaTheme;

})();
