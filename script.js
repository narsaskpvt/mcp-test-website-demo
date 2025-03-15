// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Initialize theme from localStorage or system preference
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    } else if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeIcon('dark');
    }
}

function updateThemeIcon(theme) {
    themeToggle.textContent = theme === 'dark' ? '🌞' : '🌜';
    // Announce theme change for screen readers
    announceThemeChange(theme);
}

function announceThemeChange(theme) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = `Theme changed to ${theme} mode`;
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

// Language Switch Functionality
const languageToggle = document.getElementById('language-toggle');
const languageMenu = document.querySelector('.language-menu');
let isLanguageMenuOpen = false;

function toggleLanguageMenu() {
    isLanguageMenuOpen = !isLanguageMenuOpen;
    languageMenu.style.display = isLanguageMenuOpen ? 'block' : 'none';
    languageToggle.setAttribute('aria-expanded', isLanguageMenuOpen);
}

function handleLanguageSelection(lang) {
    languageToggle.textContent = lang.toUpperCase();
    toggleLanguageMenu();
    // Announce language change for screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = `Language changed to ${lang}`;
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
}

// Keyboard Navigation for Language Menu
languageToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleLanguageMenu();
    } else if (e.key === 'Escape' && isLanguageMenuOpen) {
        toggleLanguageMenu();
    }
});

// Close language menu when clicking outside
document.addEventListener('click', (e) => {
    if (isLanguageMenuOpen && !e.target.closest('.language-switch')) {
        toggleLanguageMenu();
    }
});

// Form Submission Handler
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Demo alert - replace with actual form submission
        alert('Form submitted successfully!');
    });
}

// Focus Management
const mainContent = document.querySelector('main');
const skipLink = document.querySelector('.skip-nav');

skipLink.addEventListener('click', (e) => {
    e.preventDefault();
    mainContent.tabIndex = -1;
    mainContent.focus();
});

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', initializeTheme);

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    // Alt + T for theme toggle
    if (e.altKey && e.key === 't') {
        e.preventDefault();
        themeToggle.click();
    }
    // Alt + L for language menu
    if (e.altKey && e.key === 'l') {
        e.preventDefault();
        toggleLanguageMenu();
    }
});