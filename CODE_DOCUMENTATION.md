# FluxText Code Documentation

Welcome to the technical documentation for FluxText—a developer-first, offline-first text transformation engine.

## 1. Project Overview
FluxText is built on **React 19**, **TypeScript**, and **Vite**. It uses a state-driven pipeline to allow users to chain multiple text transformations together in real-time.

---

## 2. File & Folder Structure

```text
|-- frontend/
|   |-- public/              # Static assets (favicons, manifest)
|   |-- src/
|       |-- components/      # UI components (CommandPalette, PipelineEditor, SavedPipelines, etc.)
|       |-- core/            # Business logic / transformation engine
|       |-- store/           # Zustand persistent storage (pipelines, theme, quick-actions)
|       |-- assets/          # Project images and global icons
|       |-- App.tsx          # Main application entry and layout
|       |-- main.tsx         # React DOM mount point
|       |-- index.css        # Global styles and design system variables
|-- LaunchFluxText.bat       # Windows launcher
|-- LaunchFluxText.sh        # Unix/macOS launcher
|-- CONTRIBUTING.md          # Contribution guidelines
|-- LICENSE                  # GPL v3 License
```

---

## 3. High-Level Architecture
FluxText follows a **Unidirectional Data Flow** pattern:

1.  **State (Zustand)**: Stores `inputText`, `pipeline`, `savedPipelines`, and `theme`. Persistent across sessions via `zustand/middleware`.
2.  **Engine (Core)**: Pure functional text transformation engine.
3.  **UI (React)**: Interactive components with native drag-and-drop and File System Access API integration.
4.  **Persistence**: `localStorage` backup for zero-data usage.

---

## 4. Core Modules

| Module | Location | Description |
| :--- | :--- | :--- |
| **Transform Engine** | `src/core/engine.ts` | Mapping logic for all transformations. |
| **Helper Maps** | `src/core/helpers.ts` | Lookup tables for Morse, NATO, and complex Unicode font styles. |
| **App Store** | `src/store/useAppStore.ts` | Persistent Zustand store manage pipelines, theme, and saved custom chains. |
| **Pipeline Editor** | `src/components/PipelineEditor.tsx` | UI for active transformation chain and clear-all operations. |
| **Quick Actions** | `src/components/QuickActions.tsx` | Collapsable grid of one-click transformation shortcuts. |
| **Saved Pipelines** | `src/components/SavedPipelines.tsx` | Modal overlay for storing, reordering, and exporting/importing custom chains. |
| **Command Palette** | `src/components/CommandPalette.tsx` | Optimized keyboard search interface. |

---

## 5. Data Flow (Execution)

```mermaid
graph LR
    A[User Input] --> B(Zustand Store)
    B --> C{Run Pipeline}
    C --> D[Transform 1]
    D --> E[Transform 2]
    E --> F[Transform N]
    F --> G(Output Result)
    G --> H[UI Update]
```

---

## 6. Dependencies

### Runtime Dependencies
- **React 19**: Frontend framework.
- **Zustand**: Fast, scalable state management.
- **Lucide-React**: Modern icon set.
- **Framer Motion**: Smooth animations for the UI.

### Dev Dependencies
- **TypeScript**: Static typing for reliability.
- **Vite**: Ultra-fast build tool and dev server.
- **ESLint**: Standardized code quality checking.
