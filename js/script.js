// Mobile menu toggle
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

// Dynamic project loading for home page
async function loadProjects() {
	const grid = document.getElementById('projects-grid');
	if (!grid) return;
	
	grid.classList.add('loading');
	
	try {
		// Get all project directories
		const projectFolders = [
			'project-1',
			'project-2',
			'project-3',
			'project-4',
			'project-5',
			'project-6'
		];
		
		const projects = [];
		
		// Load each project's JSON
		for (const folder of projectFolders) {
			try {
				const response = await fetch(`projects/${folder}/project.json`);
				if (response.ok) {
					console.log(`Loaded project: ${folder}`);
					const projectData = await response.json();
					projects.push(projectData);
				}
			} catch (err) {
				console.warn(`Failed to load project: ${folder}`, err);
			}
		}
		
		// Clear loading state
		grid.classList.remove('loading');
		
		// Render projects
		projects.forEach(project => {
			const card = createProjectCard(project);
			grid.appendChild(card);
		});
		
		// Recalculate grid layout
		resizeAllGridItems();
		
	} catch (error) {
		console.error('Error loading projects:', error);
		grid.classList.remove('loading');
		grid.innerHTML = '<p style="text-align:center;color:var(--text-light);padding:40px;">Unable to load projects.</p>';
	}
}

// Create a project card element
function createProjectCard(project) {
	const card = document.createElement('a');
	card.href = project.link;
	card.className = 'project-card';
	card.setAttribute('data-orientation', project.orientation);
	card.setAttribute('data-ratio', project.aspectRatio);
	
	// Create image
	const img = document.createElement('img');
	img.src = `projects/${project.id}/${project.thumbnail}`;
	img.alt = project.title;
	img.loading = 'lazy';
	
	// Create info overlay
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

// Recalculate grid item heights based on aspect ratio
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

// Initialize when DOM ready
function init() {
	initMobileMenu();
	loadProjects();
	window.addEventListener('resize', resizeAllGridItems);
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', init);
} else {
	init();
}