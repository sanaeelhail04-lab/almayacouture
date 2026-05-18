// ========== ALMAYA FOOTER - AUTO-INITIALISATION ==========
(function() {
  'use strict';
  
  console.log('🚀 Footer auto-loader start');

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
    if (document.getElementById('almayaFooter')) {
      console.log('ℹ️ Footer déjà présent');
      return;
    }

    // Injecter CSS
    var style = document.createElement('style');
    style.textContent = 
      '@import url("https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700&family=Cormorant+Garamond:ital,wght@0,300;1,300&display=swap");' +
      ':root{--gold:#C4A06A;--gold-light:#D4B896;--gold-dim:rgba(196,160,106,0.15);--bg:#1A1510;--bg2:#221C14;--text:#E8DDD0;--text-muted:#A89880;--text-dim:#8B7B68}' +
      '.almaya-footer{position:relative;z-index:1;background:rgba(34,28,20,0.7);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-top:1px solid rgba(196,160,106,0.12);font-family:Tajawal,sans-serif;direction:rtl;color:var(--text-dim)}' +
      '.almaya-footer__divider{display:flex;align-items:center;justify-content:center;padding:0;position:relative}' +
      '.almaya-footer__divider::before,.almaya-footer__divider::after{content:"";flex:1;height:1px;background:linear-gradient(90deg,transparent,rgba(196,160,106,0.25),transparent)}' +
      '.almaya-footer__diamond{display:inline-block;width:8px;height:8px;background:var(--gold);transform:rotate(45deg);margin:0 1rem;flex-shrink:0;position:relative;top:-1px;opacity:0.7}' +
      '.almaya-footer__inner{max-width:1200px;margin:0 auto;padding:3rem 2rem 2rem;display:grid;grid-template-columns:2fr 1fr 1.4fr;gap:3rem;align-items:start}' +
      '.almaya-footer__logo{display:flex;align-items:center;gap:0.75rem;text-decoration:none;margin-bottom:1rem}' +
      '.almaya-footer__logo img{height:50px;width:auto;border-radius:8px;opacity:0.9;transition:opacity 0.3s}' +
      '.almaya-footer__logo:hover img{opacity:1}' +
      '.almaya-footer__logo-name{display:block;font-family:"Cormorant Garamond",serif;font-size:1.1rem;font-weight:300;font-style:italic;color:var(--gold);letter-spacing:1.5px}' +
      '.almaya-footer__logo-tagline{display:block;font-family:Tajawal,sans-serif;font-size:0.6rem;font-weight:300;letter-spacing:1.5px;color:var(--text-dim);margin-top:2px}' +
      '.almaya-footer__about{font-family:Tajawal,sans-serif;font-size:0.72rem;font-weight:300;color:var(--text-dim);line-height:1.9;max-width:280px}' +
      '.almaya-footer__col-title{font-family:Tajawal,sans-serif;font-size:0.58rem;letter-spacing:3px;text-transform:uppercase;color:var(--gold);margin-bottom:1.1rem;font-weight:500}' +
      '.almaya-footer__list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:0.6rem}' +
      '.almaya-footer__list a{font-family:Tajawal,sans-serif;font-size:0.68rem;font-weight:400;letter-spacing:1.5px;color:var(--text-dim);text-decoration:none;transition:color 0.3s,padding-right 0.3s;display:inline-block}' +
      '.almaya-footer__list a:hover{color:var(--gold);padding-right:4px}' +
      '.almaya-footer__contact{list-style:none;padding:0;margin:0 0 1.25rem;display:flex;flex-direction:column;gap:0.65rem}' +
      '.almaya-footer__contact-link{display:flex;align-items:center;gap:8px;font-family:Tajawal,sans-serif;font-size:0.68rem;font-weight:400;color:var(--text-dim);text-decoration:none;transition:color 0.3s}' +
      '.almaya-footer__contact-link:hover{color:var(--gold)}' +
      '.almaya-footer__contact-link i{font-size:0.9rem;width:16px;text-align:center}' +
      '.almaya-footer__icon--whatsapp{color:#25D366}' +
      '.almaya-footer__icon--mail{color:var(--gold)}' +
      '.almaya-footer__socials{display:flex;gap:0.6rem;align-items:center}' +
      '.almaya-footer__social{display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:8px;border:1px solid rgba(196,160,106,0.18);background:rgba(255,255,255,0.03);color:var(--text-dim);font-size:0.9rem;text-decoration:none;transition:color 0.3s,border-color 0.3s,background 0.3s,transform 0.3s}' +
      '.almaya-footer__social:hover{color:var(--gold);border-color:rgba(196,160,106,0.45);background:var(--gold-dim);transform:translateY(-3px)}' +
      '.almaya-footer__social--yt:hover{color:#FF0000;border-color:rgba(255,0,0,0.35);background:rgba(255,0,0,0.08)}' +
      '.almaya-footer__bottom{max-width:1200px;margin:0 auto;padding:1.25rem 2rem;border-top:1px solid rgba(196,160,106,0.08);display:flex;align-items:center;justify-content:center;gap:0.75rem;font-family:Tajawal,sans-serif;font-size:0.55rem;font-weight:300;letter-spacing:1px;color:var(--text-dim);flex-wrap:wrap;text-align:center}' +
      '.almaya-footer__bottom-sep{color:var(--gold);opacity:0.5;font-size:0.45rem}' +
      '@media(max-width:900px){.almaya-footer__inner{grid-template-columns:1fr 1fr;gap:2rem}.almaya-footer__brand{grid-column:1/-1}.almaya-footer__about{max-width:100%}}' +
      '@media(max-width:600px){.almaya-footer__inner{grid-template-columns:1fr;padding:2rem 1.25rem 1.5rem;gap:1.75rem}.almaya-footer__brand{grid-column:auto}.almaya-footer__bottom{padding:1rem 1.25rem;font-size:0.5rem}}' +
      '@media(max-width:400px){.almaya-footer__inner{padding:1.5rem 1rem 1.25rem;gap:1.5rem}.almaya-footer__logo img{height:42px}.almaya-footer__social{width:30px;height:30px;font-size:0.8rem}}';
    
    document.head.appendChild(style);
    console.log('🎨 Footer CSS injecté');

    // Injecter HTML
    var footerHTML = 
      '<footer class="almaya-footer" id="almayaFooter">' +
        '<div class="almaya-footer__divider">' +
          '<span class="almaya-footer__diamond"></span>' +
        '</div>' +
        '<div class="almaya-footer__inner">' +
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
          '<div class="almaya-footer__col">' +
            '<h4 class="almaya-footer__col-title">الصفحات</h4>' +
            '<ul class="almaya-footer__list">' +
              '<li><a href="index.html">الرئيسية</a></li>' +
              '<li><a href="collections.html">المنتجات</a></li>' +
              '<li><a href="design.html">صممي قطعتك</a></li>' +
            '</ul>' +
          '</div>' +
          '<div class="almaya-footer__col">' +
            '<h4 class="almaya-footer__col-title">تواصلي معنا</h4>' +
            '<ul class="almaya-footer__contact">' +
              '<li>' +
                '<a href="https://wa.me/212601245733" target="_blank" class="almaya-footer__contact-link">' +
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
              '<a href="https://www.instagram.com/almaya_couture" target="_blank" class="almaya-footer__social" aria-label="Instagram">' +
                '<i class="fab fa-instagram"></i>' +
              '</a>' +
              '<a href="https://www.tiktok.com/@almayacouture" target="_blank" class="almaya-footer__social" aria-label="TikTok">' +
                '<i class="fab fa-tiktok"></i>' +
              '</a>' +
              '<a href="https://www.youtube.com/@InnovatorEssence" target="_blank" class="almaya-footer__social almaya-footer__social--yt" aria-label="YouTube">' +
                '<i class="fab fa-youtube"></i>' +
              '</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="almaya-footer__bottom">' +
          '<span>© 2026 Almaya Couture — المغرب</span>' +
          '<span class="almaya-footer__bottom-sep">✦</span>' +
          '<span>صُنع بـ ♡ للمرأة المغربية</span>' +
        '</div>' +
      '</footer>';

    // Insérer à la fin du body
    document.body.insertAdjacentHTML('beforeend', footerHTML);
    console.log('📝 Footer HTML injecté');
  });
})();