import { StickyNote, Timer, Grid3X3, Maximize2, HelpCircle } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';

export function BottomBar() {
  const { zoom, setZoom } = useEditorStore();

  return (
    <div className="h-10 bg-[#252627] flex items-center justify-between px-4 text-white border-t border-[#3d3d3d]">
      {/* Left Section: Notes, Timer */}
      <div className="flex items-center gap-1">
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-white/10 rounded transition-colors text-gray-300">
          <StickyNote size={16} />
          <span className="hidden sm:inline">Notes</span>
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-white/10 rounded transition-colors text-gray-300">
          <Timer size={16} />
          <span className="hidden sm:inline">Timer</span>
        </button>
      </div>

      {/* Right Section: Zoom Slider, Grid, Pages, Fullscreen, Help */}
      <div className="flex items-center gap-2">
        {/* Zoom Slider */}
        <div className="hidden md:flex items-center gap-2">
          <input
            type="range"
            min="10"
            max="300"
            value={Math.round(zoom * 100)}
            onChange={(e) => setZoom(Number(e.target.value) / 100)}
            className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-white"
          />
          <span className="text-xs text-gray-400 w-10">{Math.round(zoom * 100)}%</span>
        </div>

        {/* Grid View */}
        <button className="p-1.5 hover:bg-white/10 rounded transition-colors text-gray-400" title="Grid View">
          <Grid3X3 size={18} />
        </button>

        {/* Pages */}
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-white/10 rounded transition-colors text-gray-300">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
          </svg>
          <span className="hidden sm:inline">Pages</span>
          <span className="text-gray-500">1 / 1</span>
        </button>

        {/* Fullscreen */}
        <button className="p-1.5 hover:bg-white/10 rounded transition-colors text-gray-400" title="Fullscreen">
          <Maximize2 size={18} />
        </button>

        {/* Help */}
        <button className="p-1.5 hover:bg-white/10 rounded transition-colors text-gray-400" title="Help">
          <HelpCircle size={18} />
        </button>
      </div>
    </div>
  );
}
