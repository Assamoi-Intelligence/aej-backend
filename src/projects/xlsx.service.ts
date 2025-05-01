import { Injectable } from '@nestjs/common';
import { Workbook } from 'exceljs';
import { Response } from 'express';

@Injectable()
export class XlsxService {
    async exportProjects(data: any[], res: Response) {
        const workbook = new Workbook();
        const sheet = workbook.addWorksheet('Projets');
        sheet.columns = [
        { header: 'ID', key: 'id', width: 36 },
        { header: 'Nom', key: 'lastName', width: 20 },
        { header: 'Prénom', key: 'firstName', width: 20 },
        { header: 'Date de naissance', key: 'dateOfBirth', width: 15 },
        { header: 'Lieu de naissance', key: 'placeOfBirth', width: 20 },
        { header: 'Email', key: 'email', width: 30 },
        { header: 'Type', key: 'type', width: 15 },
        { header: 'Forme juridique', key: 'legalForm', width: 20 },
        { header: 'Numéro CNI', key: 'idCardNumber', width: 20 },
        { header: 'Statut', key: 'status', width: 15 },
        { header: 'Date Création', key: 'createdAt', width: 20 },
        { header: 'Date Mise à jour', key: 'updatedAt', width: 20 },
        { header: 'Justification rejet', key: 'rejectJustification', width: 30 },
        ];

        data.forEach((proj) => {
            sheet.addRow({
                id: proj.id,
                lastName: proj.lastName,
                firstName: proj.firstName,
                dateOfBirth: new Date(proj.dateOfBirth).toISOString().slice(0,10),
                placeOfBirth: proj.placeOfBirth,
                email: proj.email,
                type: proj.type,
                legalForm: proj.legalForm,
                idCardNumber: proj.idCardNumber,
                status: proj.status,
                createdAt: new Date(proj.createdAt).toISOString().slice(0,19).replace('T', ' '),
                updatedAt: new Date(proj.updatedAt).toISOString().slice(0,19).replace('T', ' '),
                rejectJustification: proj.rejectJustification || '',
            });
        });

        res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        );
        res.setHeader('Content-Disposition', 'attachment; filename=projects.xlsx');

        await workbook.xlsx.write(res);
        res.end();
    }
}
