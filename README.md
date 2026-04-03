# FluxText

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

**FluxText** is a developer-first, offline-ready text transformation engine. It reimagines the classic "text converter" as a modular pipeline, allowing you to chain operations like case conversion, encoding, and cleaning in a single, fast workflow.

---

## 🚀 Key Features

- **Modular Pipeline**: Chain multiple transformations (e.g., *Trim* → *Lowercase* → *Base64*).
- **Command Palette**: `Ctrl + K` interface for lightning-fast operation.
- **Offline-First**: Runs entirely in your browser; no data ever leaves your machine.
- **Real-Time Preview**: see output update instantly as you type or change the pipeline.
- **Developer-Centric**: Built for speed with a clean, dark-first UI and syntax-highlighted feels.

## 🛠️ Transformations Included

- **Case**: Lowercase, Uppercase, Sentence Case, Title Case, Capitalized Case, Alternating, Inverse.
- **Cleaning**: Trim Whitespace, Remove Formatting.
- **Encoding**: Base64 Encode/Decode, URL Encode/Decode.

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
