import { Document } from '../types/editor';
export const templates: Document[] = [{
  id: 'template-1',
  width: 1080,
  height: 1920,
  background: {
    color: '#2D5016'
  },
  layers: [{
    id: 'template-1-text-1',
    type: 'text',
    x: 540,
    y: 200,
    width: 800,
    height: 100,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
    visible: true,
    zIndex: 0,
    props: {
      text: 'November 23',
      fontSize: 32,
      fontFamily: 'Inter',
      fontWeight: '400',
      textAlign: 'center',
      fill: '#E8E5D5'
    }
  }, {
    id: 'template-1-text-2',
    type: 'text',
    x: 540,
    y: 300,
    width: 900,
    height: 200,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
    visible: true,
    zIndex: 1,
    props: {
      text: 'THANKSGIVING\nDinner',
      fontSize: 96,
      fontFamily: 'Playfair Display',
      fontWeight: '700',
      textAlign: 'center',
      fill: '#E8E5D5'
    }
  }, {
    id: 'template-1-text-3',
    type: 'text',
    x: 540,
    y: 1400,
    width: 800,
    height: 80,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
    visible: true,
    zIndex: 2,
    props: {
      text: 'You are invited!',
      fontSize: 48,
      fontFamily: 'Inter',
      fontWeight: '600',
      textAlign: 'center',
      fill: '#FFFFFF'
    }
  }]
}, {
  id: 'template-2',
  width: 1080,
  height: 1920,
  background: {
    color: '#F8F4EC'
  },
  layers: [{
    id: 'template-2-rect-1',
    type: 'rect',
    x: 90,
    y: 200,
    width: 900,
    height: 1520,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
    visible: true,
    zIndex: 0,
    props: {
      fill: '#FFFFFF',
      stroke: '#8B4513',
      strokeWidth: 3,
      cornerRadius: 20
    }
  }, {
    id: 'template-2-text-1',
    type: 'text',
    x: 540,
    y: 350,
    width: 800,
    height: 150,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
    visible: true,
    zIndex: 1,
    props: {
      text: 'Your Title Here',
      fontSize: 72,
      fontFamily: 'Playfair Display',
      fontWeight: '700',
      textAlign: 'center',
      fill: '#2C1810'
    }
  }, {
    id: 'template-2-text-2',
    type: 'text',
    x: 540,
    y: 550,
    width: 700,
    height: 100,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
    visible: true,
    zIndex: 2,
    props: {
      text: 'Add your description here',
      fontSize: 32,
      fontFamily: 'Inter',
      fontWeight: '400',
      textAlign: 'center',
      fill: '#6B5D54'
    }
  }]
}, {
  id: 'template-3',
  width: 1080,
  height: 1920,
  background: {
    color: '#1E293B'
  },
  layers: [{
    id: 'template-3-ellipse-1',
    type: 'ellipse',
    x: 540,
    y: 400,
    width: 600,
    height: 600,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
    visible: true,
    zIndex: 0,
    props: {
      fill: '#3B82F6',
      opacity: 0.2
    }
  }, {
    id: 'template-3-text-1',
    type: 'text',
    x: 540,
    y: 900,
    width: 900,
    height: 200,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
    visible: true,
    zIndex: 1,
    props: {
      text: 'Modern Design',
      fontSize: 84,
      fontFamily: 'Inter',
      fontWeight: '800',
      textAlign: 'center',
      fill: '#FFFFFF'
    }
  }, {
    id: 'template-3-text-2',
    type: 'text',
    x: 540,
    y: 1150,
    width: 800,
    height: 100,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
    visible: true,
    zIndex: 2,
    props: {
      text: 'Clean & Minimal',
      fontSize: 36,
      fontFamily: 'Inter',
      fontWeight: '400',
      textAlign: 'center',
      fill: '#94A3B8'
    }
  }]
}, {
  id: 'template-4',
  width: 1080,
  height: 1920,
  background: {
    color: '#FBBF24'
  },
  layers: [{
    id: 'template-4-rect-1',
    type: 'rect',
    x: 540,
    y: 960,
    width: 1080,
    height: 800,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
    visible: true,
    zIndex: 0,
    props: {
      fill: '#1F2937',
      opacity: 1
    }
  }, {
    id: 'template-4-text-1',
    type: 'text',
    x: 540,
    y: 500,
    width: 900,
    height: 200,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
    visible: true,
    zIndex: 1,
    props: {
      text: 'BOLD\nSTATEMENT',
      fontSize: 96,
      fontFamily: 'Inter',
      fontWeight: '900',
      textAlign: 'center',
      fill: '#1F2937'
    }
  }, {
    id: 'template-4-text-2',
    type: 'text',
    x: 540,
    y: 1100,
    width: 800,
    height: 150,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
    visible: true,
    zIndex: 2,
    props: {
      text: 'Make it yours',
      fontSize: 56,
      fontFamily: 'Inter',
      fontWeight: '600',
      textAlign: 'center',
      fill: '#FBBF24'
    }
  }]
}];