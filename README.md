# FluxText

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

**FluxText** is a developer-first, offline-ready text transformation engine. It reimagines the classic "text converter" as a modular pipeline, allowing you to chain operations like case conversion, encoding, and cleaning in a single, fast workflow.

---

## 🚀 Key Features

- **Modular Pipeline**: Chain multiple transformations (e.g., *Trim* → *Lowercase* → *Base64*).
- **Quick Access Tools**: Categorized, collapsible panel for one-click transformations.
- **Command Palette**: `Ctrl + K` interface for lightning-fast operation, optimized for 50+ tools.
- **Offline-First**: Runs entirely in your browser; no data ever leaves your machine.
- **Real-Time Preview**: see output update instantly as you type or change the pipeline.
- **Themed UI**: Beautiful, dark-first design with custom scrollbars and glassmorphism.

## 🛠️ Transformations Included

- **Cases**: Lowercase, Uppercase, Sentence, Title, Capitalized, Alternating, Inverse.
- **Coding**: camelCase, pascalCase, snakeCase, kebabCase, constantCase, dotCase, pathCase.
- **Styles**: Bold, Italic, Bubble, Square, Cursive, Monospace, Wide Text, Upside Down, Zalgo.
- **Utils**: Morse Code, NATO Phonetic, ROT13, Binary, Slugify, Pig Latin, Strip Line Breaks, ASCII-to-Base64.
- **Cleaning**: Trim Whitespace, Remove Formatting, Sort Lines.

---

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/) (recommended) or npm

### Installation

1.  **Clone the Repo**:
    ```bash
    git clone https://github.com/krishnakanthb13/convert-case.git
    cd convert-case
    ```
2.  **Run with One Click**:
    - **Windows**: Run `LaunchFluxText.bat`
    - **Unix/macOS**: Run `sh LaunchFluxText.sh`

*(The scripts will handle dependency installation and start the development server for you.)*

---

## 📖 Documentation

- **[Design Philosophy](DESIGN_PHILOSOPHY.md)**: Why we built FluxText and the principles behind it.
- **[Code Documentation](CODE_DOCUMENTATION.md)**: Deep dive into the architecture, state management, and engine.
- **[Contributing Guide](CONTRIBUTING.md)**: How to add new transforms or report bugs.

---

## 🛡️ License

FluxText is open-source software licensed under the **GNU General Public License v3**. See the [LICENSE](LICENSE) file for details.

---

## ✨ Developed By

Created with ❤️ by **[Krishna Kanth B](https://github.com/krishnakanthb13)**.
