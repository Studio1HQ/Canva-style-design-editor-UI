import { create } from 'zustand';
import { Document, Layer, EditorState } from '../types/editor';
const createDefaultDocument = (): Document => ({
  id: crypto.randomUUID(),
  width: 1080,
  height: 1920,
  background: {
    color: '#ffffff'
  },
  layers: []
});
interface EditorStore extends EditorState {
  // Actions
  addLayer: (layer: Omit<Layer, 'id' | 'zIndex'>) => void;
  updateLayer: (id: string, updates: Partial<Layer>) => void;
  deleteLayer: (id: string) => void;
  reorderLayer: (id: string, newIndex: number) => void;
  selectLayer: (id: string | null) => void;
  setZoom: (zoom: number) => void;
  setBackground: (color: string) => void;
  loadDocument: (doc: Document) => void;
  resetDocument: () => void;
  undo: () => void;
  redo: () => void;
  saveToHistory: () => void;
}
export const useEditorStore = create<EditorStore>((set, get) => ({
  document: createDefaultDocument(),
  selectedLayerId: null,
  zoom: 1,
  history: [createDefaultDocument()],
  historyIndex: 0,
  addLayer: layer => {
    const state = get();
    const newLayer: Layer = {
      ...layer,
      id: crypto.randomUUID(),
      zIndex: state.document.layers.length
    };
    set({
      document: {
        ...state.document,
        layers: [...state.document.layers, newLayer]
      },
      selectedLayerId: newLayer.id
    });
    get().saveToHistory();
  },
  updateLayer: (id, updates) => {
    const state = get();
    set({
      document: {
        ...state.document,
        layers: state.document.layers.map(layer => layer.id === id ? {
          ...layer,
          ...updates
        } : layer)
      }
    });
  },
  deleteLayer: id => {
    const state = get();
    set({
      document: {
        ...state.document,
        layers: state.document.layers.filter(layer => layer.id !== id)
      },
      selectedLayerId: state.selectedLayerId === id ? null : state.selectedLayerId
    });
    get().saveToHistory();
  },
  reorderLayer: (id, newIndex) => {
    const state = get();
    const layers = [...state.document.layers];
    const currentIndex = layers.findIndex(l => l.id === id);
    if (currentIndex === -1) return;
    const [layer] = layers.splice(currentIndex, 1);
    layers.splice(newIndex, 0, layer);

    // Update zIndex
    const updatedLayers = layers.map((l, i) => ({
      ...l,
      zIndex: i
    }));
    set({
      document: {
        ...state.document,
        layers: updatedLayers
      }
    });
    get().saveToHistory();
  },
  selectLayer: id => set({
    selectedLayerId: id
  }),
  setZoom: zoom => set({
    zoom
  }),
  setBackground: color => {
    const state = get();
    set({
      document: {
        ...state.document,
        background: {
          color
        }
      }
    });
    get().saveToHistory();
  },
  loadDocument: doc => {
    set({
      document: doc,
      selectedLayerId: null,
      history: [doc],
      historyIndex: 0
    });
  },
  resetDocument: () => {
    const newDoc = createDefaultDocument();
    set({
      document: newDoc,
      selectedLayerId: null,
      history: [newDoc],
      historyIndex: 0
    });
  },
  saveToHistory: () => {
    const state = get();
    const newHistory = state.history.slice(0, state.historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(state.document)));

    // Keep only last 10 states
    const trimmedHistory = newHistory.slice(-10);
    set({
      history: trimmedHistory,
      historyIndex: trimmedHistory.length - 1
    });
  },
  undo: () => {
    const state = get();
    if (state.historyIndex > 0) {
      const newIndex = state.historyIndex - 1;
      set({
        document: JSON.parse(JSON.stringify(state.history[newIndex])),
        historyIndex: newIndex,
        selectedLayerId: null
      });
    }
  },
  redo: () => {
    const state = get();
    if (state.historyIndex < state.history.length - 1) {
      const newIndex = state.historyIndex + 1;
      set({
        document: JSON.parse(JSON.stringify(state.history[newIndex])),
        historyIndex: newIndex,
        selectedLayerId: null
      });
    }
  }
}));