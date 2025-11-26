import React, { useState, createElement } from 'react';
import { Undo2, Redo2, Download, Save, FileJson, ZoomIn, ZoomOut, FolderOpen, Menu } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';
import { ExportModal } from './ExportModal';
import { SaveModal } from './SaveModal';
import { LoadModal } from './LoadModal';
import { saveToJSON, loadFromJSON } from '../utils/export';
export function TopBar() {
  const {
    zoom,
    setZoom,
    undo,
    redo,
    history,
    historyIndex,
    document,
    loadDocument,
    resetDocument
  } = useEditorStore();
  const [showExportModal, setShowExportModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const handleExportJSON = () => {
    saveToJSON(document);
  };
  const handleImportJSON = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async e => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          const doc = await loadFromJSON(file);
          loadDocument(doc);
          alert('Design imported!');
        } catch (error) {
          alert('Failed to import design');
        }
      }
    };
    input.click();
  };
  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;
  return <>
      <div className="h-14 md:h-16 bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-between px-3 md:px-6 text-white shadow-lg">
        <div className="flex items-center gap-2 md:gap-6 flex-1 min-w-0">
          <h1 className="text-base md:text-lg font-bold truncate">
            Collaborative Canvas
          </h1>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-2">
            <button onClick={resetDocument} className="px-3 py-1.5 text-sm hover:bg-white/10 rounded transition-colors whitespace-nowrap">
              New
            </button>
            <button onClick={() => setShowSaveModal(true)} className="px-3 py-1.5 text-sm hover:bg-white/10 rounded transition-colors flex items-center gap-1.5 whitespace-nowrap">
              <Save size={16} />
              Save
            </button>
            <button onClick={() => setShowLoadModal(true)} className="px-3 py-1.5 text-sm hover:bg-white/10 rounded transition-colors flex items-center gap-1.5 whitespace-nowrap">
              <FolderOpen size={16} />
              Load
            </button>
            <button onClick={handleExportJSON} className="px-3 py-1.5 text-sm hover:bg-white/10 rounded transition-colors flex items-center gap-1.5 whitespace-nowrap">
              <FileJson size={16} />
              Export JSON
            </button>
            <button onClick={handleImportJSON} className="px-3 py-1.5 text-sm hover:bg-white/10 rounded transition-colors whitespace-nowrap">
              Import JSON
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="lg:hidden p-2 hover:bg-white/10 rounded transition-colors">
            <Menu size={20} />
          </button>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Undo/Redo */}
          <div className="flex items-center gap-1 md:gap-2">
            <button onClick={undo} disabled={!canUndo} className="p-1.5 md:p-2 hover:bg-white/10 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed" title="Undo (Cmd+Z)">
              <Undo2 size={16} className="md:w-[18px] md:h-[18px]" />
            </button>
            <button onClick={redo} disabled={!canRedo} className="p-1.5 md:p-2 hover:bg-white/10 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed" title="Redo (Cmd+Shift+Z)">
              <Redo2 size={16} className="md:w-[18px] md:h-[18px]" />
            </button>
          </div>

          <div className="hidden md:block w-px h-6 bg-white/20" />

          {/* Zoom Controls */}
          <div className="hidden md:flex items-center gap-2">
            <button onClick={() => setZoom(Math.max(0.1, zoom - 0.1))} className="p-2 hover:bg-white/10 rounded transition-colors" title="Zoom Out">
              <ZoomOut size={18} />
            </button>
            <span className="text-sm font-medium w-12 text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button onClick={() => setZoom(Math.min(3, zoom + 0.1))} className="p-2 hover:bg-white/10 rounded transition-colors" title="Zoom In">
              <ZoomIn size={18} />
            </button>
            <button onClick={() => setZoom(1)} className="px-3 py-1.5 text-sm hover:bg-white/10 rounded transition-colors">
              Fit
            </button>
          </div>

          <div className="hidden md:block w-px h-6 bg-white/20" />

          {/* Export Button */}
          <button onClick={() => setShowExportModal(true)} className="px-3 md:px-4 py-1.5 md:py-2 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 transition-colors font-medium flex items-center gap-2 text-sm">
            <Download size={16} className="md:w-[18px] md:h-[18px]" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {showMobileMenu && <div className="lg:hidden absolute top-14 md:top-16 left-0 right-0 bg-white shadow-lg border-b border-gray-200 z-40">
          <div className="p-4 space-y-2">
            <button onClick={() => {
          resetDocument();
          setShowMobileMenu(false);
        }} className="w-full px-4 py-2 text-left hover:bg-gray-100 rounded transition-colors">
              New Design
            </button>
            <button onClick={() => {
          setShowSaveModal(true);
          setShowMobileMenu(false);
        }} className="w-full px-4 py-2 text-left hover:bg-gray-100 rounded transition-colors flex items-center gap-2">
              <Save size={18} />
              Save Design
            </button>
            <button onClick={() => {
          setShowLoadModal(true);
          setShowMobileMenu(false);
        }} className="w-full px-4 py-2 text-left hover:bg-gray-100 rounded transition-colors flex items-center gap-2">
              <FolderOpen size={18} />
              Load Design
            </button>
            <button onClick={() => {
          handleExportJSON();
          setShowMobileMenu(false);
        }} className="w-full px-4 py-2 text-left hover:bg-gray-100 rounded transition-colors flex items-center gap-2">
              <FileJson size={18} />
              Export JSON
            </button>
            <button onClick={() => {
          handleImportJSON();
          setShowMobileMenu(false);
        }} className="w-full px-4 py-2 text-left hover:bg-gray-100 rounded transition-colors">
              Import JSON
            </button>

            {/* Mobile Zoom Controls */}
            <div className="pt-2 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">Zoom</p>
              <div className="flex items-center gap-2">
                <button onClick={() => setZoom(Math.max(0.1, zoom - 0.1))} className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded transition-colors">
                  <ZoomOut size={18} className="mx-auto" />
                </button>
                <span className="text-sm font-medium w-16 text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <button onClick={() => setZoom(Math.min(3, zoom + 0.1))} className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded transition-colors">
                  <ZoomIn size={18} className="mx-auto" />
                </button>
                <button onClick={() => setZoom(1)} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded transition-colors text-sm">
                  Fit
                </button>
              </div>
            </div>
          </div>
        </div>}

      {showExportModal && <ExportModal onClose={() => setShowExportModal(false)} />}
      {showSaveModal && <SaveModal onClose={() => setShowSaveModal(false)} />}
      {showLoadModal && <LoadModal onClose={() => setShowLoadModal(false)} />}
    </>;
}