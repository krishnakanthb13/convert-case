# FluxText

<p align="center">
  <img src="./assets/release_v0_0_8.png" width="800" alt="FluxText v0.0.8 Release">
</p>

<p align="center">
	<a href="https://www.gnu.org/licenses/gpl-3.0"><img src="https://img.shields.io/badge/License-GPLv3-blue.svg" alt="License: GPL v3"></a>
</p>

**FluxText** is a developer-first, offline-ready modular text transformation engine with 50+ tools and a lightning-fast pipeline.

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
