import React, { createContext, useContext, ReactNode } from 'react';
import { useCollaborativeEditor } from '../hooks/useCollaborativeEditor';
import { Document, Layer } from '../types/editor';

interface EditorContextType {
  document: Document;
  selectedLayerId: string | null;
  zoom: number;
  history: Document[];
  historyIndex: number;
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
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const editorState = useCollaborativeEditor();

  return (
    <EditorContext.Provider value={editorState}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within EditorProvider');
  }
  return context;
};
