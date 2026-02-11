# Photography & Videography Portfolio with Dynamic Masonry Grid

A responsive photography portfolio featuring a dynamic masonry grid layout that automatically adapts to different project sizes and screen widths.

## Features

- **Dynamic Masonry Grid**: Automatically loads and displays projects from the `/projects` directory
- **Responsive Design**: 4 columns on desktop → 3 columns on tablet → 2 columns on mobile
- **Flexible Project Sizes**: Supports various aspect ratios (portrait, landscape, square)
- **Smooth Animations**: Hover effects and transitions for a polished feel
- **Clean Typography**: Uses Crimson Pro (serif) and Work Sans (sans-serif) for an elegant look

## File Structure

```
portfolio/
├── index.html              # Home page with dynamic grid
├── css/
│   └── styles.css          # All styles including masonry grid
├── js/
│   └── script.js           # Dynamic project loading logic
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
    ├── photos/
    ├── videos/
    └── contact/
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
     "category": "photography",
     "orientation": "portrait",
     "aspectRatio": "3:4",
     "thumbnail": "assets/thumbnail.jpg",
     "link": "pages/photos/projects/my-new-project/index.html"
   }
   ```

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

That's it! The grid will automatically display your new project.

## Project.json Options

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

**Fashion Portrait**:
```json
{
  "orientation": "portrait",
  "aspectRatio": "3:4"
}
```

**Product Shot**:
```json
{
  "orientation": "portrait",
  "aspectRatio": "2:3"
}
```

**Landscape Photo**:
```json
{
  "orientation": "landscape",
  "aspectRatio": "16:9"
}
```

**Square Format**:
```json
{
  "orientation": "square",
  "aspectRatio": "1:1"
}
```

## Customization

### Colors
Edit CSS variables in `css/styles.css`:
```css
:root {
    --bg: #fafafa;           /* Background */
    --text: #1a1a1a;         /* Text color */
    --accent: #c9755f;       /* Accent color */
    --border: #e5e5e5;       /* Borders */
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

## Next Steps

- Replace placeholder images with your actual work
- Create individual project pages in `/pages/photos/projects/`
- Update contact information in `/pages/contact/index.html`
- Add more projects by following the structure above

Enjoy showcasing your work! 📸