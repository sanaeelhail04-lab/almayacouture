// admin.js - Sidebar Drawer Navigation | Almaya Couture Admin
(function () {
  function createAdminMenu() {
    if (document.getElementById('admin-navbar')) return;

    /* ============================================================
       CSS
    ============================================================ */
    const style = document.createElement('style');
    style.textContent = `
      /* ===== TOP BAR ===== */
      .admin-topbar {
        background: #1e2a3a;
        border-bottom: 1px solid rgba(255,255,255,0.08);
        padding: 0.55rem 1rem;
        position: sticky;
        top: 0;
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: space-between;
        direction: rtl;
      }
      .admin-topbar-brand {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--gold, #C4A06A);
        font-weight: 700;
        font-size: 0.95rem;
        text-decoration: none;
        font-family: 'Tajawal', sans-serif;
      }
      .admin-topbar-actions {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .admin-hamburger {
        background: none;
        border: 1px solid rgba(255,255,255,0.18);
        border-radius: 8px;
        padding: 0.35rem 0.6rem;
        cursor: pointer;
        color: rgba(255,255,255,0.8);
        font-size: 1rem;
        display: flex;
        align-items: center;
        gap: 0.4rem;
        transition: all 0.2s;
      }
      .admin-hamburger:hover {
        border-color: var(--gold, #C4A06A);
        color: var(--gold, #C4A06A);
      }
      .admin-refresh-top {
        background: none;
        border: 1px solid rgba(255,255,255,0.12);
        border-radius: 8px;
        padding: 0.35rem 0.55rem;
        cursor: pointer;
        color: rgba(255,255,255,0.5);
        font-size: 0.8rem;
        transition: all 0.2s;
      }
      .admin-refresh-top:hover { color: rgba(255,255,255,0.8); }
      
      /* Current page indicator */
      .admin-page-label {
        color: rgba(255,255,255,0.45);
        font-size: 0.75rem;
        font-family: 'Tajawal', sans-serif;
      }

      /* ===== OVERLAY ===== */
      .admin-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.65);
        backdrop-filter: blur(2px);
        z-index: 290;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
      }
      .admin-overlay.active {
        opacity: 1;
        visibility: visible;
      }

      /* ===== DRAWER ===== */
      .admin-drawer {
        position: fixed;
        top: 0;
        right: -320px;
        width: 295px;
        max-width: 88vw;
        height: 100%;
        background: #253045;
        z-index: 300;
        transition: right 0.38s cubic-bezier(0.23, 1, 0.32, 1);
        display: flex;
        flex-direction: column;
        direction: rtl;
        overflow-y: auto;
        overflow-x: hidden;
      }
      .admin-drawer::-webkit-scrollbar { width: 3px; }
      .admin-drawer::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
      .admin-drawer.open { right: 0; }

      /* ===== DRAWER HEADER ===== */
      .admin-drawer-header {
        padding: 1rem 1.1rem;
        border-bottom: 1px solid rgba(255,255,255,0.08);
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-shrink: 0;
      }
      .admin-drawer-brand {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #fff;
        font-weight: 700;
        font-size: 1rem;
        font-family: 'Tajawal', sans-serif;
        text-decoration: none;
      }
      .admin-drawer-brand i {
        color: var(--gold, #C4A06A);
        font-size: 1.1rem;
      }
      .admin-drawer-close {
        background: none;
        border: none;
        color: rgba(255,255,255,0.4);
        font-size: 1.15rem;
        cursor: pointer;
        padding: 0.2rem;
        line-height: 1;
        transition: color 0.2s;
      }
      .admin-drawer-close:hover { color: #fff; }

      /* ===== NAV ===== */
      .admin-drawer-nav {
        flex: 1;
        padding: 0.4rem 0;
      }

      /* Nav Item */
      .adn-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.95rem 1.1rem;
        color: rgba(255,255,255,0.72);
        font-size: 1rem;
        font-family: 'Tajawal', sans-serif;
        font-weight: 500;
        cursor: pointer;
        border-bottom: 1px solid rgba(255,255,255,0.055);
        transition: background 0.18s, color 0.18s, border-right 0.18s;
        text-decoration: none;
        position: relative;
        user-select: none;
      }
      .adn-item:hover {
        background: rgba(255,255,255,0.06);
        color: #fff;
      }
      .adn-item.active {
        background: rgba(255,255,255,0.07);
        color: #fff;
        border-right: 3px solid var(--gold, #C4A06A);
      }
      .adn-item-right {
        display: flex;
        align-items: center;
        gap: 0.55rem;
        flex-shrink: 0;
      }
      .adn-icon {
        font-size: 1.15rem;
        color: rgba(255,255,255,0.38);
        width: 22px;
        text-align: center;
      }
      .adn-item.active .adn-icon,
      .adn-item:hover .adn-icon {
        color: rgba(255,255,255,0.7);
      }
      .adn-chevron {
        font-size: 0.65rem;
        color: rgba(255,255,255,0.3);
        transition: transform 0.28s ease;
        margin-left: 2px;
      }
      .adn-item.expanded .adn-chevron {
        transform: rotate(180deg);
      }

      /* Badge */
      .adn-badge {
        background: #3b9eff;
        color: #fff;
        font-size: 0.58rem;
        font-weight: 700;
        padding: 0.12rem 0.55rem;
        border-radius: 30px;
        letter-spacing: 0.3px;
        font-family: 'Tajawal', sans-serif;
      }
      .adn-badge.gold { background: var(--gold, #C4A06A); color: #1a1510; }
      .adn-badge.red { background: #ff4757; }

      /* ===== SUBMENU ===== */
      .adn-submenu {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.38s ease;
        background: rgba(0,0,0,0.18);
      }
      .adn-submenu.open { max-height: 500px; }

      .adn-sub-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.7rem 1.4rem 0.7rem 1rem;
        color: rgba(255,255,255,0.55);
        font-size: 0.88rem;
        font-family: 'Tajawal', sans-serif;
        cursor: pointer;
        text-decoration: none;
        border-bottom: 1px solid rgba(255,255,255,0.04);
        transition: background 0.15s, color 0.15s;
        gap: 0.5rem;
      }
      .adn-sub-item:hover {
        background: rgba(255,255,255,0.05);
        color: rgba(255,255,255,0.9);
      }
      .adn-sub-item.active {
        color: var(--gold, #C4A06A);
        font-weight: 600;
      }
      .adn-sub-icon {
        font-size: 0.7rem;
        color: rgba(255,255,255,0.2);
        flex-shrink: 0;
      }
      .adn-sub-item.active .adn-sub-icon { color: var(--gold, #C4A06A); }

      /* ===== DRAWER FOOTER ===== */
      .admin-drawer-footer {
        border-top: 1px solid rgba(255,255,255,0.07);
        padding: 0.8rem 1.1rem;
        display: flex;
        gap: 0.5rem;
        flex-shrink: 0;
      }
      .admin-footer-btn {
        flex: 1;
        padding: 0.5rem;
        border-radius: 8px;
        border: 1px solid rgba(255,255,255,0.1);
        background: rgba(255,255,255,0.05);
        color: rgba(255,255,255,0.5);
        font-size: 0.72rem;
        font-family: 'Tajawal', sans-serif;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.4rem;
        transition: all 0.2s;
      }
      .admin-footer-btn:hover {
        background: rgba(255,255,255,0.1);
        color: #fff;
        border-color: rgba(255,255,255,0.2);
      }
      .admin-footer-btn.danger:hover {
        color: #ff6b7a;
        border-color: rgba(255,107,122,0.3);
      }

      /* ===== ANIMATION ===== */
      @keyframes slideInItem {
        from { opacity: 0; transform: translateX(12px); }
        to   { opacity: 1; transform: translateX(0); }
      }
      .admin-drawer.open .adn-item,
      .admin-drawer.open .admin-drawer-header {
        animation: slideInItem 0.3s ease both;
      }
      .admin-drawer.open .adn-item:nth-child(1) { animation-delay: 0.04s; }
      .admin-drawer.open .adn-item:nth-child(2) { animation-delay: 0.08s; }
      .admin-drawer.open .adn-item:nth-child(3) { animation-delay: 0.12s; }
      .admin-drawer.open .adn-item:nth-child(4) { animation-delay: 0.16s; }
      .admin-drawer.open .adn-item:nth-child(5) { animation-delay: 0.20s; }

      /* ===== DESKTOP: keep topbar compact ===== */
      @media (min-width: 1024px) {
        .admin-page-label { display: inline; }
      }
      @media (max-width: 1023px) {
        .admin-page-label { display: none; }
      }
    `;
    document.head.appendChild(style);

    /* ============================================================
       Determine current page
    ============================================================ */
    const currentPage = window.location.pathname.split('/').pop() || 'dashbord.html';
    const productPages = ['admin-produits.html', 'admin-collections.html', 'admin-reviews.html'];
    const isProductSub = productPages.includes(currentPage);

    const pageLabelMap = {
      'dashbord.html': 'لوحة التحكم',
      'admin-orders.html': 'الطلبيات',
      'admin-produits.html': 'المنتجات',
      'admin-collections.html': 'التصنيفات',
      'admin-reviews.html': 'المراجعات',
      'admin-contact.html': 'الرسائل',
      'admin-login.html': 'المسؤولين'
    };
    const pageLabel = pageLabelMap[currentPage] || 'الإدارة';

    /* ============================================================
       TOP BAR
    ============================================================ */
    const topbar = document.createElement('div');
    topbar.id = 'admin-navbar';
    topbar.className = 'admin-topbar';
    topbar.innerHTML = `
      <a href="dashbord.html" class="admin-topbar-brand">
        <i class="fas fa-crown"></i>
        <span>Almaya Admin</span>
      </a>
      <div class="admin-topbar-actions">
        <span class="admin-page-label">${pageLabel}</span>
        <button class="admin-refresh-top" id="adminRefreshTop" title="تحديث">
          <i class="fas fa-sync-alt"></i>
        </button>
        <button class="admin-hamburger" id="adminHamburger" aria-label="القائمة" aria-expanded="false">
          <i class="fas fa-bars"></i>
        </button>
      </div>
    `;

    /* ============================================================
       OVERLAY
    ============================================================ */
    const overlay = document.createElement('div');
    overlay.id = 'adminOverlay';
    overlay.className = 'admin-overlay';

    /* ============================================================
       DRAWER
    ============================================================ */
    const drawer = document.createElement('div');
    drawer.id = 'adminDrawer';
    drawer.className = 'admin-drawer';

    function navItem(href, icon, label, isActive, extra = '') {
      return `
        <a href="${href}" class="adn-item ${isActive ? 'active' : ''}" data-page="${href}">
          <span>${label}</span>
          <div class="adn-item-right">
            ${extra}
            <i class="${icon} adn-icon"></i>
          </div>
        </a>`;
    }

    function subItem(href, icon, label, isActive, badge = '') {
      const badgeHtml = badge ? `<span class="adn-badge">${badge}</span>` : '';
      return `
        <a href="${href}" class="adn-sub-item ${isActive ? 'active' : ''}">
          <span>${label}</span>
          <div style="display:flex;align-items:center;gap:0.4rem;">
            ${badgeHtml}
            <i class="${icon} adn-sub-icon"></i>
          </div>
        </a>`;
    }

    drawer.innerHTML = `
      <!-- Header -->
      <div class="admin-drawer-header">
        <a href="dashbord.html" class="admin-drawer-brand">
          <i class="fas fa-crown"></i>
          <span>Almaya Admin</span>
        </a>
        <button class="admin-drawer-close" id="adminDrawerClose" aria-label="إغلاق">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <!-- Nav -->
      <nav class="admin-drawer-nav">

        ${navItem('dashbord.html', 'fas fa-home', 'لوحة التحكم', currentPage === 'dashbord.html')}

        ${navItem('admin-orders.html', 'fas fa-cube', 'الطلبيات', currentPage === 'admin-orders.html')}

        <!-- المنتجات - expandable -->
        <div class="adn-item ${isProductSub ? 'active expanded' : ''}" id="productsParent">
          <span>المنتجات</span>
          <div class="adn-item-right">
            <i class="fas fa-chevron-down adn-chevron"></i>
            <i class="fas fa-tag adn-icon"></i>
          </div>
        </div>

        <div class="adn-submenu ${isProductSub ? 'open' : ''}" id="productsSubmenu">
          ${subItem('admin-produits.html', 'fas fa-list', 'جميع المنتجات', currentPage === 'admin-produits.html')}
          ${subItem('admin-produits.html', 'fas fa-plus', 'منتج جديد', false)}
          ${subItem('admin-collections.html', 'fas fa-layer-group', 'التصنيفات', currentPage === 'admin-collections.html')}
          ${subItem('admin-reviews.html', 'fas fa-star', 'المراجعات', currentPage === 'admin-reviews.html')}
          ${subItem('#', 'fas fa-warehouse', 'المخزون', false)}
          ${subItem('#', 'fas fa-box-open', 'الحزم', false, 'جديد')}
        </div>

        <!-- Up Sells -->
        <div class="adn-item ${currentPage === 'upsells.html' ? 'active expanded' : ''}" id="upSellsParent">
          <span>Up Sells</span>
          <div class="adn-item-right">
            <i class="fas fa-chevron-down adn-chevron"></i>
            <i class="fas fa-arrow-trend-up adn-icon"></i>
          </div>
        </div>
        <div class="adn-submenu" id="upSellsSubmenu"></div>

        ${navItem('admin-contact.html', 'fas fa-envelope', 'الرسائل', currentPage === 'admin-contact.html')}

        ${navItem('admin-login.html', 'fas fa-users', 'المسؤولين', currentPage === 'admin-login.html')}

      </nav>

      <!-- Footer -->
      <div class="admin-drawer-footer">
        <button class="admin-footer-btn" id="adminRefreshDrawer">
          <i class="fas fa-sync-alt"></i> تحديث
        </button>
        <button class="admin-footer-btn danger" id="adminLogoutDrawer">
          <i class="fas fa-sign-out-alt"></i> خروج
        </button>
      </div>
    `;

    /* ============================================================
       Inject into DOM
    ============================================================ */
    const firstChild = document.body.firstChild;
    document.body.insertBefore(topbar, firstChild);
    document.body.appendChild(overlay);
    document.body.appendChild(drawer);

    /* ============================================================
       EVENTS
    ============================================================ */
    const hamburger = document.getElementById('adminHamburger');
    const drawerClose = document.getElementById('adminDrawerClose');
    const productsParent = document.getElementById('productsParent');
    const productsSubmenu = document.getElementById('productsSubmenu');
    const upSellsParent = document.getElementById('upSellsParent');
    const upSellsSubmenu = document.getElementById('upSellsSubmenu');
    const refreshTop = document.getElementById('adminRefreshTop');
    const refreshDrawer = document.getElementById('adminRefreshDrawer');
    const logoutBtn = document.getElementById('adminLogoutDrawer');

    function openDrawer() {
      drawer.classList.add('open');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      hamburger.setAttribute('aria-expanded', 'true');
    }

    function closeDrawer() {
      drawer.classList.remove('open');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
      hamburger.setAttribute('aria-expanded', 'false');
    }

    function toggleSubmenu(parent, submenu) {
      const isOpen = submenu.classList.contains('open');
      // close all submenus
      document.querySelectorAll('.adn-submenu.open').forEach(s => s.classList.remove('open'));
      document.querySelectorAll('.adn-item.expanded').forEach(i => i.classList.remove('expanded'));
      if (!isOpen) {
        submenu.classList.add('open');
        parent.classList.add('expanded');
      }
    }

    if (hamburger)       hamburger.addEventListener('click', openDrawer);
    if (drawerClose)     drawerClose.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);

    if (productsParent) {
      productsParent.addEventListener('click', () => toggleSubmenu(productsParent, productsSubmenu));
    }
    if (upSellsParent) {
      upSellsParent.addEventListener('click', () => toggleSubmenu(upSellsParent, upSellsSubmenu));
    }

    if (refreshTop)     refreshTop.addEventListener('click', () => window.location.reload());
    if (refreshDrawer)  refreshDrawer.addEventListener('click', () => window.location.reload());

    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        sessionStorage.clear();
        window.location.href = 'login.html';
      });
    }

    // Close drawer on nav link click (mobile)
    drawer.querySelectorAll('a.adn-item, a.adn-sub-item').forEach(el => {
      el.addEventListener('click', () => setTimeout(closeDrawer, 80));
    });

    // Keyboard: Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
    });

    // Highlight current active link
    drawer.querySelectorAll('[data-page]').forEach(el => {
      if (el.dataset.page === currentPage) el.classList.add('active');
    });

    console.log('✅ Admin Drawer ready | page:', currentPage);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createAdminMenu);
  } else {
    createAdminMenu();
  }
})();