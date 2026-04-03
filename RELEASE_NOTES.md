# FluxText Release Notes

## [v0.0.8] - 2026-04-03

### 🚀 Initial Public Release

**FluxText** is a developer-first, modular text transformation engine built for speed, privacy, and extensibility.

### 🚀 New Features

- **Modular Transformation Pipeline**: Chain multiple text operations (e.g., *Trim* → *Lowercase* → *Base64*) in a single, fast workflow.
- **50+ Transformation Tools**:
  - **Cases**: Sentence Case, Lowercase, Uppercase, Title Case, Capitalized Case, Alternating, Inverse.
  - **Coding Styles**: camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, dot.case, path/case.
  - **Unicode Font Styles**: Bold, Italic, Bubble, Square, Cursive, Monospace, Wide Text, Upside Down, Zalgo.
  - **Utilities**: Morse Code, NATO Phonetic, ROT13, Binary, Slugify, Pig Latin, Strip Line Breaks, URL/Base64 encoding.
- **Quick Access Tools**: A categorized, collapsible grid (Cases, Coding, Styles, Utils) for one-click transformations.
- **Optimized Command Palette (Ctrl+K)**: Blazing-fast keyboard interface for searching and adding tools, powered by `useDeferredValue` for zero-lag filtering.
- **Collapsible Layout**: Reduce header height and collapse the tools panel to maximize focus on your text input and output.
- **Themed UI Experience**: Premium dark-first design with glassmorphism, custom themed scrollbars, and a responsive layout.

### ⚡ Improvements

- **Offline-First Architecture**: Runs entirely locally in the browser; no data ever leaves your machine.
- **Persistence**: Remembers your pipeline and UI toggle states across sessions.
- **Cross-Platform Launchers**: Included `LaunchFluxText.bat` and `LaunchFluxText.sh` for one-click setup and execution on Windows, macOS, and Linux.

### 📚 Documentation

- Comprehensive **README.md** with installation and usage guides.
- Technical **CODE_DOCUMENTATION.md** for contributors.
- **DESIGN_PHILOSOPHY.md** outlining the "Pipeline-First" ideology.

---
