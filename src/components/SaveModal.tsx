import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';
interface SaveModalProps {
  onClose: () => void;
}
interface SavedDesign {
  id: string;
  name: string;
  document: any;
  savedAt: number;
  layerCount: number;
}
export function SaveModal({
  onClose
}: SaveModalProps) {
  const {
    document
  } = useEditorStore();
  const [designName, setDesignName] = useState('Untitled Design');
  const handleSave = () => {
    const savedDesigns = JSON.parse(localStorage.getItem('canva-saved-designs') || '[]') as SavedDesign[];
    const newDesign: SavedDesign = {
      id: crypto.randomUUID(),
      name: designName,
      document: document,
      savedAt: Date.now(),
      layerCount: document.layers.length
    };
    savedDesigns.push(newDesign);
    localStorage.setItem('canva-saved-designs', JSON.stringify(savedDesigns));
    alert(`Design "${designName}" saved successfully!`);
    onClose();
  };
  return <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold">Save Design</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Design Name
            </label>
            <input type="text" value={designName} onChange={e => setDesignName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="My Awesome Design" autoFocus />
          </div>

          <div className="text-sm text-gray-500">
            <p>Layers: {document.layers.length}</p>
            <p>
              Size: {document.width} × {document.height}px
            </p>
          </div>

          <div className="pt-4 flex gap-3">
            <button onClick={onClose} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button onClick={handleSave} className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
              <Save size={18} />
              Save Design
            </button>
          </div>
        </div>
      </div>
    </div>;
}