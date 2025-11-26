import React, { useState } from 'react';
import { X, Download } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';
import { exportToPNG, exportToPDF } from '../utils/export';
interface ExportModalProps {
  onClose: () => void;
}
export function ExportModal({
  onClose
}: ExportModalProps) {
  const {
    document
  } = useEditorStore();
  const [format, setFormat] = useState<'png' | 'pdf'>('png');
  const [fileName, setFileName] = useState('design');
  const [isExporting, setIsExporting] = useState(false);
  const handleExport = async () => {
    setIsExporting(true);
    try {
      // Find the canvas element
      const canvasElement = document.querySelector('[style*="width: 1080px"]') as HTMLElement;
      if (!canvasElement) {
        alert('Canvas not found');
        return;
      }
      if (format === 'png') {
        await exportToPNG(canvasElement, `${fileName}.png`);
      } else {
        await exportToPDF(canvasElement, `${fileName}.pdf`);
      }
      onClose();
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };
  return <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[500px] overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold">Export Design</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">File Name</label>
            <input type="text" value={fileName} onChange={e => setFileName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="design" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Format</label>
            <div className="flex gap-3">
              <button onClick={() => setFormat('png')} className={`flex-1 py-3 rounded-lg border-2 transition-colors ${format === 'png' ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-gray-200 hover:border-gray-300'}`}>
                <div className="font-medium">PNG</div>
                <div className="text-xs text-gray-500">High quality image</div>
              </button>
              <button onClick={() => setFormat('pdf')} className={`flex-1 py-3 rounded-lg border-2 transition-colors ${format === 'pdf' ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-gray-200 hover:border-gray-300'}`}>
                <div className="font-medium">PDF</div>
                <div className="text-xs text-gray-500">
                  Print ready document
                </div>
              </button>
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button onClick={onClose} disabled={isExporting} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50">
              Cancel
            </button>
            <button onClick={handleExport} disabled={isExporting} className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
              {isExporting ? 'Exporting...' : <>
                  <Download size={18} />
                  Export {format.toUpperCase()}
                </>}
            </button>
          </div>
        </div>
      </div>
    </div>;
}