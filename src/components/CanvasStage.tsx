import React, { useEffect, useState, useRef } from 'react';
import { useEditorStore } from '../store/editorStore';
import { Layer } from '../types/editor';
export function CanvasStage() {
  const {
    document,
    zoom,
    selectedLayerId,
    selectLayer,
    updateLayer
  } = useEditorStore();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({
    x: 0,
    y: 0
  });
  const [resizeHandle, setResizeHandle] = useState<string | null>(null);
  const [initialLayerState, setInitialLayerState] = useState<Layer | null>(null);
  // Calculate responsive zoom
  const [containerSize, setContainerSize] = useState({
    width: 0,
    height: 0
  });
  useEffect(() => {
    const updateSize = () => {
      if (canvasRef.current?.parentElement) {
        const parent = canvasRef.current.parentElement;
        setContainerSize({
          width: parent.clientWidth,
          height: parent.clientHeight
        });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  // Auto-fit canvas to container with proper padding for vertical rectangles
  const paddingX = 80; // Horizontal padding
  const paddingY = 80; // Vertical padding
  
  // Calculate the auto-fit zoom (what would fit the canvas in the viewport)
  const autoFitZoom = containerSize.width > 0 && containerSize.height > 0 
    ? Math.min(
        (containerSize.width - paddingX) / document.width,
        (containerSize.height - paddingY) / document.height
      )
    : 1;
  
  // Use user's zoom level, but default to auto-fit if zoom is at 1 (fit mode)
  const responsiveZoom = zoom === 1 ? autoFitZoom : zoom;
  const handleLayerMouseDown = (e: React.MouseEvent, layerId: string) => {
    e.stopPropagation();
    selectLayer(layerId);
    setIsDragging(true);
    setDragStart({
      x: e.clientX,
      y: e.clientY
    });
    const layer = document.layers.find(l => l.id === layerId);
    if (layer) {
      setInitialLayerState({
        ...layer
      });
    }
  };
  const handleResizeStart = (e: React.MouseEvent, handle: string) => {
    e.stopPropagation();
    setResizeHandle(handle);
    setDragStart({
      x: e.clientX,
      y: e.clientY
    });
    const layer = document.layers.find(l => l.id === selectedLayerId);
    if (layer) {
      setInitialLayerState({
        ...layer
      });
    }
  };
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!selectedLayerId) return;
      const layer = document.layers.find(l => l.id === selectedLayerId);
      if (!layer || !initialLayerState) return;
      const dx = (e.clientX - dragStart.x) / responsiveZoom;
      const dy = (e.clientY - dragStart.y) / responsiveZoom;
      if (isDragging && !resizeHandle) {
        // Handle dragging
        updateLayer(selectedLayerId, {
          x: initialLayerState.x + dx,
          y: initialLayerState.y + dy
        });
      } else if (resizeHandle) {
        // Handle resizing
        let newWidth = initialLayerState.width;
        let newHeight = initialLayerState.height;
        let newX = initialLayerState.x;
        let newY = initialLayerState.y;
        const minSize = 20;
        switch (resizeHandle) {
          case 'se':
            // Bottom-right
            newWidth = Math.max(minSize, initialLayerState.width + dx);
            newHeight = Math.max(minSize, initialLayerState.height + dy);
            break;
          case 'sw':
            // Bottom-left
            newWidth = Math.max(minSize, initialLayerState.width - dx);
            newHeight = Math.max(minSize, initialLayerState.height + dy);
            newX = initialLayerState.x + (initialLayerState.width - newWidth) / 2;
            break;
          case 'ne':
            // Top-right
            newWidth = Math.max(minSize, initialLayerState.width + dx);
            newHeight = Math.max(minSize, initialLayerState.height - dy);
            newY = initialLayerState.y + (initialLayerState.height - newHeight) / 2;
            break;
          case 'nw':
            // Top-left
            newWidth = Math.max(minSize, initialLayerState.width - dx);
            newHeight = Math.max(minSize, initialLayerState.height - dy);
            newX = initialLayerState.x + (initialLayerState.width - newWidth) / 2;
            newY = initialLayerState.y + (initialLayerState.height - newHeight) / 2;
            break;
        }
        updateLayer(selectedLayerId, {
          width: newWidth,
          height: newHeight,
          x: newX,
          y: newY
        });
      }
    };
    const handleMouseUp = () => {
      setIsDragging(false);
      setResizeHandle(null);
      setInitialLayerState(null);
    };
    if (isDragging || resizeHandle) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, resizeHandle, selectedLayerId, dragStart, responsiveZoom, document.layers, updateLayer, initialLayerState]);
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      selectLayer(null);
    }
  };
  const renderLayer = (layer: Layer) => {
    const isSelected = layer.id === selectedLayerId;
    const transform = `translate(-50%, -50%) rotate(${layer.rotation}deg) scale(${layer.scaleX}, ${layer.scaleY})`;
    const commonStyle: React.CSSProperties = {
      position: 'absolute',
      left: layer.x,
      top: layer.y,
      width: layer.width,
      height: layer.height,
      transform,
      opacity: layer.props.opacity || 1,
      visibility: layer.visible ? 'visible' : 'hidden',
      cursor: isDragging ? 'grabbing' : 'grab',
      border: isSelected ? '2px solid #4F46E5' : 'none',
      boxSizing: 'border-box'
    };
    switch (layer.type) {
      case 'text':
        return <div key={layer.id} style={{
          ...commonStyle,
          fontSize: layer.props.fontSize,
          fontFamily: layer.props.fontFamily,
          fontWeight: layer.props.fontWeight,
          textAlign: layer.props.textAlign,
          color: layer.props.fill,
          display: 'flex',
          alignItems: 'center',
          justifyContent: layer.props.textAlign === 'center' ? 'center' : layer.props.textAlign === 'right' ? 'flex-end' : 'flex-start',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          userSelect: 'none',
          padding: '8px'
        }} onMouseDown={e => handleLayerMouseDown(e, layer.id)}>
            {layer.props.text}
          </div>;
      case 'rect':
        return <div key={layer.id} style={{
          ...commonStyle,
          backgroundColor: layer.props.fill,
          border: layer.props.stroke ? `${layer.props.strokeWidth}px solid ${layer.props.stroke}` : 'none',
          borderRadius: layer.props.cornerRadius || 0
        }} onMouseDown={e => handleLayerMouseDown(e, layer.id)} />;
      case 'ellipse':
        return <div key={layer.id} style={{
          ...commonStyle,
          backgroundColor: layer.props.fill,
          border: layer.props.stroke ? `${layer.props.strokeWidth}px solid ${layer.props.stroke}` : 'none',
          borderRadius: '50%'
        }} onMouseDown={e => handleLayerMouseDown(e, layer.id)} />;
      case 'line':
        return <div key={layer.id} style={{
          ...commonStyle,
          height: layer.props.strokeWidth,
          backgroundColor: layer.props.stroke
        }} onMouseDown={e => handleLayerMouseDown(e, layer.id)} />;
      case 'image':
        return <img key={layer.id} src={layer.props.src} alt="" style={{
          ...commonStyle,
          objectFit: 'contain'
        }} onMouseDown={e => handleLayerMouseDown(e, layer.id)} draggable={false} />;
      default:
        return null;
    }
  };
  const renderSelectionHandles = () => {
    if (!selectedLayerId) return null;
    const layer = document.layers.find(l => l.id === selectedLayerId);
    if (!layer) return null;
    const handleSize = 12;
    const offset = -6;
    const handles = [{
      position: 'nw',
      cursor: 'nw-resize',
      x: offset,
      y: offset
    }, {
      position: 'ne',
      cursor: 'ne-resize',
      x: layer.width + offset,
      y: offset
    }, {
      position: 'sw',
      cursor: 'sw-resize',
      x: offset,
      y: layer.height + offset
    }, {
      position: 'se',
      cursor: 'se-resize',
      x: layer.width + offset,
      y: layer.height + offset
    }];
    return <div style={{
      position: 'absolute',
      left: layer.x,
      top: layer.y,
      width: layer.width,
      height: layer.height,
      transform: `translate(-50%, -50%) rotate(${layer.rotation}deg) scale(${layer.scaleX}, ${layer.scaleY})`,
      pointerEvents: 'none'
    }}>
        {/* Selection outline */}
        <div style={{
        position: 'absolute',
        inset: -2,
        border: '2px solid #4F46E5',
        pointerEvents: 'none'
      }} />

        {/* Resize handles */}
        {handles.map(handle => <div key={handle.position} style={{
        position: 'absolute',
        left: handle.x,
        top: handle.y,
        width: handleSize,
        height: handleSize,
        backgroundColor: 'white',
        border: '2px solid #4F46E5',
        borderRadius: '50%',
        cursor: handle.cursor,
        pointerEvents: 'auto',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }} onMouseDown={e => handleResizeStart(e, handle.position)} />)}

        {/* Rotation handle (top center) */}
        <div style={{
        position: 'absolute',
        left: layer.width / 2 - handleSize / 2,
        top: -30,
        width: handleSize,
        height: handleSize,
        backgroundColor: 'white',
        border: '2px solid #4F46E5',
        borderRadius: '50%',
        cursor: 'grab',
        pointerEvents: 'auto',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }} title="Rotate (use properties panel)" />

        {/* Connection line to rotation handle */}
        <div style={{
        position: 'absolute',
        left: layer.width / 2,
        top: -30,
        width: 1,
        height: 30,
        backgroundColor: '#4F46E5',
        pointerEvents: 'none'
      }} />
      </div>;
  };
  return <div className="flex-1 bg-gray-100 flex items-center justify-center overflow-hidden p-2 md:p-4">
      <div ref={canvasRef} className="bg-white shadow-2xl relative" style={{
      width: document.width,
      height: document.height,
      transform: `scale(${responsiveZoom})`,
      transformOrigin: 'center',
      backgroundColor: document.background.color
    }} onClick={handleCanvasClick}>
        {document.layers.sort((a, b) => a.zIndex - b.zIndex).map(renderLayer)}
        {renderSelectionHandles()}
      </div>
    </div>;
}
export const getCanvasElement = () => {
  return document.querySelector('[data-canvas="true"]') as HTMLDivElement;
};