// Shared Navigation Utilities

/**
 * Initialize navigation highlighting based on current page
 */
function initNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
    const navLinks = document.querySelectorAll('.nav-link, .nav-item');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Initialize profile menu data if elements exist
    updateProfileInfo();

    // Close profile menu when clicking outside
    document.addEventListener('click', (e) => {
        const profileSection = document.querySelector('.profile-section, .profile-container');
        const menu = document.getElementById('profileMenu');
        if (profileSection && menu && menu.classList.contains('active') && !profileSection.contains(e.target)) {
            menu.classList.remove('active');
        }
    });
}

/**
 * Update profile info from localStorage
 */
function updateProfileInfo() {
    const userNameEl = document.querySelector('.user-name');
    const userRoleEl = document.querySelector('.user-role');
    const headerAvatar = document.getElementById('headerAvatar');

    if (!userNameEl && !userRoleEl && !headerAvatar) return;

    const name = localStorage.getItem('user_name') || 'Official';
    const role = localStorage.getItem('role') || 'Officer';

    if (userNameEl) userNameEl.textContent = name;
    if (userRoleEl) {
        const roleText = role === 'official' ? 'Lead Officer' : role.charAt(0).toUpperCase() + role.slice(1);
        userRoleEl.textContent = roleText;
    }

    if (headerAvatar) {
        headerAvatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=f1f5f9&color=64748b`;
    }
}

/**
 * Toggle profile dropdown menu
 */
function toggleProfileMenu() {
    const menu = document.getElementById('profileMenu');
    if (menu) {
        menu.classList.toggle('active');
    }
}

/**
 * Show logout confirmation and perform logout
 */
function confirmLogout() {
    if (typeof showConfirm === 'function') {
        showConfirm(
            'Confirm Logout',
            'Are you sure you want to log out of the system?',
            (confirmed) => {
                if (confirmed) {
                    if (window.Auth && typeof window.Auth.logout === 'function') {
                        window.Auth.logout();
                    } else {
                        // Fallback in case Auth is not loaded
                        localStorage.removeItem('token');
                        localStorage.removeItem('role');
                        localStorage.removeItem('user_name');
                        window.location.href = '/';
                    }
                }
            }
        );
    } else {
        // Fallback to standard confirm if modal system is not loaded
        if (confirm('Are you sure you want to log out?')) {
            window.Auth.logout();
        }
    }
}

/**
 * Navigate to a different page
 */
function navigateTo(url) {
    window.location.href = url;
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', initNavigation);
