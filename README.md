# Photography & Videography Portfolio with Dynamic Masonry Grid

A responsive photography portfolio featuring a dynamic masonry grid layout with single-page filtering that automatically adapts to different project sizes and screen widths.

## Features

- **Single-Page Filtering**: All projects displayed on one page with hash-based navigation (#all, #videos, #photos)
- **Dynamic Masonry Grid**: Automatically loads and displays projects from the `/projects` directory
- **Responsive Design**: 4 columns on desktop → 3 columns on tablet → 2 columns on mobile
- **Flexible Project Sizes**: Supports various aspect ratios (portrait, landscape, square)
- **Smooth Animations**: Hover effects and transitions for a polished feel
- **Clean Typography**: Uses Crimson Pro (serif) and Work Sans (sans-serif) for an elegant look

## How It Works

The portfolio uses URL hash navigation to filter projects without page reloads:

- **index.html#all** or **index.html** - Shows all projects (default)
- **index.html#videos** - Shows only video projects
- **index.html#photos** - Shows only photo projects

When you click a navigation link, the page filters projects by category instantly without reloading.

## File Structure

```
portfolio/
├── index.html              # Main page with filtering (all projects)
├── css/
│   └── styles.css          # All styles including masonry grid
├── js/
│   └── script.js           # Dynamic filtering and project loading
├── assets/
│   └── logo.png            # Site logo
├── projects/               # ⭐ All your projects go here
│   ├── project-1/
│   │   ├── project.json    # Project metadata
│   │   └── assets/
│   │       └── thumbnail.jpg
│   ├── project-2/
│   │   ├── project.json
│   │   └── assets/
│   │       └── thumbnail.jpg
│   └── ...
└── pages/
    └── contact/            # Contact page
```

## Adding a New Project

1. **Create a project folder** in `/projects/`:
   ```
   /projects/my-new-project/
   ```

2. **Add a `project.json` file** with metadata:
   ```json
   {
     "id": "my-new-project",
     "title": "My Amazing Project",
     "category": "photo",
     "orientation": "portrait",
     "aspectRatio": "3:4",
     "thumbnail": "assets/thumbnail.jpg",
     "link": "pages/photos/projects/my-new-project/index.html"
   }
   ```

   **Important:** The `category` field must be either `"photo"` or `"video"` for filtering to work.

3. **Add your thumbnail image**:
   ```
   /projects/my-new-project/assets/thumbnail.jpg
   ```

4. **Update `js/script.js`** to include your new project folder in the `projectFolders` array:
   ```javascript
   const projectFolders = [
       'project-1',
       'project-2',
       'my-new-project'  // Add this line
   ];
   ```

That's it! The grid will automatically display your new project and filter it correctly.

## Project.json Options

### Category (Required for Filtering)
- `"photo"` - Photography projects (shown in Photos filter)
- `"video"` - Video projects (shown in Videos filter)

### Orientation
- `"portrait"` - Vertical images
- `"landscape"` - Horizontal images
- `"square"` - 1:1 ratio images

### Aspect Ratios
Common ratios and their grid spans:
- `"3:4"` (portrait) - Good for fashion/portraits
- `"2:3"` (tall portrait) - Extra tall format
- `"4:3"` (landscape) - Standard landscape
- `"16:9"` (wide landscape) - Cinematic format
- `"1:1"` (square) - Instagram format

### Example Configurations

**Fashion Portrait (Photo)**:
```json
{
  "category": "photo",
  "orientation": "portrait",
  "aspectRatio": "3:4"
}
```

**Product Video**:
```json
{
  "category": "video",
  "orientation": "portrait",
  "aspectRatio": "9:16"
}
```

**Landscape Photo**:
```json
{
  "category": "photo",
  "orientation": "landscape",
  "aspectRatio": "16:9"
}
```

**Square Video**:
```json
{
  "category": "video",
  "orientation": "square",
  "aspectRatio": "1:1"
}
```

## Customization

### Colors
Edit CSS variables in `css/styles.css`:
```css
:root {
    --bg: #ffffff;           /* Background */
    --text: #1a1a1a;         /* Text color */
    --accent: #16a085;       /* Accent color */
    --border: #e2e8f0;       /* Borders */
}
```

### Grid Columns
Change responsive breakpoints in `css/styles.css`:
```css
/* Desktop: 4 columns */
.masonry-grid {
    grid-template-columns: repeat(4, 1fr);
}

/* Tablet: 3 columns */
@media (max-width: 1200px) {
    .masonry-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

/* Mobile: 2 columns */
@media (max-width: 768px) {
    .masonry-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
```

### Typography
Change fonts by updating the Google Fonts link in `index.html` and the CSS font families.

## Running Locally

```bash
# Using Python's built-in server
python -m http.server 8000

# Or using Node's serve package
npx serve
```

Then open http://localhost:8000 in your browser.

## How the Single-Page Filtering Works

1. Navigation links use hash fragments (`#all`, `#videos`, `#photos`)
2. JavaScript listens for hash changes using the `hashchange` event
3. When the hash changes, the active nav link is updated
4. Projects are filtered by the `category` field in their `project.json`
5. The grid is reloaded with only matching projects
6. All filtering happens instantly without page reloads

This approach:
- ✅ Simplifies the codebase (no duplicate pages)
- ✅ Improves performance (no page navigation)
- ✅ Makes the site feel like a modern single-page app
- ✅ Eliminates complex path logic for subfolders

## How the Masonry Grid Works

The grid uses CSS Grid with `grid-auto-rows: 10px` and dynamic row spanning based on aspect ratios:

1. Each project card spans a calculated number of rows based on its aspect ratio
2. The browser automatically places cards in the optimal position
3. Cards adapt their size when the screen width changes
4. Hover effects reveal project titles and categories

## Browser Support

- Chrome/Edge 89+
- Firefox 88+
- Safari 14.1+