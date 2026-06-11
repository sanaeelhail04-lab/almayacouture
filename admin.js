// admin.js - قائمة تنقل بسيطة ونظيفة
(function() {
    function createAdminMenu() {
        const existingMenu = document.getElementById('admin-navbar');
        if (existingMenu) return;

        // أنماط بسيطة ونظيفة
        const style = document.createElement('style');
        style.textContent = `
            .admin-navbar {
                background: var(--bg2);
                border-bottom: 1px solid var(--border);
                padding: 0.5rem 1rem;
                position: sticky;
                top: 0;
                z-index: 100;
            }
            
            .admin-navbar-container {
                max-width: 1200px;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
                flex-wrap: wrap;
            }
            
            .admin-logo {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                color: var(--gold);
                font-weight: bold;
                font-size: 1rem;
                cursor: pointer;
            }
            
            .admin-links {
                display: flex;
                align-items: center;
                gap: 0.25rem;
                flex-wrap: wrap;
            }
            
            .admin-link {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.5rem 1rem;
                border-radius: 8px;
                color: var(--text-secondary);
                font-size: 0.85rem;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .admin-link:hover {
                background: var(--border);
                color: var(--gold);
            }
            
            .admin-link.active {
                background: var(--border);
                color: var(--gold);
            }
            
            .admin-refresh {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.5rem 0.8rem;
                background: var(--bg);
                border: 1px solid var(--border);
                border-radius: 8px;
                cursor: pointer;
                color: var(--text-secondary);
                font-size: 0.8rem;
            }
            
            .admin-refresh:hover {
                border-color: var(--gold);
                color: var(--gold);
            }
            
            .admin-menu-toggle {
                display: none;
                background: none;
                border: 1px solid var(--border);
                border-radius: 8px;
                padding: 0.5rem 1rem;
                cursor: pointer;
                color: var(--gold);
                font-size: 1.2rem;
            }
            
            /* القائمة الجانبية للهواتف */
            .admin-sidebar {
                position: fixed;
                top: 0;
                right: -280px;
                width: 280px;
                height: 100%;
                background: var(--bg2);
                z-index: 1001;
                transition: right 0.3s;
                box-shadow: -2px 0 10px rgba(0,0,0,0.2);
            }
            
            .admin-sidebar.open {
                right: 0;
            }
            
            .admin-sidebar-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1rem;
                border-bottom: 1px solid var(--border);
            }
            
            .admin-sidebar-header h4 {
                color: var(--gold);
                margin: 0;
            }
            
            .admin-sidebar-close {
                background: none;
                border: none;
                font-size: 1.3rem;
                cursor: pointer;
                color: var(--text-secondary);
                padding: 0.3rem;
            }
            
            .admin-sidebar-links {
                padding: 1rem;
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }
            
            .admin-sidebar-link {
                display: flex;
                align-items: center;
                gap: 0.8rem;
                padding: 0.8rem;
                border-radius: 8px;
                color: var(--text);
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .admin-sidebar-link:hover,
            .admin-sidebar-link.active {
                background: var(--border);
                color: var(--gold);
            }
            
            .admin-sidebar-link i {
                width: 25px;
                color: var(--gold);
            }
            
            .sidebar-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                z-index: 1000;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s;
            }
            
            .sidebar-overlay.active {
                opacity: 1;
                visibility: visible;
            }
            
            /* استجابة للشاشات الصغيرة */
            @media (max-width: 768px) {
                .admin-links {
                    display: none;
                }
                
                .admin-menu-toggle {
                    display: block;
                }
            }
            
            @media (max-width: 480px) {
                .admin-navbar {
                    padding: 0.4rem 0.8rem;
                }
                
                .admin-logo span {
                    display: none;
                }
                
                .admin-refresh span {
                    display: none;
                }
            }
        `;
        document.head.appendChild(style);

        // بناء القائمة
        const navbar = document.createElement('div');
        navbar.className = 'admin-navbar';
        navbar.id = 'admin-navbar';
        navbar.innerHTML = `
            <div class="admin-navbar-container">
                <div class="admin-logo" onclick="window.location.href='dashboard.html'">
                    <i class="fas fa-crown"></i>
                    <span>لوحة التحكم</span>
                </div>
                <div class="admin-links">
                    <div class="admin-link" data-page="admin-products.html"><i class="fas fa-tshirt"></i><span>المنتجات</span></div>
                    <div class="admin-link" data-page="admin-add-product.html"><i class="fas fa-plus-circle"></i><span>إضافة منتج</span></div>
                    <div class="admin-link" data-page="admin-collections.html"><i class="fas fa-layer-group"></i><span>المجموعات</span></div>
                    <div class="admin-link" data-page="admin-orders.html"><i class="fas fa-clipboard-list"></i><span>الطلبات</span></div>
                    <div class="admin-link" data-page="admin-reviews.html"><i class="fas fa-star"></i><span>الآراء</span></div>
                    <div class="admin-link" data-page="admin-contact.html"><i class="fas fa-envelope"></i><span>الرسائل</span></div>
                    <div class="admin-link" data-page="admin-login.html"><i class="fas fa-users"></i><span>المسؤولين</span></div>
                </div>
                <div class="admin-refresh" id="admin-refresh-btn"><i class="fas fa-sync-alt"></i><span>تحديث</span></div>
                <button class="admin-menu-toggle" id="admin-menu-toggle"><i class="fas fa-bars"></i></button>
            </div>
        `;

        // القائمة الجانبية للهواتف
        const sidebar = document.createElement('div');
        sidebar.className = 'admin-sidebar';
        sidebar.id = 'admin-sidebar';
        sidebar.innerHTML = `
            <div class="admin-sidebar-header">
                <h4><i class="fas fa-crown"></i> القائمة</h4>
                <button class="admin-sidebar-close" id="admin-sidebar-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="admin-sidebar-links">
                <div class="admin-sidebar-link" data-page="admin-products.html"><i class="fas fa-tshirt"></i><span>المنتجات</span></div>
                <div class="admin-sidebar-link" data-page="admin-add-product.html"><i class="fas fa-plus-circle"></i><span>إضافة منتج</span></div>
                <div class="admin-sidebar-link" data-page="admin-collections.html"><i class="fas fa-layer-group"></i><span>المجموعات</span></div>
                <div class="admin-sidebar-link" data-page="admin-orders.html"><i class="fas fa-clipboard-list"></i><span>الطلبات</span></div>
                <div class="admin-sidebar-link" data-page="admin-reviews.html"><i class="fas fa-star"></i><span>الآراء</span></div>
                <div class="admin-sidebar-link" data-page="admin-contact.html"><i class="fas fa-envelope"></i><span>الرسائل</span></div>
                <div class="admin-sidebar-link" data-page="admin-login.html"><i class="fas fa-users"></i><span>المسؤولين</span></div>
            </div>
        `;

        const overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        overlay.id = 'sidebar-overlay';

        // إضافة العناصر للصفحة
        const firstChild = document.body.firstChild;
        document.body.insertBefore(navbar, firstChild);
        document.body.appendChild(sidebar);
        document.body.appendChild(overlay);

        // الأحداث
        const toggleBtn = document.getElementById('admin-menu-toggle');
        const closeBtn = document.getElementById('admin-sidebar-close');
        
        function openSidebar() {
            sidebar.classList.add('open');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        function closeSidebar() {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        if (toggleBtn) toggleBtn.addEventListener('click', openSidebar);
        if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
        overlay.addEventListener('click', closeSidebar);
        
        // إغلاق القائمة بالـ Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && sidebar.classList.contains('open')) {
                closeSidebar();
            }
        });
        
        // التنقل
        function navigateTo(page) {
            if (page) window.location.href = page;
        }
        
        document.querySelectorAll('.admin-link, .admin-sidebar-link').forEach(el => {
            el.addEventListener('click', (e) => {
                const page = el.dataset.page;
                if (page) {
                    closeSidebar();
                    setTimeout(() => navigateTo(page), 150);
                }
            });
        });
        
        // زر التحديث
        const refreshBtn = document.getElementById('admin-refresh-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => window.location.reload());
        }
        
        // تمييز الصفحة الحالية
        const currentPage = window.location.pathname.split('/').pop();
        document.querySelectorAll('.admin-link, .admin-sidebar-link').forEach(el => {
            if (el.dataset.page === currentPage) el.classList.add('active');
        });
        
        console.log('✅ Admin menu ready');
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createAdminMenu);
    } else {
        createAdminMenu();
    }
})();