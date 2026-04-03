**OPTIMIZED PROMPT**

---

**ROLE:**
You are a senior full-stack architect and product designer specializing in offline-first web applications, PWAs, and developer tooling.

---

## OBJECTIVE

Design a **locally hosted web app + PWA** inspired by ConvertCase-style text tools, but with a **completely unique interface, enhanced UX, and extensible architecture**.

The goal is NOT to clone the UI, but to **reimagine the product as a modern, modular, developer-friendly tool**.

---

## CONTEXT (EXTRACTED FEATURES)

The reference product provides:

### Core Features

* Text case transformations:

  * lowercase
  * UPPERCASE
  * Sentence case
  * Title case
  * Capitalized case
  * Alternating case
  * Inverse case
* Real-time transformation (input → output instantly)
* Copy / Download / Clear actions
* Character, word, line counts
* Clipboard integration
* Works fully client-side (no server processing)

### Extended Tools

* Unicode text styles (bold, italic, fancy fonts)
* Mirror text generator
* Invisible text generator
* Plain text cleaner (remove formatting)
* Character remover
* Duplicate word finder
* Misc format tools (APA, etc.)

### Interaction Model

* Input textarea → multiple output modes
* Tab/button-based switching
* Instant preview
* Lightweight and fast

---

## TASK

### 1. REQUIREMENTS ENGINEERING

Break down into:

* Functional requirements
* Non-functional requirements
* PWA requirements
* Offline-first constraints
* Performance goals
* Extensibility (plugin system)

---

### 2. PRODUCT REIMAGINING (IMPORTANT)

Create a **completely different UX/UI concept**, such as:

* Command palette driven (like VS Code)
* Modular blocks (Notion-style)
* Multi-pane transformation pipeline
* Developer tool style (terminal + preview)
* Drag-and-drop transformations
* Graph-based transformation nodes

Do NOT use:

* Tabs like the original
* Basic button switching UI

---

### 3. FEATURE ARCHITECTURE

Group features into modules:

* Core Transform Engine
* Text Analysis Engine
* Styling Engine (Unicode, etc.)
* Utility Tools
* Plugin System

Design:

* Clear separation of concerns
* Reusable transformation functions
* Stateless vs stateful components

---

### 4. TECH STACK DESIGN

Recommend stack for:

#### Frontend

* Framework (React / Svelte / Vue)
* State management
* Styling system

#### Backend (optional, but local-first)

* Should work WITHOUT backend
* Optional local API layer

#### PWA

* Service worker strategy
* Caching strategy
* Offline behavior

#### Desktop Option (bonus)

* Electron / Tauri compatibility

---

### 5. SYSTEM DESIGN

Provide:

* Folder structure
* Core modules
* Data flow (input → processing → output)
* Plugin architecture design

---

### 6. UI/UX DESIGN SPEC

Define:

* Layout structure
* Key components
* Interaction model
* Keyboard-first workflow
* Power-user features

Include:

* Dark-first design
* Minimal friction
* Fast interactions

---

### 7. UNIQUE DIFFERENTIATORS (MANDATORY)

Propose at least 5 innovations such as:

* Multi-transform pipeline (chain transformations)
* Save presets / workflows
* Live diff view (before vs after)
* AI-assisted transformations (optional)
* Batch file processing
* Context menu integration (right-click like OS tools)

---

### 8. CLI + WEB UNIFICATION

Design a shared core so that:

* Same logic powers:

  * CLI tool
  * Web app
  * PWA
* Example:

  * `text-tool convert --type upper file.txt`

---

### 9. OUTPUT FORMAT

Structure your response as:

1. Product Overview
2. Requirements Breakdown
3. UX Reimagination Concept
4. Feature Architecture
5. Tech Stack
6. System Design
7. UI/UX Spec
8. Unique Innovations
9. CLI Integration Plan

---

### CONSTRAINTS

* Must run fully offline
* Must be fast (instant transformation)
* Must not rely on external APIs
* Must be modular and extensible
* Must support large text inputs efficiently

---

### ASSUMPTIONS (IF NEEDED)

Clearly state any assumptions you make.

---

### QUALITY BAR

* Think like a product + system designer
* Avoid generic ideas
* Be concrete and implementation-ready
* Focus on scalability and developer experience

---

**END OF PROMPT**
