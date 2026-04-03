import { create } from 'zustand';

interface AppState {
  inputText: string;
  pipeline: string[];
  isPaletteOpen: boolean;
  theme: 'dark' | 'light';
  isQuickActionsExpanded: boolean;
  setInputText: (text: string) => void;
  addTransformToPipeline: (transformName: string) => void;
  removeTransformFromPipeline: (index: number) => void;
  setPaletteOpen: (isOpen: boolean) => void;
  toggleQuickActions: () => void;
  clearPipeline: () => void;
  toggleTheme: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  inputText: '',
  pipeline: [],
  isPaletteOpen: false,
  theme: 'dark',
  isQuickActionsExpanded: true,
  setInputText: (text) => set({ inputText: text }),
  addTransformToPipeline: (transformName) => 
    set((state) => {
      const exists = state.pipeline.includes(transformName);
      if (exists) {
        return { 
          pipeline: state.pipeline.filter(t => t !== transformName), 
          isPaletteOpen: false 
        };
      }
      return { 
        pipeline: [...state.pipeline, transformName], 
        isPaletteOpen: false 
      };
    }),
  removeTransformFromPipeline: (index) =>
    set((state) => ({ pipeline: state.pipeline.filter((_, i) => i !== index) })),
  setPaletteOpen: (isOpen) => set({ isPaletteOpen: isOpen }),
  toggleQuickActions: () => set((state) => ({ isQuickActionsExpanded: !state.isQuickActionsExpanded })),
  clearPipeline: () => set({ pipeline: [] }),
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    return { theme: newTheme };
  }),
}));
