# Copilot instructions — portfolio

Purpose
- Short: this is a small, static single-page portfolio. Be focused and conservative: make minimal, atomic edits to `index.html`, `style.css`, and `script.js` unless the user asks for a larger refactor.

Big picture (what to know first)
- Single-page static site: `index.html` is the source of truth for content and structure. Styles live in `style.css`. Interaction logic is minimal and lives in `script.js`.
- No build system, no package.json, no tests. Files are served as static assets from the repository root (images are in the repo root as well).

Key files
- `index.html` — page structure and element IDs (see header: `#name`, `#course-year`, `#theme-toggle`, `#achievements`, `#projects`).
- `style.css` — visual styling and theme rules (defines `.dark` on `body`). Note: CSS currently uses `#profile-img` but `index.html` uses a different id for the profile image; prefer fixing the selector or the HTML id (see "Known quirks").
- `script.js` — small DOM script that toggles `body.dark` when `#theme-toggle` is clicked.
- `README.md` — minimal project description / author.

Known quirks & conventions (explicit)
- Theme: toggling theme is implemented by applying `body.dark` (see `script.js`). Persisting theme across reloads is not implemented; add/remove `localStorage` only when requested.
- Profile image id mismatch: `index.html` currently sets the image id to a long filename-like id, while `style.css` targets `#profile-img`. Fix either the HTML id or the CSS selector — do not remove or rename the image file unless asked.
- Content structure: projects and achievements are plain unordered lists (`<ul>`). When adding items, keep structure simple (add `<li>` entries) unless asked to convert to cards.

Developer workflows
- Preview: open `index.html` in a browser. Recommended quick commands (PowerShell):
  - Open directly: Start-Process index.html
  - Serve locally (if you want clean static server): `python -m http.server 8000` from the repo root, then open `http://localhost:8000`.
  - VS Code: use Live Server extension to preview changes (recommended for rapid edits).
- Debugging: use the browser DevTools console for JS errors. Look for missing element IDs or nulls when selecting DOM nodes (the code assumes `#theme-toggle` exists).

When you modify code (rules for the AI)
- Small, focused commits: prefer one logical change per edit (e.g., "fix profile image selector", "add theme persistence").
- Preserve existing file layout and filenames in the root. If you add new assets, store them in the repo root or a new `assets/` folder and update `index.html` paths accordingly.
- For accessibility changes, prefer adding semantic tags and ARIA attributes (e.g., `role`, `aria-label`) and keep changes minimal.

Concrete example tasks (how to implement)
- Fix profile image styling
  - Edit `index.html` and change the `<img>` id to `profile-img` OR edit `style.css` and replace `#profile-img` with the current id used in `index.html`.
  - Verify in browser that image styles apply.
- Persist theme across reloads
  - Update `script.js` to read/write a `theme` key in `localStorage`, apply `body.classList` on load, and keep the existing toggle behavior.
- Add a project card
  - Add a new `<li>` (or convert to `<article class="project">` if asked) under `#projects` in `index.html`, and add a small CSS rule in `style.css` for layout.

Prompt templates (examples to use when the user asks)
- "Add localStorage persistence for the theme toggle — modify `script.js` to save and restore the theme, and add a brief comment explaining behavior." (Target files: `script.js`)
- "Fix profile image styling so the rounded avatar matches `style.css` — change the element id in `index.html` to `profile-img` and ensure alt text remains descriptive." (Target: `index.html`, `style.css`)
- "Add a new project entry with title, short description, and link — update `index.html` and `style.css` for a simple responsive layout." (Target: `index.html`, `style.css`)

If this file exists already
- If `.github/copilot-instructions.md` already exists, preserve any repo-specific prose and merge only the up-to-date facts above (file list, workflows, quirks). Do not delete historical notes without a reason.

Questions to ask if unclear
- Should new assets live in root or an `assets/` folder?
- Do you want theme persistence (localStorage) and if so should it default to light or respect OS preference?

End
- After making changes, run a quick preview in browser and report the exact files edited in the PR description.
