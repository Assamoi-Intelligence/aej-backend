import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import { Response } from 'express';

@Injectable()
export class PdfService {
  async generateProjectPdf(data: any, res: Response) {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=project-${data.id}.pdf`,
    );
    doc.fontSize(20).text(`Projet: ${data.id}`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Nom: ${data.lastName} ${data.firstName}`);
    doc.text(`Date de naissance: ${new Date(data.dateOfBirth).toISOString().slice(0,10)}`);
    doc.text(`Lieu de naissance: ${data.placeOfBirth}`);
    doc.text(`Email: ${data.email}`);
    doc.text(`Type: ${data.type}`);
    doc.text(`Forme juridique: ${data.legalForm}`);
    doc.text(`Statut: ${data.status}`);
    if (data.rejectJustification) {
      doc.moveDown().fillColor('red').text(`Motif rejet: ${data.rejectJustification}`);
    }
    doc.end();
    doc.pipe(res);
  }
}