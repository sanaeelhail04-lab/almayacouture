// ========== ALMAYA HEADER - AUTO-INITIALISATION ==========
(function() {
  'use strict';
  
  console.log('🚀 Header auto-loader start');

  // Attendre que le DOM soit prêt
  function whenReady(callback) {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      setTimeout(callback, 1);
    } else {
      document.addEventListener('DOMContentLoaded', callback);
    }
  }

  whenReady(function() {
    // Vérifier si déjà injecté
    if (document.getElementById('almayaNav')) {
      console.log('ℹ️ Header déjà présent, initialisation seulement');
      initHeaderEvents();
      return;
    }

    // Injecter CSS
    var style = document.createElement('style');
    style.textContent = 
      '@import url("https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700&family=Cormorant+Garamond:ital,wght@0,300;1,300&display=swap");' +
      ':root{--gold:#C4A06A;--gold-light:#D4B896;--gold-dim:rgba(196,160,106,0.15);--bg:#1A1510;--text:#E8DDD0;--text-muted:#A89880}' +
      '.almaya-nav{background:rgba(26,21,16,0.92);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom:1px solid rgba(196,160,106,0.15);position:sticky;top:0;z-index:999;font-family:Tajawal,sans-serif;direction:rtl;transition:background 0.3s}' +
      '.almaya-nav.scrolled{background:rgba(26,21,16,0.98);box-shadow:0 4px 30px rgba(0,0,0,0.4)}' +
      '.almaya-nav__inner{max-width:1200px;margin:0 auto;padding:0.9rem 2rem;display:flex;align-items:center;justify-content:space-between;gap:1.5rem}' +
      '.almaya-nav__logo{display:flex;align-items:center;gap:0.65rem;text-decoration:none;flex-shrink:0}' +
      '.almaya-nav__logo-img{height:48px;width:auto;border-radius:6px;transition:transform 0.3s}' +
      '.almaya-nav__logo:hover .almaya-nav__logo-img{transform:scale(1.04)}' +
      '.almaya-nav__brand{font-family:"Cormorant Garamond",serif;font-size:1.05rem;font-weight:300;font-style:italic;color:var(--gold);letter-spacing:1.5px;white-space:nowrap}' +
      '.almaya-nav__links{display:flex;align-items:center;gap:2.5rem;list-style:none;margin:0;padding:0}' +
      '.almaya-nav__links a{font-family:Tajawal,sans-serif;color:var(--gold-light);text-decoration:none;font-size:0.68rem;font-weight:500;letter-spacing:2.5px;text-transform:uppercase;position:relative;padding-bottom:3px;transition:color 0.3s}' +
      '.almaya-nav__links a::after{content:"";position:absolute;bottom:0;right:0;width:0;height:1px;background:var(--gold);transition:width 0.3s ease}' +
      '.almaya-nav__links a:hover,.almaya-nav__links a.active{color:var(--gold)}' +
      '.almaya-nav__links a:hover::after,.almaya-nav__links a.active::after{width:100%;right:auto;left:0}' +
      // Style spécial pour le bouton login
      '.almaya-nav__login-btn{padding:0.5rem 1.2rem !important;background:var(--gold);color:var(--bg) !important;border-radius:4px;font-weight:700 !important;letter-spacing:1px !important;transition:all 0.3s !important}' +
      '.almaya-nav__login-btn:hover{background:#D4B896 !important;transform:translateY(-1px);box-shadow:0 4px 12px rgba(196,160,106,0.3)}' +
      '.almaya-nav__login-btn::after{display:none !important}' +
      '.almaya-nav__burger{display:none;flex-direction:column;justify-content:center;align-items:center;gap:5px;width:36px;height:36px;background:rgba(255,255,255,0.04);border:1px solid rgba(196,160,106,0.2);border-radius:8px;cursor:pointer;padding:6px 8px;flex-shrink:0;transition:background 0.3s,border-color 0.3s;z-index:1000}' +
      '.almaya-nav__burger:hover{background:var(--gold-dim);border-color:rgba(196,160,106,0.4)}' +
      '.almaya-nav__burger span{display:block;width:18px;height:1.5px;background:var(--gold-light);border-radius:2px;transition:transform 0.35s ease,opacity 0.35s ease;transform-origin:center}' +
      '.almaya-nav__burger.open span:nth-child(1){transform:translateY(6.5px) rotate(45deg)}' +
      '.almaya-nav__burger.open span:nth-child(2){opacity:0;transform:scaleX(0)}' +
      '.almaya-nav__burger.open span:nth-child(3){transform:translateY(-6.5px) rotate(-45deg)}' +
      '.almaya-nav__mobile{max-height:0;overflow:hidden;transition:max-height 0.45s cubic-bezier(0.23,1,0.32,1),opacity 0.35s;opacity:0;border-top:1px solid transparent;background:rgba(26,21,16,0.97)}' +
      '.almaya-nav__mobile.open{max-height:400px;opacity:1;border-top-color:rgba(196,160,106,0.1)}' +
      '.almaya-nav__mobile ul{list-style:none;margin:0;padding:0.5rem 1.5rem 1.25rem;display:flex;flex-direction:column}' +
      '.almaya-nav__mobile ul li a{display:block;padding:0.85rem 0;color:var(--gold-light);text-decoration:none;font-size:0.72rem;font-weight:500;letter-spacing:2.5px;text-transform:uppercase;border-bottom:1px solid rgba(196,160,106,0.07);transition:color 0.3s,padding-right 0.3s}' +
      '.almaya-nav__mobile ul li:last-child a{border-bottom:none}' +
      '.almaya-nav__mobile ul li a:hover,.almaya-nav__mobile ul li a.active{color:var(--gold);padding-right:6px}' +
      // Bouton login dans le menu mobile
      '.almaya-nav__mobile .mobile-login-btn{background:var(--gold) !important;color:var(--bg) !important;text-align:center !important;margin-top:0.5rem !important;border-radius:4px !important;font-weight:700 !important;padding:0.7rem 0 !important}' +
      '@media(min-width:769px){.almaya-nav__links{display:flex}.almaya-nav__burger{display:none}.almaya-nav__mobile{display:none}}' +
      '@media(max-width:768px){.almaya-nav__inner{padding:0.75rem 1rem}.almaya-nav__links{display:none}.almaya-nav__burger{display:flex}.almaya-nav__brand{display:none}.almaya-nav__logo-img{height:40px}}' +
      '@media(max-width:480px){.almaya-nav__inner{padding:0.65rem 0.75rem}.almaya-nav__logo-img{height:36px}.almaya-nav__burger{width:32px;height:32px;padding:5px 7px}.almaya-nav__burger span{width:16px}.almaya-nav__burger.open span:nth-child(1){transform:translateY(5.5px) rotate(45deg)}.almaya-nav__burger.open span:nth-child(3){transform:translateY(-5.5px) rotate(-45deg)}}';
    
    document.head.appendChild(style);
    console.log('🎨 CSS injecté');

    // Injecter HTML avec le lien login AJOUTÉ
    var headerHTML = 
      '<nav class="almaya-nav" id="almayaNav">' +
        '<div class="almaya-nav__inner">' +
          '<a href="index.html" class="almaya-nav__logo">' +
            '<img src="images/logo.jpg" alt="Almaya Couture" class="almaya-nav__logo-img" onerror="this.src=\'https://placehold.co/60x60/C4A06A/1A1510?text=AC\'">' +
            '<span class="almaya-nav__brand">Almaya Couture</span>' +
          '</a>' +
          '<ul class="almaya-nav__links" id="almayaNavLinks">' +
            '<li><a href="index.html" data-page="index">الرئيسية</a></li>' +
            '<li><a href="collections.html" data-page="collections">المنتجات</a></li>' +
            '<li><a href="design.html" data-page="design">صممي قطعتك</a></li>' +
            // 🔑 AJOUT DU BOUTON LOGIN ICI
            '<li><a href="login.html" data-page="login" class="almaya-nav__login-btn">تسجيل الدخول</a></li>' +
          '</ul>' +
          '<button class="almaya-nav__burger" id="almayaBurger" aria-label="القائمة" aria-expanded="false">' +
            '<span></span><span></span><span></span>' +
          '</button>' +
        '</div>' +
        '<div class="almaya-nav__mobile" id="almayaMobile">' +
          '<ul>' +
            '<li><a href="index.html" data-page="index">الرئيسية</a></li>' +
            '<li><a href="collections.html" data-page="collections">المنتجات</a></li>' +
            '<li><a href="design.html" data-page="design">صممي قطعتك</a></li>' +
            // 🔑 AJOUT DU BOUTON LOGIN DANS LE MENU MOBILE
            '<li><a href="login.html" data-page="login" class="mobile-login-btn">تسجيل الدخول</a></li>' +
          '</ul>' +
        '</div>' +
      '</nav>';

    // Insérer au début du body
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
    console.log('📝 HTML header injecté avec bouton login');

    // Initialiser
    initHeaderEvents();
  });

  // ========== FONCTION D'INITIALISATION ==========
  function initHeaderEvents() {
    // Active link
    var currentPage = location.pathname.split('/').pop().replace('.html', '') || 'index';
    var links = document.querySelectorAll('.almaya-nav [data-page]');
    for (var i = 0; i < links.length; i++) {
      if (links[i].dataset.page === currentPage) {
        links[i].classList.add('active');
      }
    }

    var burger = document.getElementById('almayaBurger');
    var mobileMenu = document.getElementById('almayaMobile');
    var nav = document.getElementById('almayaNav');

    if (!burger || !mobileMenu || !nav) {
      console.error('❌ Éléments header manquants');
      return;
    }

    console.log('✅ Burger initialisé');

    // Burger click
    burger.onclick = function(e) {
      e.stopPropagation();
      var isOpen = !burger.classList.contains('open');
      
      if (isOpen) {
        burger.classList.add('open');
        mobileMenu.classList.add('open');
      } else {
        burger.classList.remove('open');
        mobileMenu.classList.remove('open');
      }
      
      burger.setAttribute('aria-expanded', isOpen);
      console.log('🍔 Menu', isOpen ? 'OUVERT' : 'FERMÉ');
    };

    // Fermer sur lien click
    var mobileLinks = mobileMenu.querySelectorAll('a');
    for (var j = 0; j < mobileLinks.length; j++) {
      mobileLinks[j].onclick = function() {
        burger.classList.remove('open');
        mobileMenu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      };
    }

    // Fermer sur clic extérieur
    document.onclick = function(e) {
      if (!nav.contains(e.target) && mobileMenu.classList.contains('open')) {
        burger.classList.remove('open');
        mobileMenu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    };

    // Fermer sur Escape
    document.onkeydown = function(e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        burger.classList.remove('open');
        mobileMenu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        burger.focus();
      }
    };

    // Scroll effect
    window.onscroll = function() {
      if (window.scrollY > 30) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };
  }
})();