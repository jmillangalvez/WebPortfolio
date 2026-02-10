// Simple lightbox for gallery
const thumbs = document.querySelectorAll('.thumb');
const lightbox = document.getElementById('lightbox');
const lbImage = document.querySelector('.lb-image');
const lbClose = document.querySelector('.lb-close');
const lbPrev = document.querySelector('.lb-prev');
const lbNext = document.querySelector('.lb-next');
let currentIndex = -1;
let gallerySources = [];

function refreshGallerySources() {
	gallerySources = Array.from(document.querySelectorAll('.thumb')).map(btn => btn.dataset.src);
}

function openLightbox(index) {
	if (index < 0 || index >= gallerySources.length) return;
	currentIndex = index;
	lbImage.src = gallerySources[currentIndex];
	lightbox.setAttribute('aria-hidden', 'false');
	document.body.style.overflow = 'hidden';
}

function closeLightbox() {
	lightbox.setAttribute('aria-hidden', 'true');
	lbImage.src = '';
	document.body.style.overflow = '';
}

function showPrev() {
	openLightbox((currentIndex - 1 + gallerySources.length) % gallerySources.length);
}

function showNext() {
	openLightbox((currentIndex + 1) % gallerySources.length);
}

// Wire up events
function init() {
	refreshGallerySources();
	thumbs.forEach((btn, i) => {
		btn.addEventListener('click', () => openLightbox(i));
	});

	// Lightbox controls: only wire these up if the elements exist on the page
	if (lbClose) lbClose.addEventListener('click', closeLightbox);
	if (lbPrev) lbPrev.addEventListener('click', showPrev);
	if (lbNext) lbNext.addEventListener('click', showNext);
	if (lightbox) {
		lightbox.addEventListener('click', (e) => {
			if (e.target === lightbox) closeLightbox();
		});

		document.addEventListener('keydown', (e) => {
			if (lightbox.getAttribute('aria-hidden') === 'false') {
				if (e.key === 'Escape') closeLightbox();
				if (e.key === 'ArrowRight') showNext();
				if (e.key === 'ArrowLeft') showPrev();
			}
		});
	}

	// footer year
	const y = document.getElementById('year');
	if (y) y.textContent = new Date().getFullYear();

	// mobile menu toggle
	const menuToggle = document.querySelector('.menu-toggle');
	const nav = document.querySelector('.nav');
	if (menuToggle && nav) {
		menuToggle.addEventListener('click', () => {
			const open = menuToggle.getAttribute('aria-expanded') === 'true';
			menuToggle.setAttribute('aria-expanded', String(!open));
			nav.style.display = open ? 'none' : 'flex';
		});
	}
}

// Initialize when DOM ready
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
