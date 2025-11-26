import React from 'react';
import { useEditorStore } from '../store/editorStore';
import { templates } from '../utils/templates';
import { X } from 'lucide-react';
interface TemplateModalProps {
  onClose: () => void;
}
export function TemplateModal({
  onClose
}: TemplateModalProps) {
  const {
    loadDocument
  } = useEditorStore();
  const handleSelectTemplate = (template: any) => {
    loadDocument(JSON.parse(JSON.stringify(template)));
    onClose();
  };
  return <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[900px] max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Choose a Template</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(80vh-88px)]">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {templates.map(template => <button key={template.id} onClick={() => handleSelectTemplate(template)} className="group relative aspect-[9/16] rounded-lg overflow-hidden border-2 border-gray-200 hover:border-indigo-500 transition-all hover:shadow-xl">
                {/* Mini Preview */}
                <div className="w-full h-full relative" style={{
              backgroundColor: template.background.color,
              transform: 'scale(0.95)'
            }}>
                  {/* Render a simplified preview of layers */}
                  {template.layers.slice(0, 5).map((layer, idx) => {
                const style: React.CSSProperties = {
                  position: 'absolute',
                  left: `${layer.x / template.width * 100}%`,
                  top: `${layer.y / template.height * 100}%`,
                  width: `${layer.width / template.width * 100}%`,
                  height: `${layer.height / template.height * 100}%`,
                  transform: 'translate(-50%, -50%)',
                  opacity: layer.props.opacity || 1
                };
                if (layer.type === 'rect') {
                  return <div key={idx} style={{
                    ...style,
                    backgroundColor: layer.props.fill,
                    border: layer.props.stroke ? `1px solid ${layer.props.stroke}` : 'none',
                    borderRadius: layer.props.cornerRadius ? `${layer.props.cornerRadius / 20}px` : 0
                  }} />;
                } else if (layer.type === 'ellipse') {
                  return <div key={idx} style={{
                    ...style,
                    backgroundColor: layer.props.fill,
                    borderRadius: '50%'
                  }} />;
                } else if (layer.type === 'text') {
                  return <div key={idx} style={{
                    ...style,
                    color: layer.props.fill,
                    fontSize: `${layer.props.fontSize! / 40}px`,
                    fontWeight: layer.props.fontWeight,
                    textAlign: layer.props.textAlign,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}>
                        {layer.props.text?.substring(0, 20)}
                      </div>;
                }
                return null;
              })}
                </div>

                {/* Template Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-white text-sm font-semibold truncate">
                    {template.name || template.id}
                  </p>
                  <p className="text-white/75 text-xs mt-1">
                    {template.layers.length} elements
                  </p>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold transition-opacity shadow-lg">
                    Use Template
                  </span>
                </div>
              </button>)}
          </div>
        </div>
      </div>
    </div>;
}