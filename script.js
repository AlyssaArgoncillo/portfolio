/*
 * AI-assisted: GitHub Copilot
 * Tool: GitHub Copilot
 * Date: 2025-11-26
 * Summary of assistance: Generated initial implementation for theme toggle, mobile navigation, and Discord tooltip.
 * Prompts / notes (short): "How to implement theme switching and mobile navigation with keyboard support."
 * Human review: Reviewed, adjusted, and edited by the repository owner (Alyssa Nicole Argoncillo); tested in browser.
 */


const toggleButton = document.getElementById('theme-toggle');
const body = document.body;

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const siteNav = document.querySelector('.site-nav');
if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
        const isOpen = siteNav.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    document.addEventListener('click', (e) => {
        if (!siteNav.contains(e.target) && siteNav.classList.contains('open')) {
            siteNav.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { siteNav.classList.remove('open'); navToggle.setAttribute('aria-expanded','false'); } });
}

toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark');
    toggleButton.classList.toggle('active');
});

// Swap nav logo when theme changes
const navLogo = document.querySelector('.nav-logo');
const logoLight = 'images/ArgonTech logo/ArgonTech Light Colored Transparent.png';
const logoDark = 'images/ArgonTech logo/ArgonTech Dark Colored Transparent.png';
if (navLogo) {
    // set initial logo based on current theme
    navLogo.src = body.classList.contains('dark') ? logoLight : logoDark;
    toggleButton.addEventListener('click', () => {
        navLogo.src = body.classList.contains('dark') ? logoLight : logoDark;
    });
}

// Swap footer logo when theme changes
const footerLogo = document.querySelector('.footer-logo');
if (footerLogo) {
    footerLogo.src = body.classList.contains('dark') ? logoLight : logoDark;
    toggleButton.addEventListener('click', () => {
        footerLogo.src = body.classList.contains('dark') ? logoLight : logoDark;
    });
}

// prevent theme-toggle click from interception
toggleButton.addEventListener('keydown', (e) => { if (e.key === 'Enter') toggleButton.click(); });

// Discord button tooltip handler
const discordBtn = document.getElementById('discord-btn');
const discordTooltip = document.getElementById('discord-tooltip');
if (discordBtn && discordTooltip) {
    discordBtn.addEventListener('click', () => {
        discordTooltip.classList.toggle('show');
    });
    
    document.addEventListener('click', (e) => {
        if (!discordBtn.contains(e.target) && !discordTooltip.contains(e.target)) {
            discordTooltip.classList.remove('show');
        }
    });
}

// Mobile skill icon tooltip handler
if (window.matchMedia('(max-width: 800px)').matches) {
    const iconBoxes = document.querySelectorAll('.icon-box');
    iconBoxes.forEach(iconBox => {
        iconBox.addEventListener('click', (e) => {
            e.preventDefault();
            // Remove tooltip from all other icons
            iconBoxes.forEach(box => {
                if (box !== iconBox) {
                    box.classList.remove('show-tooltip');
                }
            });
            // Toggle tooltip on clicked icon
            iconBox.classList.toggle('show-tooltip');
        });
    });
    
    // Close tooltip when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.icon-box')) {
            iconBoxes.forEach(box => box.classList.remove('show-tooltip'));
        }
    });
}
