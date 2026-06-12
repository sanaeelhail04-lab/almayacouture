// auth.js - حماية الصفحات (النسخة النهائية)
(function() {
    'use strict';
    
    // التحقق إذا كان المستخدم مسجل الدخول
    const isLoggedIn = sessionStorage.getItem('admin_logged_in') === 'true';
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // الصفحة الوحيدة المسموح بها بدون تسجيل دخول
    const ALLOWED_PAGE = 'login.html';
    
    // قائمة صفحات الإدارة (المحمية)
    const adminPages = [
        'dashboard.html',
        'admin-produits.html', 
        'admin-collections.html',
        'admin-orders.html',
        'admin-reviews.html',
        'admin-login.html'
    ];
    
    console.log(`🔐 صفحة حالية: ${currentPage}`);
    console.log(`📋 حالة تسجيل الدخول: ${isLoggedIn ? 'نشط' : 'غير نشط'}`);
    
    // حالة 1: غير مسجل دخول + ليس في صفحة login → يروح لـ login
    if (!isLoggedIn && currentPage !== ALLOWED_PAGE) {
        console.log('🚫 غير مصرح به، جاري التوجيه إلى login.html');
        sessionStorage.removeItem('redirect_after_login');
        sessionStorage.setItem('redirect_after_login', currentPage);
        window.location.href = ALLOWED_PAGE;
        return;
    }
    
    // حالة 2: مسجل دخول + في صفحة login → يروح لـ dashboard
    if (isLoggedIn && currentPage === ALLOWED_PAGE) {
        console.log('✅ مسجل دخول بالفعل، جاري التوجيه إلى dashboard.html');
        const redirectPage = sessionStorage.getItem('redirect_after_login') || 'dashboard.html';
        sessionStorage.removeItem('redirect_after_login');
        window.location.href = redirectPage;
        return;
    }
    
   
    
    // حالة 4: غير مسجل دخول + في صفحة admin → يروح لـ login
    if (!isLoggedIn && adminPages.includes(currentPage)) {
        console.log('🚫 صفحة إدارة محمية، جاري التوجيه إلى login.html');
        sessionStorage.setItem('redirect_after_login', currentPage);
        window.location.href = ALLOWED_PAGE;
        return;
    }
    
    console.log('✅ مصرح به، استمرار التحميل');
    
    // إذا كان مسجل دخول، عرض اسم المسؤول في console
    if (isLoggedIn) {
        const adminName = sessionStorage.getItem('admin_name') || 'مسؤول';
        console.log(`👤 مرحباً ${adminName}`);
    }
})();