# Contributing to FluxText

First off, thank you for considering contributing to FluxText! It's people like you that make FluxText such a great tool for the developer community.

## How to Contribute

### Reporting Bugs
- Check the [Issues](https://github.com/krishnakanthb13/convert-case/issues) to see if the bug has already been reported.
- If not, create a new issue. Please include:
    - A clear, descriptive title.
    - Steps to reproduce the bug.
    - Expected vs. actual behavior.
    - Environment details (Browser, OS).

### Suggesting Features
- Open a new issue with the "feature request" tag.
- Explain why the feature would be useful and how it should work.

### Pull Requests
1. **Fork** the repository.
2. **Create a branch** for your fix or feature: `git checkout -b feature/my-new-feature` or `git checkout -b fix/bug-description`.
3. **Make your changes**.
4. **Test your changes** locally (see [Setup](#local-development-setup)).
5. **Commit your changes**: Use clear, concise commit messages (e.g., `feat: add base64 transformation`).
6. **Push to your fork** and **submit a pull request** to the `main` branch.

## Local Development Setup

1. **Clone your fork**:
   ```bash
   git clone https://github.com/krishnakanthb13/convert-case.git
   cd convert-case/frontend
   ```
2. **Install dependencies**:
   ```bash
   npm install
   # or
   pnpm install
   ```
3. **Start the dev server**:
   ```bash
   npm run dev
   ```
4. **Build for production**:
   ```bash
   npm run build
   ```

## Pre-submission Checklist
- [ ] Code follows existing style patterns.
- [ ] No linting errors (`npm run lint`).
- [ ] Features are tested manually for edge cases.
- [ ] Documentation is updated if necessary.

## License
By contributing to FluxText, you agree that your contributions will be licensed under its [GNU General Public License v3](LICENSE).
