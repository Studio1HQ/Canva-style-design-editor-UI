import React, { useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { LeftSidebar } from './components/LeftSidebar';
import { CanvasStage } from './components/CanvasStage';
import { RightInspector } from './components/RightInspector';
import { LayerList } from './components/LayerList';
import { useEditorStore } from './store/editorStore';
export function App() {
  const {
    undo,
    redo
  } = useEditorStore();
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Undo: Cmd+Z or Ctrl+Z
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      // Redo: Cmd+Shift+Z or Ctrl+Shift+Z
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && e.shiftKey) {
        e.preventDefault();
        redo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);
  return <div className="w-full h-screen flex flex-col bg-gray-50">
      <TopBar />
      <div className="flex-1 flex overflow-hidden relative">
        <LeftSidebar />
        <CanvasStage />
        <RightInspector />
        <LayerList />
      </div>
    </div>;
}