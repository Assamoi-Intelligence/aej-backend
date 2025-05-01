import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendProjectStatus(to: string, name: string, projectId: string, status: string, justification?: string) {
        return this.mailerService.sendMail({
            to,
            subject: `Votre projet ${projectId} est ${status}`,
            text: `Bonjour Mr ${name} votre projet est ${status} ${justification}. Coordialement !!`,// ./templates/project-status.hbs
            context: { name, projectId, status, justification },
        });
    }
}