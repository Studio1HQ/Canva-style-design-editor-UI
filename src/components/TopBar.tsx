import { useState, useEffect, useRef } from 'react';
import { Undo2, Redo2, Download, Save, FileJson, ZoomIn, ZoomOut, FolderOpen, Menu, ChevronDown, MessageSquare } from 'lucide-react';
import { VeltPresence, VeltSidebarButton, VeltCommentTool, useVeltClient } from '@veltdev/react';
import { useEditorStore } from '../store/editorStore';
import { ExportModal } from './ExportModal';
import { SaveModal } from './SaveModal';
import { LoadModal } from './LoadModal';
import { saveToJSON, loadFromJSON } from '../utils/export';
import { User } from '../types/user';

interface TopBarProps {
  currentUser: User;
  staticUsers: User[];
  onSwitchUser: (user: User) => void;
}

export function TopBar({ currentUser, staticUsers, onSwitchUser }: TopBarProps) {
  const {
    zoom,
    setZoom,
    undo,
    redo,
    history,
    historyIndex,
    document: editorDocument,
    loadDocument,
    resetDocument
  } = useEditorStore();
  const [showExportModal, setShowExportModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const { client } = useVeltClient();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
    };

    if (showUserDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserDropdown]);

  const handleExportJSON = () => {
    saveToJSON(editorDocument);
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
  const [showFileMenu, setShowFileMenu] = useState(false);
  const fileMenuRef = useRef<HTMLDivElement>(null);

  // Close file menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fileMenuRef.current && !fileMenuRef.current.contains(event.target as Node)) {
        setShowFileMenu(false);
      }
    };

    if (showFileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFileMenu]);

  // Enable comment mode when sidebar opens
  useEffect(() => {
    if (client && isSidebarOpen) {
      const commentElement = client.getCommentElement();
      commentElement.enableCommentMode();
    }
  }, [client, isSidebarOpen]);

  // Handle custom sidebar toggle
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (client) {
      const commentElement = client.getCommentElement();
      commentElement.toggleCommentSidebar();
    }
  };

  return <>
      <div className="h-12 bg-[#252627] flex items-center justify-between px-3 text-white">
        {/* Left Section: Menu, File, Undo/Redo */}
        <div className="flex items-center gap-1">
          {/* Mobile Menu Button */}
          <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="lg:hidden p-2 hover:bg-white/10 rounded transition-colors">
            <Menu size={20} />
          </button>

          {/* Desktop: Hamburger Menu */}
          <button className="hidden lg:flex p-2 hover:bg-white/10 rounded transition-colors">
            <Menu size={20} />
          </button>

          {/* File Dropdown */}
          <div ref={fileMenuRef} className="relative hidden lg:block">
            <button
              onClick={() => setShowFileMenu(!showFileMenu)}
              className="px-3 py-1.5 text-sm hover:bg-white/10 rounded transition-colors"
            >
              File
            </button>
            {showFileMenu && (
              <div className="absolute left-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <button
                  onClick={() => { resetDocument(); setShowFileMenu(false); }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                >
                  New Design
                </button>
                <button
                  onClick={() => { setShowSaveModal(true); setShowFileMenu(false); }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <Save size={16} />
                  Save
                </button>
                <button
                  onClick={() => { setShowLoadModal(true); setShowFileMenu(false); }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <FolderOpen size={16} />
                  Load
                </button>
                <div className="border-t border-gray-200 my-1"></div>
                <button
                  onClick={() => { handleExportJSON(); setShowFileMenu(false); }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <FileJson size={16} />
                  Export JSON
                </button>
              </div>
            )}
          </div>

          {/* Undo/Redo - closer to left like Canva */}
          <div className="hidden lg:flex items-center ml-2">
            <button onClick={undo} disabled={!canUndo} className="p-2 hover:bg-white/10 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed" title="Undo (Cmd+Z)">
              <Undo2 size={18} />
            </button>
            <button onClick={redo} disabled={!canRedo} className="p-2 hover:bg-white/10 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed" title="Redo (Cmd+Shift+Z)">
              <Redo2 size={18} />
            </button>
          </div>
        </div>

        {/* Center Section: Document Title */}
        <div className="flex-1 flex justify-center">
          <span className="text-sm text-gray-300 truncate max-w-md hidden md:block">
            {editorDocument.name || 'Untitled Design'}
          </span>
        </div>

        {/* Right Section: Presence, Comments, Zoom, Share */}
        <div className="flex items-center gap-2">
          {/* Presence Avatars */}
          <div className="hidden md:flex items-center">
            <VeltPresence />
          </div>

          {/* Hidden VeltCommentTool for API access */}
          <div className="hidden">
            <VeltCommentTool />
          </div>

          {/* Comments Button - Opens sidebar and enables comment mode */}
          <div className="hidden md:flex items-center">
            <button
              onClick={handleSidebarToggle}
              className="p-2 hover:bg-white/10 rounded transition-colors"
              title="Comments"
            >
              <MessageSquare size={18} />
            </button>
          </div>

          {/* User Switcher */}
          <div ref={userDropdownRef} className="relative hidden md:block">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center gap-2 p-1.5 hover:bg-white/10 rounded transition-colors"
            >
              <img
                src={currentUser.photoUrl}
                alt={currentUser.name}
                className="w-7 h-7 rounded-full"
              />
              <ChevronDown size={14} className="text-gray-400" />
            </button>

            {showUserDropdown && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="text-xs text-gray-500 font-medium">Switch User</p>
                </div>
                {staticUsers.map((user) => (
                  <button
                    key={user.userId}
                    onClick={() => {
                      onSwitchUser(user);
                      setShowUserDropdown(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors ${
                      user.userId === currentUser.userId ? 'bg-indigo-50' : ''
                    }`}
                  >
                    <img
                      src={user.photoUrl}
                      alt={user.name}
                      className="w-9 h-9 rounded-full"
                    />
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    {user.userId === currentUser.userId && (
                      <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Zoom Controls */}
          <div className="hidden md:flex items-center gap-1 ml-2">
            <button onClick={() => setZoom(Math.max(0.1, zoom - 0.1))} className="p-1.5 hover:bg-white/10 rounded transition-colors" title="Zoom Out">
              <ZoomOut size={18} />
            </button>
            <span className="text-xs text-gray-400 w-10 text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button onClick={() => setZoom(Math.min(3, zoom + 0.1))} className="p-1.5 hover:bg-white/10 rounded transition-colors" title="Zoom In">
              <ZoomIn size={18} />
            </button>
            <button onClick={() => setZoom(1)} className="px-2 py-1 text-xs hover:bg-white/10 rounded transition-colors text-gray-300">
              Fit
            </button>
          </div>

          {/* Mobile Undo/Redo */}
          <div className="flex lg:hidden items-center gap-1">
            <button onClick={undo} disabled={!canUndo} className="p-1.5 hover:bg-white/10 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed" title="Undo (Cmd+Z)">
              <Undo2 size={16} />
            </button>
            <button onClick={redo} disabled={!canRedo} className="p-1.5 hover:bg-white/10 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed" title="Redo (Cmd+Shift+Z)">
              <Redo2 size={16} />
            </button>
          </div>

          {/* Share/Export Button */}
          <button onClick={() => setShowExportModal(true)} className="px-4 py-1.5 bg-[#8b3dff] hover:bg-[#7c35e6] text-white rounded-lg transition-colors font-medium flex items-center gap-2 text-sm">
            <Download size={16} />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {showMobileMenu && <div className="lg:hidden absolute top-12 left-0 right-0 bg-white shadow-lg border-b border-gray-200 z-40">
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