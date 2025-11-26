export type LayerType = 'image' | 'text' | 'rect' | 'ellipse' | 'line';
export interface Layer {
  id: string;
  type: LayerType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  scaleX: number;
  scaleY: number;
  visible: boolean;
  zIndex: number;
  props: {
    // Text properties
    text?: string;
    fontSize?: number;
    fontFamily?: string;
    fontWeight?: string;
    textAlign?: 'left' | 'center' | 'right';
    fill?: string;
    // Image properties
    src?: string;
    // Shape properties
    stroke?: string;
    strokeWidth?: number;
    opacity?: number;
    // Common
    cornerRadius?: number;
  };
}
export interface Document {
  id: string;
  width: number;
  height: number;
  background: {
    color: string;
  };
  layers: Layer[];
}
export interface EditorState {
  document: Document;
  selectedLayerId: string | null;
  zoom: number;
  history: Document[];
  historyIndex: number;
}