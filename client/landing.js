/* Landing Page Logic */

document.addEventListener('DOMContentLoaded', () => {
    const landingView = document.getElementById('view-landing');
    const continueBtn = document.getElementById('landing-continue-btn');
    const loadingRing = document.querySelector('.premium-loader');
    const loadingText = document.querySelector('.loading-text');

    // Timer logic: Show CONTINUE button after 4 seconds of animation
    setTimeout(() => {
        if (loadingRing) loadingRing.style.display = 'none';
        if (loadingText) loadingText.innerText = 'System Ready';
        if (continueBtn) {
            continueBtn.style.display = 'block';
            continueBtn.style.animation = 'fadeIn 0.5s ease forwards';
        }
    }, 4000);
    
    // Betting Chip Spawner
    let chipInterval = setInterval(() => {
        if (!landingView.classList.contains('active')) return;
        createFloatingChip();
    }, 1000);

    function createFloatingChip() {
        const chip = document.createElement('div');
        const types = ['', 'red', 'violet'];
        const labels = ['₹10', '₹100', '₹500', '₹1K', 'BIG', 'SMALL', 'RED', 'G'];
        
        const type = types[Math.floor(Math.random() * types.length)];
        chip.className = `floating-chip ${type}`;
        chip.innerText = labels[Math.floor(Math.random() * labels.length)];
        
        const targetX = Math.floor(Math.random() * 100) + '%';
        chip.style.setProperty('--target-x', targetX);
        chip.style.left = '50%';
        
        landingView.appendChild(chip);
        setTimeout(() => chip.remove(), 3000);
    }
});

// New function to manually advance to Auth Section
window.showLandingAuth = function() {
    const loader = document.getElementById('landing-loader');
    const welcomeText = document.getElementById('landing-welcome-text');
    const authSection = document.getElementById('landing-auth-section');

    if (loader) loader.style.display = 'none';
    if (welcomeText) {
        welcomeText.style.display = 'block';
        welcomeText.style.animation = 'fadeIn 1s ease forwards';
    }
    if (authSection) {
        authSection.style.display = 'block';
        authSection.style.animation = 'fadeIn 1s ease forwards';
    }
}

// Global functions for Landing Auth
window.handleLandingAuth = async function() {
    const phone = document.getElementById('landing-reg-user').value.trim();
    const pass = document.getElementById('landing-reg-pass').value;
    
    if (!phone || !pass) {
        return showToast('Please enter your details to register', true);
    }

    // Pre-fill the login fields for convenience
    const loginUserField = document.getElementById('loginUsername');
    const loginPassField = document.getElementById('loginPassword');
    if (loginUserField) loginUserField.value = phone;
    // We can also pre-fill password if we want, but let's just do the phone as requested
    
    // Switch to the main login view as requested
    if (typeof switchView === 'function') {
        switchView('view-user-login');
    }
}
