const toggleButton = document.getElementById('theme-toggle');
const body = document.body;

toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark');
});

// ---- Card interactions: achievement preview (lightbox) and project redirect ----
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

// Project cards: redirect to repo or open in new tab
document.querySelectorAll('.card.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const href = card.dataset.href;
        if (href) {
            window.open(href, '_blank', 'noopener');
        }
    });
    card.tabIndex = 0;
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); card.click(); } });
});

// Lightbox close handlers
lightboxClose.addEventListener('click', closeLightbox);
lightboxBackdrop.addEventListener('click', closeLightbox);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

// prevent theme-toggle click from being intercepted when clicking inside header
toggleButton.addEventListener('keydown', (e) => { if (e.key === 'Enter') toggleButton.click(); });
