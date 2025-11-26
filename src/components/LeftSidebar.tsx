import React, { useState } from 'react';
import { Type, Image, Square, Circle, Minus, Layers, Upload, X } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';
import { TemplateModal } from './TemplateModal';
function ImageUploadModal({
  onClose
}: {
  onClose: () => void;
}) {
  const {
    addLayer
  } = useEditorStore();
  const [dragActive, setDragActive] = useState(false);
  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }
    const reader = new FileReader();
    reader.onload = e => {
      const img = new window.Image();
      img.onload = () => {
        addLayer({
          type: 'image',
          x: 540,
          y: 960,
          width: img.width,
          height: img.height,
          rotation: 0,
          scaleX: Math.min(800 / img.width, 1),
          scaleY: Math.min(800 / img.height, 1),
          visible: true,
          props: {
            src: e.target?.result as string,
            opacity: 1
          }
        });
        onClose();
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };
  return <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Upload Image</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        <div onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} className={`border-2 border-dashed rounded-lg p-8 md:p-12 text-center transition-colors ${dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}`}>
          <Upload size={48} className="mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 mb-2">Drag and drop an image here</p>
          <p className="text-sm text-gray-400 mb-4">or</p>
          <label className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer">
            Choose File
            <input type="file" accept="image/*" onChange={handleChange} className="hidden" />
          </label>
        </div>

        <button onClick={onClose} className="mt-4 w-full px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
          Cancel
        </button>
      </div>
    </div>;
}
export function LeftSidebar() {
  const {
    addLayer
  } = useEditorStore();
  const [showTemplates, setShowTemplates] = useState(false);
  const [showUploader, setShowUploader] = useState(false);
  const handleAddText = () => {
    addLayer({
      type: 'text',
      x: 540,
      y: 960,
      width: 600,
      height: 100,
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
      visible: true,
      props: {
        text: 'Add your text',
        fontSize: 48,
        fontFamily: 'Inter',
        fontWeight: '600',
        textAlign: 'center',
        fill: '#000000'
      }
    });
  };
  const handleAddRect = () => {
    addLayer({
      type: 'rect',
      x: 540,
      y: 960,
      width: 400,
      height: 300,
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
      visible: true,
      props: {
        fill: '#3B82F6',
        stroke: '#1E40AF',
        strokeWidth: 2,
        opacity: 1,
        cornerRadius: 8
      }
    });
  };
  const handleAddEllipse = () => {
    addLayer({
      type: 'ellipse',
      x: 540,
      y: 960,
      width: 400,
      height: 400,
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
      visible: true,
      props: {
        fill: '#8B5CF6',
        stroke: '#6D28D9',
        strokeWidth: 2,
        opacity: 1
      }
    });
  };
  const handleAddLine = () => {
    addLayer({
      type: 'line',
      x: 340,
      y: 960,
      width: 400,
      height: 0,
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
      visible: true,
      props: {
        stroke: '#000000',
        strokeWidth: 4,
        opacity: 1
      }
    });
  };
  return <>
      <div className="w-16 md:w-20 bg-gray-50 border-r border-gray-200 flex flex-col items-center py-4 md:py-6 gap-4 md:gap-6 overflow-y-auto">
        <button onClick={() => setShowTemplates(true)} className="flex flex-col items-center gap-1 md:gap-2 p-2 md:p-3 hover:bg-gray-100 rounded-lg transition-colors w-12 md:w-16" title="Templates">
          <Layers size={20} className="md:w-6 md:h-6 text-gray-700" />
          <span className="text-[10px] md:text-xs text-gray-600">
            Templates
          </span>
        </button>

        <button onClick={handleAddText} className="flex flex-col items-center gap-1 md:gap-2 p-2 md:p-3 hover:bg-gray-100 rounded-lg transition-colors w-12 md:w-16" title="Add Text">
          <Type size={20} className="md:w-6 md:h-6 text-gray-700" />
          <span className="text-[10px] md:text-xs text-gray-600">Text</span>
        </button>

        <button onClick={() => setShowUploader(true)} className="flex flex-col items-center gap-1 md:gap-2 p-2 md:p-3 hover:bg-gray-100 rounded-lg transition-colors w-12 md:w-16" title="Upload Image">
          <Image size={20} className="md:w-6 md:h-6 text-gray-700" />
          <span className="text-[10px] md:text-xs text-gray-600">Image</span>
        </button>

        <div className="w-10 md:w-12 h-px bg-gray-300 my-1 md:my-2" />

        <button onClick={handleAddRect} className="flex flex-col items-center gap-1 md:gap-2 p-2 md:p-3 hover:bg-gray-100 rounded-lg transition-colors w-12 md:w-16" title="Add Rectangle">
          <Square size={20} className="md:w-6 md:h-6 text-gray-700" />
          <span className="text-[10px] md:text-xs text-gray-600">Rect</span>
        </button>

        <button onClick={handleAddEllipse} className="flex flex-col items-center gap-1 md:gap-2 p-2 md:p-3 hover:bg-gray-100 rounded-lg transition-colors w-12 md:w-16" title="Add Circle">
          <Circle size={20} className="md:w-6 md:h-6 text-gray-700" />
          <span className="text-[10px] md:text-xs text-gray-600">Circle</span>
        </button>

        <button onClick={handleAddLine} className="flex flex-col items-center gap-1 md:gap-2 p-2 md:p-3 hover:bg-gray-100 rounded-lg transition-colors w-12 md:w-16" title="Add Line">
          <Minus size={20} className="md:w-6 md:h-6 text-gray-700" />
          <span className="text-[10px] md:text-xs text-gray-600">Line</span>
        </button>
      </div>

      {showTemplates && <TemplateModal onClose={() => setShowTemplates(false)} />}
      {showUploader && <ImageUploadModal onClose={() => setShowUploader(false)} />}
    </>;
}