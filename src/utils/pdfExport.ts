import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportToPDF = (title: string, headers: string[], data: any[][]) => {
  const doc = new jsPDF();
  doc.text(title, 14, 15);
  autoTable(doc, {
    head: [headers],
    body: data,
    startY: 20,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [30, 58, 138] }
  });
  doc.save(`${title.toLowerCase().replace(/\s+/g, '_')}.pdf`);
};
