import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Res } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { EmailService } from './email.service';
import { XlsxService } from './xlsx.service';
import { PdfService } from './pdf.service';
import { Response } from 'express';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService, 
    private emailService: EmailService, 
    private xlsxService: XlsxService,
    private pdfService: PdfService
  ) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'idCardPath', maxCount: 1 },
      { name: 'identityDocPath', maxCount: 1 },
      { name: 'businessPlanPath', maxCount: 1 },
    ])
  )
  async create(
    @UploadedFiles() files: {
      idCardPath?: Express.Multer.File[],
      identityDocPath?: Express.Multer.File[],
      businessPlanPath?: Express.Multer.File[]
    }, 
    @Body() createProjectDto: CreateProjectDto) {
      const project = await this.projectsService.create(createProjectDto, files);
      await this.emailService.sendProjectStatus(project.email, `${project.lastName} ${project.firstName}`, project.id, project.status)
      return project;
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    const project = await this.projectsService.update(id, updateProjectDto);
    if (project)
      await this.emailService.sendProjectStatus(project.email, `${project.lastName} ${project.firstName}`, project.id, updateProjectDto.status, updateProjectDto.rejectJustification);
    return project;
  }


  @Get('xlsx')
  getExcel() {
    return "";
  } 

  @Get(':id/pdf')
  async downloadPdf(@Param('id') id: string, @Res() res: Response) {
    const project = await this.projectsService.findOne(id);
    return this.pdfService.generateProjectPdf(project, res);
  }

  @Get('export/excel')
  async downloadExcel(@Res() res: Response) {
    const all = await this.projectsService.findAll();
    return this.xlsxService.exportProjects(all, res);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.projectsService.remove(+id);
  // }
}
