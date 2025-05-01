import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'idCardPath', maxCount: 1 },
      { name: 'identityDocPath', maxCount: 1 },
      { name: 'businessPlanPath', maxCount: 1 },
    ])
  )
  create(
    @UploadedFiles() files: {
      idCardPath?: Express.Multer.File[],
      identityDocPath?: Express.Multer.File[],
      businessPlanPath?: Express.Multer.File[]
    }, 
    @Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto, files);
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
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.projectsService.remove(+id);
  // }
}
