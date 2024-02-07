import { Module } from '@nestjs/common'

import { StudentsRepository } from '~/domain/forum/application/repositories/students-repository'

import { PrismaService } from './prisma/prisma.service'
import { PrismaStudentsRepository } from './prisma/repositories/prisma-students-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: StudentsRepository,
      useClass: PrismaStudentsRepository,
    },
  ],
  exports: [PrismaService, StudentsRepository],
})
export class DatabaseModule {}
