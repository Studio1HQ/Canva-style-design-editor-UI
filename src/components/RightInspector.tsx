import React, { useState } from 'react';
import { useEditorStore } from '../store/editorStore';
import { SketchPicker } from 'react-color';
import { Trash2, Eye, EyeOff, ChevronRight } from 'lucide-react';
export function RightInspector() {
  const {
    document,
    selectedLayerId,
    updateLayer,
    deleteLayer
  } = useEditorStore();
  const selectedLayer = document.layers.find(l => l.id === selectedLayerId);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showFillPicker, setShowFillPicker] = useState(false);
  const [showStrokePicker, setShowStrokePicker] = useState(false);
  if (!selectedLayer) {
    return null;
  }
  const handleUpdate = (updates: any) => {
    updateLayer(selectedLayerId!, updates);
  };
  const handlePropsUpdate = (propsUpdates: any) => {
    updateLayer(selectedLayerId!, {
      props: {
        ...selectedLayer.props,
        ...propsUpdates
      }
    });
  };
  return <>
      {/* Mobile/Tablet: Bottom Sheet */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 max-h-[50vh] overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Properties</h3>
            <div className="flex gap-2">
              <button onClick={() => handleUpdate({
              visible: !selectedLayer.visible
            })} className="p-2 hover:bg-gray-100 rounded transition-colors" title={selectedLayer.visible ? 'Hide' : 'Show'}>
                {selectedLayer.visible ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
              <button onClick={() => deleteLayer(selectedLayerId!)} className="p-2 hover:bg-red-50 text-red-600 rounded transition-colors" title="Delete">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
          <PropertiesContent selectedLayer={selectedLayer} handleUpdate={handleUpdate} handlePropsUpdate={handlePropsUpdate} showFillPicker={showFillPicker} setShowFillPicker={setShowFillPicker} showStrokePicker={showStrokePicker} setShowStrokePicker={setShowStrokePicker} />
        </div>
      </div>

      {/* Desktop: Right Panel */}
      <div className={`hidden lg:block bg-white border-l border-gray-200 overflow-y-auto transition-all ${isCollapsed ? 'w-12' : 'w-80'}`}>
        {isCollapsed ? <button onClick={() => setIsCollapsed(false)} className="w-full p-3 hover:bg-gray-100 transition-colors">
            <ChevronRight size={20} className="mx-auto rotate-180" />
          </button> : <>
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Properties</h3>
                <div className="flex gap-2">
                  <button onClick={() => handleUpdate({
                visible: !selectedLayer.visible
              })} className="p-2 hover:bg-gray-100 rounded transition-colors" title={selectedLayer.visible ? 'Hide' : 'Show'}>
                    {selectedLayer.visible ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                  <button onClick={() => deleteLayer(selectedLayerId!)} className="p-2 hover:bg-red-50 text-red-600 rounded transition-colors" title="Delete">
                    <Trash2 size={18} />
                  </button>
                  <button onClick={() => setIsCollapsed(true)} className="p-2 hover:bg-gray-100 rounded transition-colors">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-500 capitalize">
                {selectedLayer.type} Layer
              </p>
            </div>

            <div className="p-6">
              <PropertiesContent selectedLayer={selectedLayer} handleUpdate={handleUpdate} handlePropsUpdate={handlePropsUpdate} showFillPicker={showFillPicker} setShowFillPicker={setShowFillPicker} showStrokePicker={showStrokePicker} setShowStrokePicker={setShowStrokePicker} />
            </div>
          </>}
      </div>
    </>;
}
function PropertiesContent({
  selectedLayer,
  handleUpdate,
  handlePropsUpdate,
  showFillPicker,
  setShowFillPicker,
  showStrokePicker,
  setShowStrokePicker
}: any) {
  return <div className="space-y-6">
      {/* Position & Size */}
      <div>
        <h4 className="font-medium mb-3 text-sm">Position & Size</h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-600 block mb-1">X</label>
            <input type="number" value={Math.round(selectedLayer.x)} onChange={e => handleUpdate({
            x: Number(e.target.value)
          })} className="w-full px-3 py-2 border border-gray-300 rounded text-sm" />
          </div>
          <div>
            <label className="text-xs text-gray-600 block mb-1">Y</label>
            <input type="number" value={Math.round(selectedLayer.y)} onChange={e => handleUpdate({
            y: Number(e.target.value)
          })} className="w-full px-3 py-2 border border-gray-300 rounded text-sm" />
          </div>
          <div>
            <label className="text-xs text-gray-600 block mb-1">Width</label>
            <input type="number" value={Math.round(selectedLayer.width)} onChange={e => handleUpdate({
            width: Number(e.target.value)
          })} className="w-full px-3 py-2 border border-gray-300 rounded text-sm" />
          </div>
          <div>
            <label className="text-xs text-gray-600 block mb-1">Height</label>
            <input type="number" value={Math.round(selectedLayer.height)} onChange={e => handleUpdate({
            height: Number(e.target.value)
          })} className="w-full px-3 py-2 border border-gray-300 rounded text-sm" />
          </div>
        </div>
      </div>

      {/* Rotation */}
      <div>
        <label className="text-xs text-gray-600 block mb-1">Rotation</label>
        <input type="number" value={Math.round(selectedLayer.rotation)} onChange={e => handleUpdate({
        rotation: Number(e.target.value)
      })} className="w-full px-3 py-2 border border-gray-300 rounded text-sm" />
      </div>

      {/* Text Properties */}
      {selectedLayer.type === 'text' && <>
          <div>
            <label className="text-xs text-gray-600 block mb-1">Text</label>
            <textarea value={selectedLayer.props.text} onChange={e => handlePropsUpdate({
          text: e.target.value
        })} className="w-full px-3 py-2 border border-gray-300 rounded text-sm" rows={3} />
          </div>
          <div>
            <label className="text-xs text-gray-600 block mb-1">
              Font Size
            </label>
            <input type="number" value={selectedLayer.props.fontSize} onChange={e => handlePropsUpdate({
          fontSize: Number(e.target.value)
        })} className="w-full px-3 py-2 border border-gray-300 rounded text-sm" />
          </div>
          <div>
            <label className="text-xs text-gray-600 block mb-1">
              Font Family
            </label>
            <select value={selectedLayer.props.fontFamily} onChange={e => handlePropsUpdate({
          fontFamily: e.target.value
        })} className="w-full px-3 py-2 border border-gray-300 rounded text-sm">
              <option value="Inter">Inter</option>
              <option value="Playfair Display">Playfair Display</option>
              <option value="Roboto">Roboto</option>
              <option value="Arial">Arial</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-600 block mb-1">
              Font Weight
            </label>
            <select value={selectedLayer.props.fontWeight} onChange={e => handlePropsUpdate({
          fontWeight: e.target.value
        })} className="w-full px-3 py-2 border border-gray-300 rounded text-sm">
              <option value="400">Regular</option>
              <option value="600">Semi Bold</option>
              <option value="700">Bold</option>
              <option value="800">Extra Bold</option>
              <option value="900">Black</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-600 block mb-1">
              Text Align
            </label>
            <select value={selectedLayer.props.textAlign} onChange={e => handlePropsUpdate({
          textAlign: e.target.value
        })} className="w-full px-3 py-2 border border-gray-300 rounded text-sm">
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </div>
        </>}

      {/* Fill Color */}
      {(selectedLayer.type === 'text' || selectedLayer.type === 'rect' || selectedLayer.type === 'ellipse') && <div>
          <label className="text-xs text-gray-600 block mb-1">Fill Color</label>
          <div className="relative">
            <button onClick={() => setShowFillPicker(!showFillPicker)} className="w-full h-10 border border-gray-300 rounded" style={{
          backgroundColor: selectedLayer.props.fill
        }} />
            {showFillPicker && <div className="absolute z-10 mt-2">
                <div className="fixed inset-0" onClick={() => setShowFillPicker(false)} />
                <SketchPicker color={selectedLayer.props.fill} onChange={color => handlePropsUpdate({
            fill: color.hex
          })} />
              </div>}
          </div>
        </div>}

      {/* Stroke */}
      {(selectedLayer.type === 'rect' || selectedLayer.type === 'ellipse' || selectedLayer.type === 'line') && <>
          <div>
            <label className="text-xs text-gray-600 block mb-1">
              Stroke Color
            </label>
            <div className="relative">
              <button onClick={() => setShowStrokePicker(!showStrokePicker)} className="w-full h-10 border border-gray-300 rounded" style={{
            backgroundColor: selectedLayer.props.stroke
          }} />
              {showStrokePicker && <div className="absolute z-10 mt-2">
                  <div className="fixed inset-0" onClick={() => setShowStrokePicker(false)} />
                  <SketchPicker color={selectedLayer.props.stroke} onChange={color => handlePropsUpdate({
              stroke: color.hex
            })} />
                </div>}
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-600 block mb-1">
              Stroke Width
            </label>
            <input type="number" value={selectedLayer.props.strokeWidth} onChange={e => handlePropsUpdate({
          strokeWidth: Number(e.target.value)
        })} className="w-full px-3 py-2 border border-gray-300 rounded text-sm" />
          </div>
        </>}

      {/* Opacity */}
      <div>
        <label className="text-xs text-gray-600 block mb-1">Opacity</label>
        <input type="range" min="0" max="1" step="0.01" value={selectedLayer.props.opacity || 1} onChange={e => handlePropsUpdate({
        opacity: Number(e.target.value)
      })} className="w-full" />
        <span className="text-xs text-gray-500">
          {Math.round((selectedLayer.props.opacity || 1) * 100)}%
        </span>
      </div>
    </div>;
}