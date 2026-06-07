// admin.js - قائمة تنقل علوية أنيقة ومتجاوبة (نسخة ذكية)
(function() {
    // التحقق إذا كنا في صفحة dashboard
    const isDashboard = window.location.pathname.includes('dashbord.html') || 
                       window.location.pathname === '/' || 
                       window.location.pathname === '/dashbord.html';
    
    // ========== إنشاء القائمة ==========
    function createAdminMenu() {
        const existingMenu = document.getElementById('admin-navbar');
        if (existingMenu) return;

        // إضافة الأنماط
        const style = document.createElement('style');
        style.textContent = `
            /* ===== قائمة التنقل العلوية ===== */
            .admin-navbar {
                background: linear-gradient(135deg, var(--card) 0%, var(--bg2) 100%);
                border-bottom: 2px solid var(--border);
                padding: 0.8rem 2rem;
                position: sticky;
                top: 0;
                z-index: 1000;
                backdrop-filter: blur(12px);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: 0 2px 20px rgba(0,0,0,0.05);
            }
            
            .admin-navbar-container {
                max-width: 1400px;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1.5rem;
            }
            
            /* الشعار */
            .admin-logo {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                color: var(--gold);
                font-weight: 800;
                font-size: 1.1rem;
                white-space: nowrap;
                cursor: pointer;
            }
            
            .admin-logo i {
                font-size: 1.4rem;
                background: linear-gradient(135deg, var(--gold), var(--gold-light));
                -webkit-background-clip: text;
                background-clip: text;
                color: transparent;
            }
            
            /* الروابط */
            .admin-links {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                flex-wrap: wrap;
            }
            
            .admin-link {
                display: flex;
                align-items: center;
                gap: 0.65rem;
                padding: 0.7rem 1.3rem;
                border-radius: 50px;
                color: var(--text-secondary);
                text-decoration: none;
                font-size: 0.9rem;
                font-weight: 600;
                transition: all 0.3s ease;
                cursor: pointer;
                position: relative;
            }
            
            .admin-link i {
                font-size: 1rem;
                transition: transform 0.3s ease;
            }
            
            .admin-link:hover {
                color: var(--gold);
                transform: translateY(-2px);
            }
            
            .admin-link:hover i {
                transform: scale(1.1);
            }
            
            .admin-link.active {
                background: linear-gradient(135deg, rgba(196,160,106,0.15), rgba(196,160,106,0.05));
                color: var(--gold);
                border: 1px solid rgba(196,160,106,0.3);
            }
            
            /* زر تحديث */
            .admin-refresh {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.6rem 1rem;
                background: var(--bg-secondary);
                border: 1px solid var(--border);
                border-radius: 50px;
                cursor: pointer;
                transition: all 0.3s ease;
                color: var(--text-secondary);
                font-size: 0.8rem;
            }
            
            .admin-refresh:hover {
                border-color: var(--gold);
                color: var(--gold);
                transform: rotate(180deg);
            }
            
            /* زر القائمة للهواتف */
            .admin-menu-toggle {
                display: none;
                background: none;
                border: 1px solid var(--border);
                border-radius: 12px;
                padding: 0.6rem 1rem;
                cursor: pointer;
                color: var(--gold);
                font-size: 1.2rem;
                transition: all 0.3s ease;
            }
            
            .admin-menu-toggle:hover {
                background: rgba(196,160,106,0.1);
            }
            
            /* القائمة المنبثقة للهواتف */
            .admin-mobile-menu {
                display: none;
                position: fixed;
                top: 0;
                right: -100%;
                width: 280px;
                height: 100vh;
                background: var(--card);
                z-index: 1001;
                padding: 2rem 1.5rem;
                transition: right 0.3s ease;
                box-shadow: -5px 0 30px rgba(0,0,0,0.3);
                flex-direction: column;
                gap: 0.5rem;
            }
            
            .admin-mobile-menu.open {
                right: 0;
            }
            
            .admin-mobile-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 2rem;
                padding-bottom: 1rem;
                border-bottom: 1px solid var(--border);
            }
            
            .admin-mobile-header h3 {
                color: var(--gold);
                margin: 0;
            }
            
            .admin-mobile-close {
                background: none;
                border: none;
                color: var(--text-secondary);
                font-size: 1.3rem;
                cursor: pointer;
                padding: 0.5rem;
            }
            
            .admin-mobile-link {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 0.9rem 1rem;
                border-radius: 12px;
                color: var(--text);
                text-decoration: none;
                font-size: 0.9rem;
                font-weight: 500;
                transition: all 0.3s ease;
                cursor: pointer;
            }
            
            .admin-mobile-link:hover,
            .admin-mobile-link.active {
                background: rgba(196,160,106,0.1);
                color: var(--gold);
            }
            
            .admin-mobile-link i {
                width: 28px;
                color: var(--gold);
            }
            
            .mobile-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                z-index: 1000;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            .mobile-overlay.active {
                opacity: 1;
                visibility: visible;
            }
            
            body.menu-open {
                overflow: hidden;
            }
            
            /* إخفاء القائمة في dashboard إذا وجدت */
            ${isDashboard ? `
            .admin-navbar {
                margin-bottom: 1rem;
            }
            ` : ''}
            
            /* ===== RESPONSIVE ===== */
            @media (max-width: 768px) {
                .admin-navbar {
                    padding: 0.6rem 1rem;
                }
                
                .admin-links {
                    display: none;
                }
                
                .admin-menu-toggle {
                    display: flex;
                }
                
                .admin-mobile-menu {
                    display: flex;
                }
                
                .admin-logo {
                    font-size: 0.9rem;
                }
                
                .admin-logo i {
                    font-size: 1.2rem;
                }
                
                .admin-refresh {
                    padding: 0.5rem 0.8rem;
                    font-size: 0.75rem;
                }
            }
            
            @media (min-width: 769px) and (max-width: 1024px) {
                .admin-navbar {
                    padding: 0.7rem 1.5rem;
                }
                
                .admin-link {
                    padding: 0.6rem 1rem;
                    font-size: 0.85rem;
                }
            }
            
            @media (max-width: 480px) {
                .admin-navbar-container {
                    gap: 0.8rem;
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

        // إنشاء القائمة الرئيسية
        const navbar = document.createElement('div');
        navbar.className = 'admin-navbar';
        navbar.id = 'admin-navbar';
        
        navbar.innerHTML = `
            <div class="admin-navbar-container">
                <div class="admin-logo" onclick="window.location.href='dashbord.html'">
                    <i class="fas fa-crown"></i>
                    <span>Almaya Couture</span>
                </div>
                
                <div class="admin-links">
                    <div class="admin-link ${!isDashboard && window.location.pathname.includes('admin-produits') ? 'active' : ''}" data-page="admin-produits.html">
                        <i class="fas fa-tshirt"></i>
                        <span>المنتجات</span>
                    </div>
                    <div class="admin-link ${!isDashboard && window.location.pathname.includes('admin-collections') ? 'active' : ''}" data-page="admin-collections.html">
                        <i class="fas fa-layer-group"></i>
                        <span>المجموعات</span>
                    </div>
                    <div class="admin-link ${!isDashboard && window.location.pathname.includes('admin-orders') ? 'active' : ''}" data-page="admin-orders.html">
                        <i class="fas fa-clipboard-list"></i>
                        <span>الطلبات</span>
                    </div>
                    <div class="admin-link ${!isDashboard && window.location.pathname.includes('admin-reviews') ? 'active' : ''}" data-page="admin-reviews.html">
                        <i class="fas fa-star"></i>
                        <span>الآراء</span>
                    </div>
                </div>
                
                <div class="admin-refresh" id="admin-refresh-btn">
                    <i class="fas fa-sync-alt"></i>
                    <span>تحديث</span>
                </div>
                
                <button class="admin-menu-toggle" id="admin-menu-toggle">
                    <i class="fas fa-bars"></i>
                </button>
            </div>
        `;
        
        // إنشاء القائمة المنبثقة للهواتف
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'admin-mobile-menu';
        mobileMenu.id = 'admin-mobile-menu';
        
        mobileMenu.innerHTML = `
            <div class="admin-mobile-header">
                <h3><i class="fas fa-crown"></i> القائمة</h3>
                <button class="admin-mobile-close" id="admin-mobile-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="admin-mobile-link" data-page="admin-produits.html">
                <i class="fas fa-tshirt"></i>
                <span>المنتجات</span>
            </div>
            <div class="admin-mobile-link" data-page="admin-collections.html">
                <i class="fas fa-layer-group"></i>
                <span>المجموعات</span>
            </div>
            <div class="admin-mobile-link" data-page="admin-orders.html">
                <i class="fas fa-clipboard-list"></i>
                <span>الطلبات</span>
            </div>
            <div class="admin-mobile-link" data-page="admin-reviews.html">
                <i class="fas fa-star"></i>
                <span>الآراء</span>
            </div>
        `;
        
        // إنشاء الـ Overlay للهواتف
        const overlay = document.createElement('div');
        overlay.className = 'mobile-overlay';
        overlay.id = 'mobile-overlay';
        
        // إضافة العناصر للصفحة
        const firstChild = document.body.firstChild;
        document.body.insertBefore(navbar, firstChild);
        document.body.appendChild(mobileMenu);
        document.body.appendChild(overlay);
        
        // ========== الأحداث ==========
        
        // فتح القائمة
        const toggleBtn = document.getElementById('admin-menu-toggle');
        const closeBtn = document.getElementById('admin-mobile-close');
        
        function openMobileMenu() {
            mobileMenu.classList.add('open');
            overlay.classList.add('active');
            document.body.classList.add('menu-open');
        }
        
        function closeMobileMenu() {
            mobileMenu.classList.remove('open');
            overlay.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
        
        if (toggleBtn) toggleBtn.addEventListener('click', openMobileMenu);
        if (closeBtn) closeBtn.addEventListener('click', closeMobileMenu);
        overlay.addEventListener('click', closeMobileMenu);
        
        // إغلاق القائمة بالـ Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
                closeMobileMenu();
            }
        });
        
        // التنقل بين الصفحات
        function navigateTo(page) {
            if (page) {
                window.location.href = page;
            }
        }
        
        document.querySelectorAll('.admin-link, .admin-mobile-link').forEach(item => {
            item.addEventListener('click', (e) => {
                const page = item.dataset.page;
                if (page) {
                    closeMobileMenu();
                    setTimeout(() => navigateTo(page), 150);
                }
            });
        });
        
        // زر التحديث
        const refreshBtn = document.getElementById('admin-refresh-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                window.location.reload();
            });
        }
        
        // تمييز الصفحة الحالية
        const currentPage = window.location.pathname.split('/').pop();
        document.querySelectorAll('.admin-link, .admin-mobile-link').forEach(item => {
            if (item.dataset.page === currentPage) {
                item.classList.add('active');
            }
        });
        
        // تأثير التمرير على الشريط
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll > 100) {
                navbar.style.padding = '0.5rem 2rem';
                navbar.style.background = 'var(--card)';
            } else {
                navbar.style.padding = '0.8rem 2rem';
                navbar.style.background = 'linear-gradient(135deg, var(--card) 0%, var(--bg2) 100%)';
            }
            
            if (window.innerWidth <= 768) {
                if (currentScroll > 100) {
                    navbar.style.padding = '0.4rem 1rem';
                } else {
                    navbar.style.padding = '0.6rem 1rem';
                }
            }
        });
        
        console.log('✅ Admin menu loaded successfully');
    }
    
    // انتظار تحميل DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createAdminMenu);
    } else {
        createAdminMenu();
    }
})();