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
          <div className="grid grid-cols-3 gap-6">
            {templates.map(template => <button key={template.id} onClick={() => handleSelectTemplate(template)} className="group relative aspect-[9/16] rounded-lg overflow-hidden border-2 border-gray-200 hover:border-indigo-500 transition-all hover:shadow-lg">
                <div className="w-full h-full flex items-center justify-center" style={{
              backgroundColor: template.background.color
            }}>
                  <div className="text-white text-center p-4">
                    <p className="text-sm font-medium">
                      Template {template.id.split('-')[1]}
                    </p>
                    <p className="text-xs opacity-75 mt-1">
                      {template.layers.length} layers
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium transition-opacity">
                    Use Template
                  </span>
                </div>
              </button>)}
          </div>
        </div>
      </div>
    </div>;
}