// script.js - Menangani login/logout dan interaksi halaman

// Tunggu DOM siap
document.addEventListener('DOMContentLoaded', function() {
    
    // Elemen-elemen yang dibutuhkan
    const publicArea = document.getElementById('publicArea');
    const internalArea = document.getElementById('internalArea');
    const loginTrigger = document.getElementById('loginTrigger');
    const logoutBtn = document.getElementById('logoutBtn');
    
    // State login dari sessionStorage (agar tetap selama tab terbuka)
    let isLoggedIn = sessionStorage.getItem('orgLoggedIn') === 'true';
    
    /**
     * Fungsi untuk memperbarui tampilan berdasarkan status login
     */
    function updateUI() {
        if (isLoggedIn) {
            // Sembunyikan area publik, tampilkan internal
            if (publicArea) publicArea.style.display = 'none';
            if (internalArea) {
                internalArea.classList.add('show-internal');
                internalArea.style.display = 'block';
            }
            if (loginTrigger) loginTrigger.style.display = 'none';
            if (logoutBtn) logoutBtn.style.display = 'inline-block';
        } else {
            // Tampilkan area publik, sembunyikan internal
            if (publicArea) publicArea.style.display = 'block';
            if (internalArea) {
                internalArea.classList.remove('show-internal');
                internalArea.style.display = 'none';
            }
            if (loginTrigger) loginTrigger.style.display = 'inline-block';
            if (logoutBtn) logoutBtn.style.display = 'none';
        }
    }
    
    /**
     * Event Login (simulasi langsung sukses)
     */
    if (loginTrigger) {
        loginTrigger.addEventListener('click', function(e) {
            e.preventDefault(); // Mencegah link melompat
            isLoggedIn = true;
            sessionStorage.setItem('orgLoggedIn', 'true');
            updateUI();
            // Scroll halus ke atas biar liat dashboard
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    /**
     * Event Logout
     */
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            isLoggedIn = false;
            sessionStorage.removeItem('orgLoggedIn');
            updateUI();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Panggil pertama kali untuk mengatur tampilan awal
    updateUI();
    
    /**
     * Mencegah link kosong (#) dari reload/scroll ke atas
     * tapi tetap mempertahankan anchor halus untuk section
     */
    document.querySelectorAll('.nav-links a[href="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href') === '#') e.preventDefault();
        });
    });
    
    /**
     * Smooth scroll untuk anchor link (misal: #tentang, #program)
     * Kecuali tombol login/logout
     */
    document.querySelectorAll('a[href^="#"]:not(.login-btn):not(.logout)').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // skip yang cuma #
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
});