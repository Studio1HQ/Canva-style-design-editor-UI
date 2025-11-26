import { Document } from '../types/editor';

export const templates: Document[] = [
  // Thanksgiving Dinner Invitation
  {
    id: 'thanksgiving-invitation',
    name: 'Thanksgiving Invitation',
    width: 1080,
    height: 1920,
    background: {
      color: '#2D5016'
    },
    layers: [
      {
        id: 'thanksgiving-decoration',
        type: 'ellipse',
        x: 540,
        y: 300,
        width: 200,
        height: 200,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 0,
        props: {
          fill: '#E8E5D5',
          opacity: 0.15
        }
      },
      {
        id: 'thanksgiving-text-1',
        type: 'text',
        x: 540,
        y: 450,
        width: 900,
        height: 120,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 1,
        props: {
          text: 'November 23',
          fontSize: 48,
          fontFamily: 'Inter',
          fontWeight: '400',
          textAlign: 'center',
          fill: '#E8E5D5'
        }
      },
      {
        id: 'thanksgiving-text-2',
        type: 'text',
        x: 540,
        y: 850,
        width: 950,
        height: 300,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 2,
        props: {
          text: 'THANKSGIVING\nDinner',
          fontSize: 120,
          fontFamily: 'Playfair Display',
          fontWeight: '700',
          textAlign: 'center',
          fill: '#E8E5D5'
        }
      },
      {
        id: 'thanksgiving-divider',
        type: 'rect',
        x: 540,
        y: 1200,
        width: 300,
        height: 4,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 3,
        props: {
          fill: '#E8E5D5',
          opacity: 0.6
        }
      },
      {
        id: 'thanksgiving-text-3',
        type: 'text',
        x: 540,
        y: 1500,
        width: 900,
        height: 120,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 4,
        props: {
          text: 'You are invited!',
          fontSize: 60,
          fontFamily: 'Inter',
          fontWeight: '600',
          textAlign: 'center',
          fill: '#FFFFFF'
        }
      },
      {
        id: 'thanksgiving-decoration-2',
        type: 'ellipse',
        x: 540,
        y: 1700,
        width: 150,
        height: 150,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 5,
        props: {
          fill: '#E8E5D5',
          opacity: 0.1
        }
      }
    ]
  },
  // Elegant Event Card
  {
    id: 'elegant-event-card',
    name: 'Elegant Event Card',
    width: 1080,
    height: 1920,
    background: {
      color: '#F8F4EC'
    },
    layers: [
      {
        id: 'event-card-frame',
        type: 'rect',
        x: 540,
        y: 960,
        width: 920,
        height: 1600,
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
      },
      {
        id: 'event-card-accent',
        type: 'rect',
        x: 540,
        y: 400,
        width: 400,
        height: 8,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 1,
        props: {
          fill: '#8B4513',
          cornerRadius: 4
        }
      },
      {
        id: 'event-card-title',
        type: 'text',
        x: 540,
        y: 650,
        width: 900,
        height: 180,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 2,
        props: {
          text: 'Your Title Here',
          fontSize: 86,
          fontFamily: 'Playfair Display',
          fontWeight: '700',
          textAlign: 'center',
          fill: '#2C1810'
        }
      },
      {
        id: 'event-card-subtitle',
        type: 'text',
        x: 540,
        y: 920,
        width: 800,
        height: 120,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 3,
        props: {
          text: 'Add your description here',
          fontSize: 40,
          fontFamily: 'Inter',
          fontWeight: '400',
          textAlign: 'center',
          fill: '#6B5D54'
        }
      },
      {
        id: 'event-card-decoration',
        type: 'ellipse',
        x: 540,
        y: 1450,
        width: 100,
        height: 100,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 4,
        props: {
          fill: '#8B4513',
          opacity: 0.15
        }
      }
    ]
  },
  // Modern Minimalist
  {
    id: 'modern-minimalist',
    name: 'Modern Minimalist',
    width: 1080,
    height: 1920,
    background: {
      color: '#1E293B'
    },
    layers: [
      {
        id: 'modern-circle-1',
        type: 'ellipse',
        x: 540,
        y: 600,
        width: 700,
        height: 700,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 0,
        props: {
          fill: '#3B82F6',
          opacity: 0.2
        }
      },
      {
        id: 'modern-circle-2',
        type: 'ellipse',
        x: 300,
        y: 350,
        width: 250,
        height: 250,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 1,
        props: {
          fill: '#60A5FA',
          opacity: 0.15
        }
      },
      {
        id: 'modern-circle-3',
        type: 'ellipse',
        x: 780,
        y: 850,
        width: 180,
        height: 180,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 2,
        props: {
          fill: '#93C5FD',
          opacity: 0.2
        }
      },
      {
        id: 'modern-title',
        type: 'text',
        x: 540,
        y: 1100,
        width: 950,
        height: 240,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 3,
        props: {
          text: 'Modern Design',
          fontSize: 100,
          fontFamily: 'Inter',
          fontWeight: '800',
          textAlign: 'center',
          fill: '#FFFFFF'
        }
      },
      {
        id: 'modern-subtitle',
        type: 'text',
        x: 540,
        y: 1400,
        width: 850,
        height: 120,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 4,
        props: {
          text: 'Clean & Minimal',
          fontSize: 44,
          fontFamily: 'Inter',
          fontWeight: '400',
          textAlign: 'center',
          fill: '#94A3B8'
        }
      },
      {
        id: 'modern-accent-line',
        type: 'rect',
        x: 540,
        y: 1600,
        width: 200,
        height: 6,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 5,
        props: {
          fill: '#3B82F6',
          cornerRadius: 3
        }
      }
    ]
  },
  // Bold Statement
  {
    id: 'bold-statement',
    name: 'Bold Statement',
    width: 1080,
    height: 1920,
    background: {
      color: '#FBBF24'
    },
    layers: [
      {
        id: 'bold-bottom-section',
        type: 'rect',
        x: 540,
        y: 1360,
        width: 1080,
        height: 1120,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 0,
        props: {
          fill: '#1F2937',
          opacity: 1
        }
      },
      {
        id: 'bold-accent-rect',
        type: 'rect',
        x: 200,
        y: 450,
        width: 150,
        height: 150,
        rotation: 45,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 1,
        props: {
          fill: '#1F2937',
          opacity: 0.2
        }
      },
      {
        id: 'bold-title',
        type: 'text',
        x: 540,
        y: 600,
        width: 950,
        height: 280,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 2,
        props: {
          text: 'BOLD\nSTATEMENT',
          fontSize: 110,
          fontFamily: 'Inter',
          fontWeight: '900',
          textAlign: 'center',
          fill: '#1F2937'
        }
      },
      {
        id: 'bold-subtitle',
        type: 'text',
        x: 540,
        y: 1400,
        width: 900,
        height: 180,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 3,
        props: {
          text: 'Make it yours',
          fontSize: 68,
          fontFamily: 'Inter',
          fontWeight: '600',
          textAlign: 'center',
          fill: '#FBBF24'
        }
      },
      {
        id: 'bold-accent-circle',
        type: 'ellipse',
        x: 880,
        y: 750,
        width: 120,
        height: 120,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 4,
        props: {
          fill: '#1F2937',
          opacity: 0.15
        }
      }
    ]
  },

  // Vibrant Gradient
  {
    id: 'vibrant-gradient',
    name: 'Vibrant Gradient',
    width: 1080,
    height: 1920,
    background: {
      color: '#EC4899'
    },
    layers: [
      {
        id: 'vibrant-top-circle',
        type: 'ellipse',
        x: 540,
        y: 400,
        width: 800,
        height: 800,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 0,
        props: {
          fill: '#8B5CF6',
          opacity: 0.4
        }
      },
      {
        id: 'vibrant-bottom-circle',
        type: 'ellipse',
        x: 540,
        y: 1520,
        width: 900,
        height: 900,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 1,
        props: {
          fill: '#F59E0B',
          opacity: 0.3
        }
      },
      {
        id: 'vibrant-accent-1',
        type: 'ellipse',
        x: 200,
        y: 900,
        width: 300,
        height: 300,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 2,
        props: {
          fill: '#3B82F6',
          opacity: 0.25
        }
      },
      {
        id: 'vibrant-title',
        type: 'text',
        x: 540,
        y: 850,
        width: 950,
        height: 260,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 3,
        props: {
          text: 'VIBRANT\nENERGY',
          fontSize: 115,
          fontFamily: 'Inter',
          fontWeight: '900',
          textAlign: 'center',
          fill: '#FFFFFF'
        }
      },
      {
        id: 'vibrant-subtitle',
        type: 'text',
        x: 540,
        y: 1200,
        width: 800,
        height: 100,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 4,
        props: {
          text: 'Express Yourself',
          fontSize: 50,
          fontFamily: 'Inter',
          fontWeight: '500',
          textAlign: 'center',
          fill: '#FFFFFF'
        }
      }
    ]
  },

  // Professional Corporate
  {
    id: 'professional-corporate',
    name: 'Professional Corporate',
    width: 1080,
    height: 1920,
    background: {
      color: '#0F172A'
    },
    layers: [
      {
        id: 'corporate-header-bar',
        type: 'rect',
        x: 540,
        y: 200,
        width: 1080,
        height: 250,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 0,
        props: {
          fill: '#0EA5E9',
          opacity: 1
        }
      },
      {
        id: 'corporate-accent-bar',
        type: 'rect',
        x: 540,
        y: 350,
        width: 1080,
        height: 8,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 1,
        props: {
          fill: '#38BDF8'
        }
      },
      {
        id: 'corporate-content-box',
        type: 'rect',
        x: 540,
        y: 1100,
        width: 950,
        height: 1200,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 2,
        props: {
          fill: '#1E293B',
          cornerRadius: 12
        }
      },
      {
        id: 'corporate-title',
        type: 'text',
        x: 540,
        y: 650,
        width: 900,
        height: 180,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 3,
        props: {
          text: 'PROFESSIONAL',
          fontSize: 88,
          fontFamily: 'Inter',
          fontWeight: '800',
          textAlign: 'center',
          fill: '#FFFFFF'
        }
      },
      {
        id: 'corporate-subtitle',
        type: 'text',
        x: 540,
        y: 900,
        width: 850,
        height: 100,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 4,
        props: {
          text: 'Business Excellence',
          fontSize: 46,
          fontFamily: 'Inter',
          fontWeight: '400',
          textAlign: 'center',
          fill: '#94A3B8'
        }
      },
      {
        id: 'corporate-body-text',
        type: 'text',
        x: 540,
        y: 1200,
        width: 820,
        height: 150,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 5,
        props: {
          text: 'Your content goes here',
          fontSize: 42,
          fontFamily: 'Inter',
          fontWeight: '500',
          textAlign: 'center',
          fill: '#E2E8F0'
        }
      },
      {
        id: 'corporate-accent-square',
        type: 'rect',
        x: 120,
        y: 1650,
        width: 100,
        height: 100,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 6,
        props: {
          fill: '#0EA5E9',
          opacity: 0.3
        }
      }
    ]
  },

  // Summer Vibes
  {
    id: 'summer-vibes',
    name: 'Summer Vibes',
    width: 1080,
    height: 1920,
    background: {
      color: '#FEF3C7'
    },
    layers: [
      {
        id: 'summer-sun',
        type: 'ellipse',
        x: 800,
        y: 350,
        width: 280,
        height: 280,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 0,
        props: {
          fill: '#F59E0B',
          opacity: 0.7
        }
      },
      {
        id: 'summer-wave-1',
        type: 'ellipse',
        x: 540,
        y: 1700,
        width: 1200,
        height: 500,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 1,
        props: {
          fill: '#06B6D4',
          opacity: 0.6
        }
      },
      {
        id: 'summer-wave-2',
        type: 'ellipse',
        x: 540,
        y: 1650,
        width: 1400,
        height: 450,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 2,
        props: {
          fill: '#0EA5E9',
          opacity: 0.4
        }
      },
      {
        id: 'summer-title',
        type: 'text',
        x: 540,
        y: 750,
        width: 950,
        height: 260,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 3,
        props: {
          text: 'SUMMER\nVIBES',
          fontSize: 120,
          fontFamily: 'Inter',
          fontWeight: '900',
          textAlign: 'center',
          fill: '#0C4A6E'
        }
      },
      {
        id: 'summer-subtitle',
        type: 'text',
        x: 540,
        y: 1100,
        width: 850,
        height: 120,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 4,
        props: {
          text: 'Feel the warmth',
          fontSize: 52,
          fontFamily: 'Inter',
          fontWeight: '600',
          textAlign: 'center',
          fill: '#F59E0B'
        }
      },
      {
        id: 'summer-accent',
        type: 'ellipse',
        x: 280,
        y: 600,
        width: 150,
        height: 150,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 5,
        props: {
          fill: '#F59E0B',
          opacity: 0.3
        }
      }
    ]
  },

  // Elegant Wedding
  {
    id: 'elegant-wedding',
    name: 'Elegant Wedding',
    width: 1080,
    height: 1920,
    background: {
      color: '#FFF1F2'
    },
    layers: [
      {
        id: 'wedding-border-top',
        type: 'rect',
        x: 540,
        y: 120,
        width: 950,
        height: 3,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 0,
        props: {
          fill: '#BE123C'
        }
      },
      {
        id: 'wedding-border-bottom',
        type: 'rect',
        x: 540,
        y: 1800,
        width: 950,
        height: 3,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 1,
        props: {
          fill: '#BE123C'
        }
      },
      {
        id: 'wedding-heart',
        type: 'ellipse',
        x: 540,
        y: 450,
        width: 180,
        height: 180,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 2,
        props: {
          fill: '#FB7185',
          opacity: 0.3
        }
      },
      {
        id: 'wedding-divider',
        type: 'rect',
        x: 540,
        y: 780,
        width: 350,
        height: 2,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 3,
        props: {
          fill: '#BE123C',
          opacity: 0.4
        }
      },
      {
        id: 'wedding-title',
        type: 'text',
        x: 540,
        y: 950,
        width: 950,
        height: 220,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 4,
        props: {
          text: 'Save the Date',
          fontSize: 92,
          fontFamily: 'Playfair Display',
          fontWeight: '700',
          textAlign: 'center',
          fill: '#BE123C'
        }
      },
      {
        id: 'wedding-names',
        type: 'text',
        x: 540,
        y: 1250,
        width: 850,
        height: 140,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 5,
        props: {
          text: 'John & Jane',
          fontSize: 64,
          fontFamily: 'Playfair Display',
          fontWeight: '400',
          textAlign: 'center',
          fill: '#881337'
        }
      },
      {
        id: 'wedding-date',
        type: 'text',
        x: 540,
        y: 1500,
        width: 800,
        height: 100,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 6,
        props: {
          text: 'June 15, 2025',
          fontSize: 42,
          fontFamily: 'Inter',
          fontWeight: '400',
          textAlign: 'center',
          fill: '#9F1239'
        }
      },
      {
        id: 'wedding-accent-left',
        type: 'ellipse',
        x: 200,
        y: 950,
        width: 80,
        height: 80,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 7,
        props: {
          fill: '#FB7185',
          opacity: 0.2
        }
      },
      {
        id: 'wedding-accent-right',
        type: 'ellipse',
        x: 880,
        y: 950,
        width: 80,
        height: 80,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        visible: true,
        zIndex: 8,
        props: {
          fill: '#FB7185',
          opacity: 0.2
        }
      }
    ]
  }
];