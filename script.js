/*
 * AI-assisted: GitHub Copilot
 * Tool: GitHub Copilot
 * Date: 2025-11-26
 * Summary of assistance: Generated initial implementation of card click handlers, lightbox modal behavior, and keyboard support.
 * Prompts / notes (short): "How to add click handlers to open achievement lightbox and open project links in new tab. How to add keyboard support and Escape to close."
 * Human review: Reviewed, adjusted, and edited by the repository owner (Alyssa Nicole Argoncillo); tested in browser.
 */


const toggleButton = document.getElementById('theme-toggle');
const body = document.body;

toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark');
});

// Card interactions: achievement preview (lightbox) and project redirect
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxBackdrop = document.getElementById('lightbox-backdrop');

function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || 'Preview';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
}

// Achievement cards: open lightbox with full image
document.querySelectorAll('.card.achievement-card').forEach(card => {
    card.addEventListener('click', () => {
        const img = card.dataset.img || card.querySelector('.card-img')?.src;
        if (img) openLightbox(img, card.querySelector('.card-label')?.textContent);
    });
    card.tabIndex = 0;
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); } });
});

// Project cards: open in new tab
document.querySelectorAll('.card.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const repo = card.dataset.repo;
        const site = card.dataset.site;
        const desc = card.dataset.desc;
        const langs = card.dataset.langs;
        const title = card.querySelector('.card-label')?.textContent || 'Project';
        const img = card.querySelector('.card-img')?.src || '';
        openProjectPanel({ title, img, desc, langs, repo, site });
    });
    card.tabIndex = 0;
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); card.click(); } });
});

// Project detail panel handling
const projectPanel = document.getElementById('project-panel');
const projectBackdrop = document.getElementById('project-backdrop');
const projectClose = document.getElementById('project-close');
const projectTitle = document.getElementById('project-title');
const projectImg = document.getElementById('project-img');
const projectDesc = document.getElementById('project-desc');
const projectLangs = document.getElementById('project-langs');
const projectRepoBtn = document.getElementById('project-repo');
const projectSiteBtn = document.getElementById('project-site');

function openProjectPanel({ title, img, desc, langs, repo, site }) {
    projectTitle.textContent = title || 'Project';
    projectImg.src = img || '';
    projectImg.alt = title + ' preview';
    projectDesc.textContent = desc || '';
    projectLangs.textContent = langs ? `Languages: ${langs}` : '';
    if (repo) {
        projectRepoBtn.href = repo;
        projectRepoBtn.style.display = '';
    } else {
        projectRepoBtn.style.display = 'none';
    }
    if (site) {
        projectSiteBtn.href = site;
        projectSiteBtn.style.display = '';
    } else {
        projectSiteBtn.style.display = 'none';
    }
    projectPanel.classList.add('open');
    projectPanel.setAttribute('aria-hidden', 'false');
}

function closeProjectPanel() {
    projectPanel.classList.remove('open');
    projectPanel.setAttribute('aria-hidden', 'true');
    projectImg.src = '';
}

projectClose.addEventListener('click', closeProjectPanel);
projectBackdrop.addEventListener('click', closeProjectPanel);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeProjectPanel(); } });

// Lightbox close handlers
lightboxClose.addEventListener('click', closeLightbox);
lightboxBackdrop.addEventListener('click', closeLightbox);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

// prevent theme-toggle click from being intercepted when clicking inside header
toggleButton.addEventListener('keydown', (e) => { if (e.key === 'Enter') toggleButton.click(); });
