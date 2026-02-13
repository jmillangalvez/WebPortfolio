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

async function loadProjects(categoryFilter = null) {
	const grid = document.getElementById('projects-grid');
	if (!grid) return;
	
	grid.classList.add('loading');
	grid.innerHTML = ''; // Clear the grid first

	try {
		const projectFolders = [
			'project-1',
			'project-2',
			'project-3',
			'project-4',
			'project-5',
			'project-6'
		];

		const projects = [];

		// Determine the correct path based on current location
		const isInSubfolder = window.location.pathname.includes('/pages/');
		const basePath = isInSubfolder ? '../../projects/' : 'projects/';

		console.log('Loading projects with filter:', categoryFilter);
		console.log('Base path:', basePath);

		for (const folder of projectFolders) {
			try {
				const url = `${basePath}${folder}/project.json`;
				console.log('Fetching:', url);
				const response = await fetch(url);
				if (response.ok) {
					const projectData = await response.json();
					console.log(`Project ${folder}:`, projectData.category);
					// Apply category filter if specified
					if (!categoryFilter || projectData.category === categoryFilter) {
						projects.push(projectData);
						console.log(`Added project ${folder}`);
					}
				} else {
					console.warn(`Failed to fetch ${folder}: ${response.status}`);
				}
			} catch (err) {
				console.warn(`Failed to load project: ${folder}`, err);
			}
		}

		grid.classList.remove('loading');

		console.log('Total projects after filter:', projects.length);

		if (projects.length === 0) {
			grid.innerHTML = '<p style="text-align:center;color:var(--muted);padding:40px;">No projects found in this category.</p>';
			return;
		}

		projects.forEach(project => {
			const card = createProjectCard(project, isInSubfolder);
			grid.appendChild(card);
		});

		resizeAllGridItems();

	} catch (error) {
		console.error('Error loading projects:', error);
		grid.classList.remove('loading');
		grid.innerHTML = '<p style="text-align:center;color:var(--text-light);padding:40px;">Unable to load projects.</p>';
	}
}


function createProjectCard(project, isInSubfolder = false) {
	const card = document.createElement('a');
	card.href = project.link;
	card.className = 'project-card';
	card.setAttribute('data-orientation', project.orientation);
	card.setAttribute('data-ratio', project.aspectRatio);

	const img = document.createElement('img');
	const imgPath = isInSubfolder 
		? `../../projects/${project.id}/${project.thumbnail}`
		: `projects/${project.id}/${project.thumbnail}`;
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

function init() {
	initMobileMenu();
	
	// Check if we're on a filtered page
	const isVideosPage = window.location.pathname.includes('/pages/videos/');
	const isPhotosPage = window.location.pathname.includes('/pages/photos/');
	
	if (isVideosPage) {
		loadProjects('video');
	} else if (isPhotosPage) {
		loadProjects('photo');
	} else {
		loadProjects(); // No filter - show all projects
	}
	
	window.addEventListener('resize', resizeAllGridItems);
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', init);
} else {
	init();
}