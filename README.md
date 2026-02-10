# Photography & Videography Portfolio (Static Starter)

This is a minimal static portfolio scaffold for showcasing photography and embedded YouTube videos.

What is included:
- `index.html` — the homepage (About + navigation)
- `pages/photos/` — photo gallery page with project list (index at `pages/photos/index.html`)
- `pages/videos/` — video embeds page (index at `pages/videos/index.html`)
- `pages/photos/projects/` and `pages/videos/projects/` — per-project pages (each project is a folder with an `index.html` and `assets/`)
- `styles.css` — basic responsive styles
- `script.js` — lightbox for gallery + mobile nav helper
- `assets/` — placeholder SVG images (replace with your own JPG/PNG)

How to use
1. Replace the placeholder images in `assets/` or in each project's `assets/` folder with your photos. Keep the same filenames or update the project's `assets/images.json` manifest.
2. For videos, update each project's `pages/videos/projects/<project>/assets/videos.json` with the YouTube embed URLs (use `https://www.youtube.com/embed/VIDEO_ID`).
3. Update contact details and the about text in `index.html`.
 
Run locally (PowerShell):

```powershell
# Using Python built-in static server (Python 3)
python -m http.server 8000; # then open http://localhost:8000 in your browser

# Or use the npm 'serve' package if you prefer (requires node)
# npm install -g serve
# serve -s .
```

Notes & next steps
- This starter uses a simple mailto link for contact. If you want a working contact form, I can add a serverless/form-backend integration (e.g., Formspree) or a small server handler.
- Next I can: implement gallery upload workflow, add image EXIF display, add lightbox navigation arrows (already present), and tune styles.

Enjoy — replace the placeholders with your work and tell me if you want a different color scheme or typography.