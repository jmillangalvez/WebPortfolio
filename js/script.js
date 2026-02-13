function initMobileMenu() {
	const menuToggle = document.querySelector('.menu-toggle');
	const nav = document.querySelector('.nav');

	if (menuToggle && nav) {
		menuToggle.addEventListener('click', () => {
			const open = menuToggle.getAttribute('aria-expanded') === 'true';
			menuToggle.setAttribute('aria-expanded', String(!open));
			nav.classList.toggle('open');
		});
	}
}

function updateActiveNav() {
	const hash = window.location.hash.slice(1) || 'all';
	const navLinks = document.querySelectorAll('.nav a[data-filter]');
	
	navLinks.forEach(link => {
		const filter = link.getAttribute('data-filter');
		if (filter === hash || (hash === '' && filter === 'all')) {
			link.classList.add('active');
		} else {
			link.classList.remove('active');
		}
	});
}

async function loadProjects() {
	const grid = document.getElementById('projects-grid');
	if (!grid) return;

	const hash = window.location.hash.slice(1) || 'all';
	const categoryFilter = hash === 'all' ? null : hash;

	grid.innerHTML = '';

	try {
		const projects = [];
		const basePath = 'projects/';
		const projectFolders = [
			'project-1',
			'project-2',
			'project-3',
			'project-4',
			'project-5',
			'project-6'
		];

		for (const folder of projectFolders) {
			const url = `${basePath}${folder}/project.json`;
			const response = await fetch(url);
			if (response.ok) {
				const projectData = await response.json();
				if (!categoryFilter || projectData.category === categoryFilter) {
					projects.push(projectData);
				}
			}
		}

		if (projects.length === 0) {
			grid.innerHTML = '<p style="text-align:center;color:var(--muted);padding:40px;">No projects found in this category.</p>';
			return;
		}

		projects.forEach(project => {
			const card = createProjectCard(project);
			grid.appendChild(card);
		});

		resizeAllGridItems();

	} catch (error) {
		grid.innerHTML = '<p style="text-align:center;color:var(--text-light);padding:40px;">Unable to load projects.</p>';
	}
}

function createProjectCard(project) {
	const card = document.createElement('a');
	card.href = project.link;
	card.className = 'project-card';
	card.setAttribute('data-orientation', project.orientation);
	card.setAttribute('data-ratio', project.aspectRatio);

	const img = document.createElement('img');
	const imgPath = `projects/${project.id}/${project.thumbnail}`;
	img.src = imgPath;
	img.alt = project.title;
	img.loading = 'lazy';

	const info = document.createElement('div');
	info.className = 'project-info';

	const title = document.createElement('h3');
	title.textContent = project.title;

	const category = document.createElement('div');
	category.className = 'category';
	category.textContent = project.category;

	info.appendChild(title);
	info.appendChild(category);

	card.appendChild(img);
	card.appendChild(info);
	
	return card;
}

function resizeAllGridItems() {
	const grid = document.querySelector('.masonry-grid');
	if (!grid) return;

	const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows')) || 10;
	const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('gap')) || 0;

	const items = grid.getElementsByClassName('project-card');

	for (const item of items) {
		const ratioStr = item.getAttribute('data-ratio');
		if (!ratioStr) continue;

		const [w, h] = ratioStr.split(':').map(Number);
		const aspectRatio = w / h;

		const width = item.getBoundingClientRect().width;
		if (!width) continue;

		const height = width / aspectRatio;
		const span = Math.ceil((height + rowGap) / (rowHeight + rowGap));

		item.style.gridRowEnd = `span ${span}`;
	}
}

function handleHashChange() {
	updateActiveNav();
	loadProjects();
}

function init() {
	initMobileMenu();
	updateActiveNav();
	loadProjects();

	window.addEventListener('hashchange', handleHashChange);
	window.addEventListener('resize', resizeAllGridItems);
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', init);
} else {
	init();
}