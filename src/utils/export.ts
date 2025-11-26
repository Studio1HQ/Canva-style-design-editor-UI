import jsPDF from 'jspdf';
export const exportToPNG = async (canvasElement: HTMLElement, fileName: string = 'design.png') => {
  // Use html2canvas for DOM to image conversion
  const html2canvas = (await import('html2canvas')).default;
  const canvas = await html2canvas(canvasElement, {
    backgroundColor: null,
    scale: 2
  });
  const dataURL = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = fileName;
  link.href = dataURL;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
export const exportToPDF = async (canvasElement: HTMLElement, fileName: string = 'design.pdf') => {
  const html2canvas = (await import('html2canvas')).default;
  const jsPDF = (await import('jspdf')).default;
  const canvas = await html2canvas(canvasElement, {
    backgroundColor: null,
    scale: 2
  });
  const dataURL = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [1080, 1920]
  });
  pdf.addImage(dataURL, 'PNG', 0, 0, 1080, 1920);
  pdf.save(fileName);
};
export const saveToJSON = (document: any) => {
  const json = JSON.stringify(document, null, 2);
  const blob = new Blob([json], {
    type: 'application/json'
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = 'design.json';
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
export const loadFromJSON = (file: File): Promise<any> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const json = JSON.parse(e.target?.result as string);
        resolve(json);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
};