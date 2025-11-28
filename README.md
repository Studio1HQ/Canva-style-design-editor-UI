## Prompt Used for UI

```text
Build a minimal, production-ready Canva-like web app (MVP) using React that lets users create a simple vertical Instagram/Story-sized design like the screenshot reference. Focus on clean, minimal UI and a robust canvas editor with basic features: templates, image uploads, text, shapes, layers, transforms (move/scale/rotate), simple style controls, and export (PNG/PDF). Keep UI minimal and closely follow the attached design reference: /mnt/data/6493fecb-4593-443b-bdea-4ce49e5de29d.png.

UI/Design reference: /mnt/data/6493fecb-4593-443b-bdea-4ce49e5de29d.png

Recommended tech stack (follow unless you have a strong reason to change)

Frontend: React + Vite (or Next.js if you want SSR/easier hosting later)

Canvas engine: react-konva (Konva) or fabric.js if you prefer an imperative canvas object model. (Either is acceptable; pick Konva for React-idiomatic declarative flow.) konvajs.org+1

Transforms / handles: react-moveable to provide visual transform handles (resize/rotate/scale/warp). npm+1

Uploads: Uppy for image upload UI & remote sources. uppy.io

Color pickers: react-color or PrimeReact ColorPicker. casesandberg.github.io+1

Export: Use stage.toDataURL() (Konva) or canvas.toDataURL() and jsPDF / html2canvas for PDF export. Stack Overflow

State management: React context + Zustand for local app state (or simple useState for MVP). Persist editor JSON via localStorage and allow export/import of JSON.

Styling: Tailwind CSS for rapid clean/minimal UI, or plain CSS modules.

Optional (real-time/collab later): Yjs (CRDT) with a websocket provider. yjs.dev

MVP Feature list (must-have)

Canvas workspace

Default canvas size: vertical story/post ratio (e.g., 1080 × 1920 or 374 × 812 for viewport). Canvas centered in page like the screenshot.

Zoom & pan controls (basic: fit-to-screen, 100%, zoom slider).

Add / manage layers

Add image, text layer, rectangle/ellipse/line.

Layer stack with reorder, hide/show, delete.

Image uploads

Drag & drop or upload via Uppy; scale/position/crop basic.

Text editing

Add text box, type inline, change font size, font family (Google Fonts), weight, alignment, color; support multiline and simple line-height control.

Transforms

Move (drag), resize (keeping aspect ratio with shift), rotate, flip horizontally/vertically.

Use react-moveable handles on selected objects.

Style controls

Fill color, stroke color & width, opacity.

For images: brightness/contrast/simple filters (optional).

Templates / presets

Provide 3–5 starter templates (pre-arranged layers with placeholder text & image).

Export

Export canvas to PNG (download) + export to PDF using jsPDF or html2canvas.

Save / load

Save design to local JSON and load from JSON.

Undo / redo (minimum 10 steps)

Responsive minimal UI

Left sidebar: tools/templates (icons + labels)

Center: canvas

Right sidebar: properties inspector for selection

Top bar: file actions (New, Save, Export), zoom, undo/redo

Bottom: page thumbnails / timeline (optional)

Accessibility basics

Keyboard shortcuts for move (arrow keys), delete, undo/redo.

Non-functional requirements

Performance: Offscreen rendering for expensive operations, skip rendering offscreen objects (Konva supports optimizations). Persist only necessary parts of state to avoid huge re-renders. fabricjs.com

Code quality: TypeScript, ESLint, Prettier, modular components, unit tests for core utilities (transform math, export).

Extensibility: Codebase structured so new tools (stickers, icons, shapes) can be added easily.

Component breakdown (suggested)

App — global providers (Zustand store, Theme, Font loader).

Topbar — New, Save, Export, Undo/Redo, Zoom controls.

LeftSidebar — Tools / Templates / Uploads (Uppy integration).

CanvasStage — wrapper for Konva Stage or Fabric canvas and main interaction area.

Subcomponents: LayerList, CanvasObject (text, image, shape), SelectionTransformer (react-moveable).

RightInspector — properties for selected object: typography, fill/stroke, position, size, rotation, opacity.

Modal — import/export JSON, template chooser, confirm dialogs.

AssetsManager — local assets / user uploads, thumbnails.

ExportService — utilities to produce PNG/PDF/JSON.

Data model (minimal)

type Layer = {   id: string;   type: 'image' | 'text' | 'rect' | 'ellipse';   x: number; y: number;   width: number; height: number;   rotation: number;   scaleX?: number; scaleY?: number;   visible: boolean;   zIndex: number;   props: any; // type-specific props (text content, font, image src, filters) }; type Document = {   id: string;   width: number;   height: number;   background: { color?: string; image?: string };   layers: Layer[];   metadata?: any; }; 

Implementation notes & library mapping (explicit)

Canvas engine: Use react-konva for Stage + Layers + Konva shapes. Konva Stage supports toDataURL() for export. konvajs.org+1

Selection & transform: When a user selects a Konva node, attach react-moveable to the DOM wrapper to show handles for resizing/rotating. react-moveable supports group transforms, snapping and pinch gestures. npm+1

Image upload: Use Uppy with a simple local store; when uploaded, add to assets and create a new image layer. uppy.io

Fonts: Load Google Fonts dynamically based on selected font list. Consider opentype.js only if you need precise glyph metrics (not required for MVP).

Export: Use Konva stage.toDataURL({ pixelRatio: 2 }) for PNG; for PDF, convert the PNG into jsPDF or use html2canvas if using DOM elements for parts of the UI. Stack Overflow

Acceptance criteria (what “done” looks like)

User can open the app and see a minimal UI resembling the attached reference /mnt/data/6493fecb-4593-443b-bdea-4ce49e5de29d.png.

User can drag & drop or upload an image and place it onto the canvas.

User can add text, edit it inline, change font size & color.

User can select an object and move/resize/rotate it with visible handles.

User can reorder layers and toggle visibility.

User can export the canvas as a PNG (file saved locally).

Save & load JSON of the document state via download/upload or localStorage.

Undo/redo works for add/delete/transform actions.

Milestones & estimated tasks (useful if handing to a team)

Day 1-2: Set up project, base UI layout, Tailwind, routing, basic Konva stage, zoom & pan.

Day 3-5: Implement Add Image/Text/Shape; Uppy integration for uploads; basic layer list.

Day 6-8: Selection, transform handles using react-moveable; properties inspector.

Day 9-10: Export (PNG/PDF), save/load JSON, undo/redo.

Day 11-12: Templates, small polish, responsive adjustments, accessibility checks.

Optional (later): Yjs real-time collaboration integration.

Developer tips & gotchas

Konva nodes require manual syncing of DOM transforms when using react-moveable; use a transparent DOM wrapper over the Stage to attach moveable, or use Konva’s built-in Transformer for simple cases. konvajs.org

For rotated resize math, rely on library helpers (moveable or Konva Transformer) — hand-rolled math is error-prone. GitHub+1

Use skipOffscreen or similar when you have many objects to avoid slow re-renders. fabricjs.com
```

## Stack Used
- React 
- Magic Patterns for UI
- Velt for making it collaborative

## Velt features

- Presence
- Live state sync

## Screenshots (Magicpatterns)

### Initial prompt

<img width="1920" height="1080" alt="1763642557708-SCR-20251120-oacf" src="https://github.com/user-attachments/assets/20e48ef6-e609-4ea3-aeb9-3cb62859445f" />

### Initial prompt response

<img width="1920" height="1080" alt="1763642568232-SCR-20251120-ognf" src="https://github.com/user-attachments/assets/926e278c-65b6-4bd0-bd10-1e5f42856d05" />

### Responsive prompt

<img width="3200" height="1800" alt="SCR-20251126-kgkk" src="https://github.com/user-attachments/assets/01dbd23c-6834-403d-b731-f902c947f0e5" />

### Responsive prompt response

<img width="3200" height="1800" alt="SCR-20251126-kids" src="https://github.com/user-attachments/assets/b9ccec61-2c88-4959-ae6b-5fe579ab159c" />


