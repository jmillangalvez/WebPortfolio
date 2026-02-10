// Mobile menu toggle
function init() {
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
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', init);
} else {
	init();
}