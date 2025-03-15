// Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
const themeText = themeToggle.querySelector('.theme-toggle-text');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
document.body.setAttribute('data-theme', savedTheme);
themeText.textContent = savedTheme === 'dark' ? '🌜' : '🌞';

themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeText.textContent = newTheme === 'dark' ? '🌜' : '🌞';
    
    // Announce theme change to screen readers
    announceThemeChange(newTheme);
});

// Language switcher
const languageToggle = document.getElementById('language-toggle');
const languageMenu = document.querySelector('.language-menu');
const currentLanguage = document.querySelector('.current-language');

languageToggle.addEventListener('click', () => {
    const isExpanded = languageToggle.getAttribute('aria-expanded') === 'true';
    languageToggle.setAttribute('aria-expanded', !isExpanded);
    languageMenu.hidden = isExpanded;
});

// Close language menu when clicking outside
document.addEventListener('click', (event) => {
    if (!languageToggle.contains(event.target)) {
        languageToggle.setAttribute('aria-expanded', 'false');
        languageMenu.hidden = true;
    }
});

// Keyboard navigation for language menu
languageMenu.addEventListener('keydown', (event) => {
    const items = Array.from(languageMenu.querySelectorAll('button'));
    const currentIndex = items.indexOf(document.activeElement);
    
    switch (event.key) {
        case 'ArrowUp':
            event.preventDefault();
            if (currentIndex > 0) {
                items[currentIndex - 1].focus();
            }
            break;
        case 'ArrowDown':
            event.preventDefault();
            if (currentIndex < items.length - 1) {
                items[currentIndex + 1].focus();
            }
            break;
        case 'Escape':
            event.preventDefault();
            languageToggle.setAttribute('aria-expanded', 'false');
            languageMenu.hidden = true;
            languageToggle.focus();
            break;
    }
});

// Accessibility announcement utility
function announceThemeChange(theme) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = `Theme changed to ${theme} mode`;
    document.body.appendChild(announcement);
    
    // Remove announcement after it's been read
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Add keyboard shortcut for accessibility menu (Alt + A)
document.addEventListener('keydown', (event) => {
    if (event.altKey && event.key.toLowerCase() === 'a') {
        event.preventDefault();
        // This is a placeholder for future accessibility menu implementation
        alert('Accessibility menu coming soon!');
    }
});

// Form submission handling
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        // This is a placeholder for form submission
        alert('Form submission is just a demo. No data will be sent.');
    });
}

// Initialize focus management
document.addEventListener('DOMContentLoaded', () => {
    // Add focus outline to the main content when skipping navigation
    const mainContent = document.getElementById('main-content');
    mainContent.addEventListener('focus', () => {
        mainContent.style.outline = 'none';
        mainContent.style.boxShadow = '0 0 0 3px var(--focus-color)';
    });
    
    mainContent.addEventListener('blur', () => {
        mainContent.style.boxShadow = 'none';
    });
});