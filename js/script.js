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
			'project-1'
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

// Initialize when DOM ready
function init() {
	initMobileMenu();
	loadProjects();
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', init);
} else {
	init();
}