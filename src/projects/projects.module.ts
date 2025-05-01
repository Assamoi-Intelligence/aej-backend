import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MulterModule } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { EmailService } from './email.service';
import { XlsxService } from './xlsx.service';
import { PdfService } from './pdf.service';
import { MailerModule } from '@nestjs-modules/mailer';

const multerConfig: MulterOptions = {
  limits: {fieldSize: 5*1024*1024},
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Seuls les fichiers PDF ou Word sont autorisés (type reçu : ${file.mimetype})`),false);
    }
  },
  storage: diskStorage({
    destination: join(__dirname, '..', 'uploads'),
    filename: (req, file, callback) => {
        const uniqSuffix =  Date.now() + '-' + Math.round(Math.random() * 1e9);
        callback(null, `${file.fieldname}-${uniqSuffix}${extname(file.originalname)}`);
    }
  })
}


@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
        secure: false
      },
    }),
    MulterModule.register(multerConfig),
    PrismaModule
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService, EmailService, XlsxService, PdfService],
})
export class ProjectsModule {}
