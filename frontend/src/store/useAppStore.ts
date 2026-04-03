import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SavedPipeline {
  id: string;
  name: string;
  transforms: string[];
}

const DEFAULT_PIPELINES: SavedPipeline[] = [
  { id: 'p1', name: 'Clean & CamelCase', transforms: ['trimWhitespace', 'lowercase', 'camelCase'] },
  { id: 'p2', name: 'Slugify Text', transforms: ['trimWhitespace', 'slugify'] },
  { id: 'p3', name: 'Screaming Snake', transforms: ['trimWhitespace', 'constantCase'] },
  { id: 'p4', name: 'Title Case Label', transforms: ['trimWhitespace', 'lowercase', 'titleCase'] },
  { id: 'p5', name: 'URL Safe Encode', transforms: ['trimWhitespace', 'urlEncode'] },
];

interface AppState {
  inputText: string;
  pipeline: string[];
  isPaletteOpen: boolean;
  isSavedPipelinesOpen: boolean;
  theme: 'dark' | 'light';
  isQuickActionsExpanded: boolean;
  savedPipelines: SavedPipeline[];
  
  setInputText: (text: string) => void;
  addTransformToPipeline: (transformName: string) => void;
  removeTransformFromPipeline: (index: number) => void;
  setPaletteOpen: (isOpen: boolean) => void;
  setSavedPipelinesOpen: (isOpen: boolean) => void;
  toggleQuickActions: () => void;
  clearPipeline: () => void;
  setPipeline: (transforms: string[]) => void;
  toggleTheme: () => void;
  
  // Pipeline Management
  saveCurrentPipeline: (name: string) => void;
  deleteSavedPipeline: (id: string) => void;
  importPipelines: (json: string) => void;
  reorderSavedPipelines: (startIndex: number, endIndex: number) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      inputText: '',
      pipeline: [],
      isPaletteOpen: false,
      isSavedPipelinesOpen: false,
      theme: 'dark',
      isQuickActionsExpanded: true,
      savedPipelines: DEFAULT_PIPELINES,

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
      setSavedPipelinesOpen: (isOpen) => set({ isSavedPipelinesOpen: isOpen }),
      toggleQuickActions: () => set((state) => ({ isQuickActionsExpanded: !state.isQuickActionsExpanded })),
      clearPipeline: () => set({ pipeline: [] }),
      setPipeline: (transforms) => set({ pipeline: transforms }),
      toggleTheme: () => set((state) => {
        const newTheme = state.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        return { theme: newTheme };
      }),

      saveCurrentPipeline: (name) => {
        const { pipeline, savedPipelines } = get();
        if (pipeline.length === 0) return;
        const newPipeline: SavedPipeline = {
          id: Date.now().toString(),
          name,
          transforms: [...pipeline]
        };
        set({ savedPipelines: [newPipeline, ...savedPipelines] });
      },
      deleteSavedPipeline: (id) => {
        set((state) => ({
          savedPipelines: state.savedPipelines.filter(p => p.id !== id)
        }));
      },
      importPipelines: (json) => {
        try {
          const imported = JSON.parse(json);
          if (Array.isArray(imported)) {
            set((state) => ({
              savedPipelines: [...imported, ...state.savedPipelines].filter((v, i, a) => a.findIndex(t => t.id === v.id) === i)
            }));
          }
        } catch (e) {
          console.error("Failed to import pipelines", e);
        }
      },
      reorderSavedPipelines: (startIndex, endIndex) => {
        set((state) => {
          const result = Array.from(state.savedPipelines);
          const [removed] = result.splice(startIndex, 1);
          result.splice(endIndex, 0, removed);
          return { savedPipelines: result };
        });
      }
    }),
    {
      name: 'fluxtext-storage',
      partialize: (state) => ({ 
        theme: state.theme, 
        savedPipelines: state.savedPipelines,
        isQuickActionsExpanded: state.isQuickActionsExpanded 
      }),
    }
  )
);

