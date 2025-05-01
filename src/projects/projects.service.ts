import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectsService {

  constructor(private prisma: PrismaService) {}

  create(createProjectDto: CreateProjectDto, files: any) {
    if (!files?.idCardPath || !files?.identityDocPath || !files?.businessPlanPath) {
      throw new BadRequestException('Tous les fichiers sont obligatoires');
    }
    const idCardPath = `uploads/${files.idCardPath[0].filename}`;
    const identityDocPath = `uploads/${files.identityDocPath[0].filename}`;
    const businessPlanPath = `uploads/${files.businessPlanPath[0].filename}`;
    return this.prisma.project.create({data: {...createProjectDto, idCardPath, identityDocPath, businessPlanPath}});
  }

  findAll() {
    return this.prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findOne(id: string) {
    return this.prisma.project.findUnique({ where: {id: id} });
  }

  update(id: string, updateProjectDto: UpdateProjectDto) {
    return this.prisma.project.update({ where: {id}, data: updateProjectDto });
  }

  // remove(id: number) {
  //   return `This action removes a #${id} project`;
  // }
}
