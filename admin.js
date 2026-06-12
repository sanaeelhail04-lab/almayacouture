// admin.js - Sidebar Drawer Navigation | Almaya Couture Admin
// نسخة محسنة ومتوافقة مع صفحة إضافة المنتج
(function () {
  // منع التكرار
  if (document.getElementById('admin-navbar')) return;
  if (window.adminMenuLoaded) return;
  window.adminMenuLoaded = true;

  function createAdminMenu() {
    // التحقق من وجود placeholder
    const placeholder = document.getElementById('admin-navbar-placeholder');
    if (!placeholder) {
      console.warn('admin-navbar-placeholder غير موجود، سيتم الإضافة في بداية body');
    }

    // ==========================================
    //  دالة تطبيق الثيم
    // ==========================================
    function applyThemeToAdmin() {
      const isWhiteTheme = document.body.classList.contains('white-theme');
      const topbar = document.getElementById('admin-navbar');
      const drawer = document.getElementById('adminDrawer');
      
      const darkBg = '#1A1510';
      const lightBg = '#FDFCF8';
      const gold = '#C4A06A';
      const darkText = '#E8DDD0';
      const lightText = '#2A2218';
      const darkTextMuted = '#A89880';
      const lightTextMuted = '#6B5F52';

      if (topbar) {
        topbar.style.background = isWhiteTheme ? lightBg : darkBg;
        topbar.style.borderBottom = `1px solid ${isWhiteTheme ? 'rgba(160,120,64,0.12)' : 'rgba(196,160,106,0.15)'}`;
        const brand = topbar.querySelector('.admin-topbar-brand');
        if (brand) brand.style.color = isWhiteTheme ? lightText : darkText;
        const pageLabel = topbar.querySelector('.admin-page-label');
        if (pageLabel) pageLabel.style.color = isWhiteTheme ? lightTextMuted : darkTextMuted;
        const hamburger = topbar.querySelector('.admin-hamburger');
        if (hamburger) {
          hamburger.style.color = isWhiteTheme ? lightTextMuted : darkTextMuted;
          hamburger.style.borderColor = isWhiteTheme ? 'rgba(160,120,64,0.2)' : 'rgba(196,160,106,0.2)';
        }
      }
      
      if (drawer) {
        drawer.style.background = isWhiteTheme ? lightBg : darkBg;
        const header = drawer.querySelector('.admin-drawer-header');
        if (header) {
          header.style.borderBottomColor = isWhiteTheme ? 'rgba(160,120,64,0.12)' : 'rgba(196,160,106,0.08)';
        }
      }
    }

    // إضافة الـ CSS
    if (!document.getElementById('admin-drawer-styles')) {
      const style = document.createElement('style');
      style.id = 'admin-drawer-styles';
      style.textContent = `
        :root {
          --admin-gold: #C4A06A;
          --admin-gold-light: #D4B896;
          --admin-gold-dim: rgba(196,160,106,0.15);
          --admin-bg-dark: #1A1510;
          --admin-text-dark: #E8DDD0;
          --admin-text-muted-dark: #A89880;
          --admin-bg-light: #FDFCF8;
          --admin-text-light: #2A2218;
          --admin-text-muted-light: #6B5F52;
        }

        body.white-theme {
          --admin-bg: var(--admin-bg-light);
          --admin-text: var(--admin-text-light);
          --admin-text-muted: var(--admin-text-muted-light);
          --admin-border: rgba(160,120,64,0.12);
        }
        body:not(.white-theme) {
          --admin-bg: var(--admin-bg-dark);
          --admin-text: var(--admin-text-dark);
          --admin-text-muted: var(--admin-text-muted-dark);
          --admin-border: rgba(196,160,106,0.08);
        }

        .admin-topbar {
          position: sticky;
          top: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          direction: rtl;
          padding: 0.65rem 1.5rem;
          transition: all 0.3s ease;
          font-family: 'Tajawal', sans-serif;
        }
        .admin-topbar-brand {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          font-family: 'Tajawal', sans-serif;
        }
        .admin-topbar-brand i {
          color: var(--admin-gold);
          font-size: 1.1rem;
        }
        .admin-topbar-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .admin-page-label {
          font-size: 0.75rem;
          font-family: 'Tajawal', sans-serif;
        }
        .admin-hamburger {
          background: transparent;
          border: 1px solid var(--admin-border);
          border-radius: 8px;
          padding: 0.4rem 0.7rem;
          cursor: pointer;
          font-size: 1rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          transition: all 0.25s ease;
          font-family: 'Tajawal', sans-serif;
        }
        .admin-hamburger:hover {
          border-color: var(--admin-gold);
          color: var(--admin-gold);
          background: var(--admin-gold-dim);
        }

        .admin-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(3px);
          z-index: 290;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        .admin-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        .admin-drawer {
          position: fixed;
          top: 0;
          right: -320px;
          width: 295px;
          max-width: 85vw;
          height: 100%;
          z-index: 300;
          transition: right 0.35s cubic-bezier(0.2, 0.9, 0.4, 1.1);
          display: flex;
          flex-direction: column;
          direction: rtl;
          overflow-y: auto;
          box-shadow: -5px 0 25px rgba(0,0,0,0.15);
          font-family: 'Tajawal', sans-serif;
        }
        .admin-drawer.open { right: 0; }

        .admin-drawer-header {
          padding: 1.25rem 1.2rem;
          border-bottom: 1px solid var(--admin-border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
        }
        .admin-drawer-brand {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-weight: 700;
          font-size: 1rem;
          text-decoration: none;
          color: var(--admin-text);
        }
        .admin-drawer-brand i {
          color: var(--admin-gold);
          font-size: 1.2rem;
        }
        .admin-drawer-close {
          background: none;
          border: none;
          color: var(--admin-text-muted);
          font-size: 1.1rem;
          cursor: pointer;
          padding: 0.3rem;
          border-radius: 8px;
        }
        .admin-drawer-close:hover {
          color: var(--admin-gold);
          background: var(--admin-gold-dim);
        }

        .admin-drawer-nav {
          flex: 1;
          padding: 0.5rem 0;
        }

        .adn-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1.2rem;
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          border-bottom: 1px solid var(--admin-border);
          transition: all 0.2s ease;
          text-decoration: none;
          color: var(--admin-text-muted);
        }
        .adn-item:hover {
          background: var(--admin-gold-dim);
          color: var(--admin-gold);
          padding-right: 1.4rem;
        }
        .adn-item.active {
          background: var(--admin-gold-dim);
          color: var(--admin-gold);
          border-right: 3px solid var(--admin-gold);
        }
        .adn-item-right {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .adn-icon {
          font-size: 1.1rem;
          width: 22px;
          text-align: center;
        }
        .adn-chevron {
          font-size: 0.65rem;
          transition: transform 0.25s ease;
        }
        .adn-item.expanded .adn-chevron {
          transform: rotate(180deg);
          color: var(--admin-gold);
        }

        .adn-submenu {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.35s ease;
          background: rgba(0,0,0,0.08);
        }
        body.white-theme .adn-submenu {
          background: rgba(160,120,64,0.05);
        }
        .adn-submenu.open { max-height: 450px; }

        .adn-sub-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.65rem 1.8rem 0.65rem 1.2rem;
          font-size: 0.85rem;
          cursor: pointer;
          text-decoration: none;
          color: var(--admin-text-muted);
          transition: all 0.2s;
          border-bottom: 1px solid var(--admin-border);
        }
        .adn-sub-item:hover {
          background: var(--admin-gold-dim);
          color: var(--admin-gold);
          padding-right: 2rem;
        }
        .adn-sub-item.active {
          color: var(--admin-gold);
          font-weight: 600;
        }

        .admin-drawer-footer {
          border-top: 1px solid var(--admin-border);
          padding: 1rem 1.2rem;
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .admin-topbar { padding: 0.5rem 1rem; }
          .admin-page-label { display: none; }
          .admin-hamburger span { display: none; }
          .admin-hamburger { padding: 0.4rem 0.6rem; }
        }
      `;
      document.head.appendChild(style);
    }

    // تحديد الصفحة الحالية
    const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
    const isAddProductPage = currentPage === 'admin-add-product.html';
    const productPages = ['admin-products.html', 'admin-produits.html', 'admin-collections.html', 'admin-reviews.html'];
    const isProductSub = productPages.includes(currentPage);

    const pageLabelMap = {
      'dashboard.html': 'لوحة التحكم',
      'admin-orders.html': 'الطلبيات',
      'admin-products.html': 'المنتجات',
      'admin-produits.html': 'المنتجات',
      'admin-add-product.html': 'إضافة منتج',
      'admin-stock.html': 'المخزون',
      'admin-collections.html': 'التصنيفات',
      'admin-reviews.html': 'المراجعات',
      'admin-contact.html': 'الرسائل',
      'admin-login.html': 'المسؤولين'
    };
    const pageLabel = pageLabelMap[currentPage] || 'الإدارة';

    // إنشاء الشريط العلوي
    const topbar = document.createElement('div');
    topbar.id = 'admin-navbar';
    topbar.className = 'admin-topbar';
    topbar.innerHTML = `
      <a href="dashboard.html" class="admin-topbar-brand">
        <i class="fas fa-crown"></i>
        <span>Almaya Admin</span>
      </a>
      <div class="admin-topbar-actions">
        <span class="admin-page-label">${pageLabel}</span>
        <button class="admin-hamburger" id="adminHamburger" aria-label="القائمة">
          <i class="fas fa-bars"></i>
          <span>القائمة</span>
        </button>
      </div>
    `;

    // الخلفية المعتمة
    const overlay = document.createElement('div');
    overlay.id = 'adminOverlay';
    overlay.className = 'admin-overlay';

    // القائمة الجانبية
    const drawer = document.createElement('div');
    drawer.id = 'adminDrawer';
    drawer.className = 'admin-drawer';

    function navItem(href, icon, label, isActive) {
      return `<a href="${href}" class="adn-item ${isActive ? 'active' : ''}">
                <span>${label}</span>
                <div class="adn-item-right"><i class="${icon} adn-icon"></i></div>
              </a>`;
    }

    function subItem(href, icon, label, isActive) {
      return `<a href="${href}" class="adn-sub-item ${isActive ? 'active' : ''}">
                <span>${label}</span>
                <i class="${icon} adn-sub-icon"></i>
              </a>`;
    }

   drawer.innerHTML = `
  <div class="admin-drawer-header">
    <a href="dashboard.html" class="admin-drawer-brand">
      <i class="fas fa-crown"></i>
      <span>Almaya Admin</span>
    </a>
    <button class="admin-drawer-close" id="adminDrawerClose">
      <i class="fas fa-times"></i>
    </button>
  </div>
  <nav class="admin-drawer-nav">
    ${navItem('dashboard.html', 'fas fa-home', 'لوحة التحكم', currentPage === 'dashboard.html')}
    ${navItem('admin-orders.html', 'fas fa-cube', 'الطلبيات', currentPage === 'admin-orders.html')}

    ${!isAddProductPage ? `
    <div class="adn-item ${isProductSub ? 'active expanded' : ''}" id="productsParent">
      <span>المنتجات</span>
      <div class="adn-item-right">
        <i class="fas fa-chevron-down adn-chevron"></i>
        <i class="fas fa-tag adn-icon"></i>
      </div>
    </div>
    <div class="adn-submenu ${isProductSub ? 'open' : ''}" id="productsSubmenu">
      ${subItem('admin-products.html', 'fas fa-list', 'جميع المنتجات', currentPage === 'admin-products.html' || currentPage === 'admin-produits.html')}
      ${subItem('admin-add-product.html', 'fas fa-plus-circle', 'إضافة منتج', currentPage === 'admin-add-product.html')}
      ${subItem('admin-stock.html', 'fas fa-boxes', 'المخزون', currentPage === 'admin-stock.html')}
      ${subItem('admin-collections.html', 'fas fa-layer-group', 'التصنيفات', currentPage === 'admin-collections.html')}
    </div>
    ` : `
    <div class="adn-item expanded" id="productsParent">
      <span>المنتجات</span>
      <div class="adn-item-right">
        <i class="fas fa-chevron-down adn-chevron"></i>
        <i class="fas fa-tag adn-icon"></i>
      </div>
    </div>
    <div class="adn-submenu open" id="productsSubmenu">
      ${subItem('admin-products.html', 'fas fa-list', 'جميع المنتجات', false)}
      ${subItem('admin-add-product.html', 'fas fa-plus-circle', 'إضافة منتج', currentPage === 'admin-add-product.html')}
      ${subItem('admin-stock.html', 'fas fa-boxes', 'المخزون', currentPage === 'admin-stock.html')}
      ${subItem('admin-collections.html', 'fas fa-layer-group', 'التصنيفات', currentPage === 'admin-collections.html')}
    </div>
    `}
    
    ${navItem('admin-reviews.html', 'fas fa-star', 'المراجعات', currentPage === 'admin-reviews.html')}
    ${navItem('admin-contact.html', 'fas fa-envelope', 'الرسائل', currentPage === 'admin-contact.html')}
    ${navItem('admin-login.html', 'fas fa-users', 'المسؤولين', currentPage === 'admin-login.html')}
  </nav>
  <div class="admin-drawer-footer"></div>
`;

    // إضافة العناصر للصفحة
    if (placeholder) {
      placeholder.appendChild(topbar);
    } else {
      document.body.insertBefore(topbar, document.body.firstChild);
    }
    document.body.appendChild(overlay);
    document.body.appendChild(drawer);

    // تطبيق الثيم
    function initThemeObserver() {
      applyThemeToAdmin();
      const observer = new MutationObserver(() => applyThemeToAdmin());
      observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    }
    initThemeObserver();

    // الأحداث
    const hamburger = document.getElementById('adminHamburger');
    const drawerClose = document.getElementById('adminDrawerClose');
    const productsParent = document.getElementById('productsParent');
    const productsSubmenu = document.getElementById('productsSubmenu');

    function openDrawer() {
      drawer.classList.add('open');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      drawer.classList.remove('open');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    function toggleSubmenu(parent, submenu) {
      const isOpen = submenu.classList.contains('open');
      if (!isOpen) {
        submenu.classList.add('open');
        parent.classList.add('expanded');
      } else {
        submenu.classList.remove('open');
        parent.classList.remove('expanded');
      }
    }

    if (hamburger) hamburger.addEventListener('click', openDrawer);
    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
    if (overlay) overlay.addEventListener('click', closeDrawer);
    
    if (productsParent && productsSubmenu) {
      productsParent.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleSubmenu(productsParent, productsSubmenu);
      });
    }

    drawer.querySelectorAll('a.adn-item, a.adn-sub-item').forEach(el => {
      el.addEventListener('click', () => setTimeout(closeDrawer, 100));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
    });

    console.log('✅ Admin Drawer ready | current page:', currentPage);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createAdminMenu);
  } else {
    createAdminMenu();
  }
})();