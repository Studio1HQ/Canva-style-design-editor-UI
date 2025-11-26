import React, { useEffect, useState } from 'react';
import { X, Trash2, Clock, Layers } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';
interface LoadModalProps {
  onClose: () => void;
}
interface SavedDesign {
  id: string;
  name: string;
  document: any;
  savedAt: number;
  layerCount: number;
}
export function LoadModal({
  onClose
}: LoadModalProps) {
  const {
    loadDocument
  } = useEditorStore();
  const [savedDesigns, setSavedDesigns] = useState<SavedDesign[]>([]);
  useEffect(() => {
    const designs = JSON.parse(localStorage.getItem('canva-saved-designs') || '[]') as SavedDesign[];
    setSavedDesigns(designs.sort((a, b) => b.savedAt - a.savedAt));
  }, []);
  const handleLoad = (design: SavedDesign) => {
    loadDocument(design.document);
    alert(`Design "${design.name}" loaded!`);
    onClose();
  };
  const handleDelete = (designId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this design?')) return;
    const updatedDesigns = savedDesigns.filter(d => d.id !== designId);
    localStorage.setItem('canva-saved-designs', JSON.stringify(updatedDesigns));
    setSavedDesigns(updatedDesigns);
  };
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };
  return <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold">Load Design</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {savedDesigns.length === 0 ? <div className="text-center py-12">
              <p className="text-gray-400 mb-2">No saved designs yet</p>
              <p className="text-sm text-gray-500">
                Create and save your first design to see it here
              </p>
            </div> : <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedDesigns.map(design => <button key={design.id} onClick={() => handleLoad(design)} className="group relative p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-500 transition-all text-left">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-lg truncate flex-1 pr-2">
                      {design.name}
                    </h3>
                    <button onClick={e => handleDelete(design.id, e)} className="p-1.5 hover:bg-red-50 text-red-600 rounded transition-colors opacity-0 group-hover:opacity-100" title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Layers size={14} />
                      <span>{design.layerCount} layers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} />
                      <span>{formatDate(design.savedAt)}</span>
                    </div>
                    <div className="text-xs text-gray-400">
                      {design.document.width} × {design.document.height}px
                    </div>
                  </div>

                  <div className="mt-3 text-sm text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to load →
                  </div>
                </button>)}
            </div>}
        </div>
      </div>
    </div>;
}