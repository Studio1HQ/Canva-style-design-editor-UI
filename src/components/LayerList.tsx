import React from 'react';
import { useEditorStore } from '../store/editorStore';
import { Eye, EyeOff, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
export function LayerList() {
  const {
    document,
    selectedLayerId,
    selectLayer,
    updateLayer,
    deleteLayer,
    reorderLayer
  } = useEditorStore();
  const getLayerIcon = (type: string) => {
    switch (type) {
      case 'text':
        return '📝';
      case 'image':
        return '🖼️';
      case 'rect':
        return '▭';
      case 'ellipse':
        return '⭕';
      case 'line':
        return '—';
      default:
        return '📄';
    }
  };
  const getLayerName = (layer: any) => {
    if (layer.type === 'text') return layer.props.text?.substring(0, 20) || 'Text';
    return `${layer.type.charAt(0).toUpperCase() + layer.type.slice(1)} ${layer.zIndex + 1}`;
  };
  const sortedLayers = [...document.layers].sort((a, b) => b.zIndex - a.zIndex);
  return <div className="hidden md:block absolute bottom-4 left-20 lg:left-24 bg-white rounded-lg shadow-lg border border-gray-200 w-72 lg:w-80 max-h-80 lg:max-h-96 overflow-hidden">
      <div className="p-3 border-b border-gray-200 bg-gray-50">
        <h3 className="font-semibold text-sm">
          Layers ({document.layers.length})
        </h3>
      </div>
      <div className="overflow-y-auto max-h-72 lg:max-h-80">
        {sortedLayers.map((layer, index) => <div key={layer.id} onClick={() => selectLayer(layer.id)} className={`flex items-center gap-2 lg:gap-3 px-3 py-2 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${selectedLayerId === layer.id ? 'bg-indigo-50' : ''}`}>
            <span className="text-base lg:text-lg">
              {getLayerIcon(layer.type)}
            </span>
            <span className="flex-1 text-sm truncate">
              {getLayerName(layer)}
            </span>

            <div className="flex items-center gap-1">
              <button onClick={e => {
            e.stopPropagation();
            if (index > 0) reorderLayer(layer.id, sortedLayers[index - 1].zIndex);
          }} disabled={index === 0} className="p-1 hover:bg-gray-200 rounded disabled:opacity-30" title="Move Up">
                <ChevronUp size={14} />
              </button>
              <button onClick={e => {
            e.stopPropagation();
            if (index < sortedLayers.length - 1) reorderLayer(layer.id, sortedLayers[index + 1].zIndex);
          }} disabled={index === sortedLayers.length - 1} className="p-1 hover:bg-gray-200 rounded disabled:opacity-30" title="Move Down">
                <ChevronDown size={14} />
              </button>
              <button onClick={e => {
            e.stopPropagation();
            updateLayer(layer.id, {
              visible: !layer.visible
            });
          }} className="p-1 hover:bg-gray-200 rounded" title={layer.visible ? 'Hide' : 'Show'}>
                {layer.visible ? <Eye size={14} /> : <EyeOff size={14} />}
              </button>
              <button onClick={e => {
            e.stopPropagation();
            deleteLayer(layer.id);
          }} className="p-1 hover:bg-red-50 text-red-600 rounded" title="Delete">
                <Trash2 size={14} />
              </button>
            </div>
          </div>)}
        {document.layers.length === 0 && <div className="p-8 text-center text-gray-400 text-sm">
            No layers yet. Add text, images, or shapes to get started.
          </div>}
      </div>
    </div>;
}