import { useCallback, useState, useEffect } from 'react';
import { useLiveState } from '@veltdev/react';
import { Document, Layer } from '../types/editor';

const createDefaultDocument = (): Document => ({
  id: crypto.randomUUID(),
  width: 1080,
  height: 1920,
  background: {
    color: '#ffffff'
  },
  layers: []
});

export const useCollaborativeEditor = () => {
  // Use Velt's Live State Sync for collaborative document data
  const [document, setDocument] = useLiveState<Document>(
    'canvas-collaborative-document',
    createDefaultDocument(),
    {
      syncDuration: 100, // Debounce for 100ms for smooth collaboration
      resetLiveState: false, // Don't reset when initializing
      listenToNewChangesOnly: false, // Listen to all changes including historical
    }
  );

  // Local state (not synced across users)
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [history, setHistory] = useState<Document[]>([createDefaultDocument()]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Save to history helper
  const saveToHistory = useCallback(() => {
    if (!document) return;

    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(document)));

    // Keep only last 10 states
    const trimmedHistory = newHistory.slice(-10);
    setHistory(trimmedHistory);
    setHistoryIndex(trimmedHistory.length - 1);
  }, [document, history, historyIndex]);

  // Add layer
  const addLayer = useCallback((layer: Omit<Layer, 'id' | 'zIndex'>) => {
    if (!document) return;

    const newLayer: Layer = {
      ...layer,
      id: crypto.randomUUID(),
      zIndex: document.layers.length
    };

    const newDoc = {
      ...document,
      layers: [...document.layers, newLayer]
    };

    setDocument(newDoc);
    setSelectedLayerId(newLayer.id);

    // Save to history after state update
    setTimeout(() => saveToHistory(), 0);
  }, [document, setDocument, saveToHistory]);

  // Update layer
  const updateLayer = useCallback((id: string, updates: Partial<Layer>) => {
    if (!document) return;

    setDocument({
      ...document,
      layers: document.layers.map(layer =>
        layer.id === id ? { ...layer, ...updates } : layer
      )
    });
  }, [document, setDocument]);

  // Delete layer
  const deleteLayer = useCallback((id: string) => {
    if (!document) return;

    setDocument({
      ...document,
      layers: document.layers.filter(layer => layer.id !== id)
    });

    if (selectedLayerId === id) {
      setSelectedLayerId(null);
    }

    // Save to history after state update
    setTimeout(() => saveToHistory(), 0);
  }, [document, setDocument, selectedLayerId, saveToHistory]);

  // Reorder layer
  const reorderLayer = useCallback((id: string, newIndex: number) => {
    if (!document) return;

    const layers = [...document.layers];
    const currentIndex = layers.findIndex(l => l.id === id);
    if (currentIndex === -1) return;

    const [layer] = layers.splice(currentIndex, 1);
    layers.splice(newIndex, 0, layer);

    // Update zIndex
    const updatedLayers = layers.map((l, i) => ({
      ...l,
      zIndex: i
    }));

    setDocument({
      ...document,
      layers: updatedLayers
    });

    // Save to history after state update
    setTimeout(() => saveToHistory(), 0);
  }, [document, setDocument, saveToHistory]);

  // Select layer (local only)
  const selectLayer = useCallback((id: string | null) => {
    setSelectedLayerId(id);
  }, []);

  // Set zoom (local only)
  const handleSetZoom = useCallback((newZoom: number) => {
    setZoom(newZoom);
  }, []);

  // Set background
  const setBackground = useCallback((color: string) => {
    if (!document) return;

    setDocument({
      ...document,
      background: { color }
    });

    // Save to history after state update
    setTimeout(() => saveToHistory(), 0);
  }, [document, setDocument, saveToHistory]);

  // Load document
  const loadDocument = useCallback((doc: Document) => {
    setDocument(doc);
    setSelectedLayerId(null);
    setHistory([doc]);
    setHistoryIndex(0);
  }, [setDocument]);

  // Reset document
  const resetDocument = useCallback(() => {
    const newDoc = createDefaultDocument();
    setDocument(newDoc);
    setSelectedLayerId(null);
    setHistory([newDoc]);
    setHistoryIndex(0);
  }, [setDocument]);

  // Undo
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setDocument(JSON.parse(JSON.stringify(history[newIndex])));
      setHistoryIndex(newIndex);
      setSelectedLayerId(null);
    }
  }, [historyIndex, history, setDocument]);

  // Redo
  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setDocument(JSON.parse(JSON.stringify(history[newIndex])));
      setHistoryIndex(newIndex);
      setSelectedLayerId(null);
    }
  }, [historyIndex, history, setDocument]);

  return {
    // State
    document: document || createDefaultDocument(),
    selectedLayerId,
    zoom,
    history,
    historyIndex,

    // Actions
    addLayer,
    updateLayer,
    deleteLayer,
    reorderLayer,
    selectLayer,
    setZoom: handleSetZoom,
    setBackground,
    loadDocument,
    resetDocument,
    undo,
    redo,
  };
};
