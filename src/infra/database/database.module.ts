import { Module } from '@nestjs/common'

import { QuestionsRepository } from '~/domain/forum/application/repositories/questions-repository'
import { StudentsRepository } from '~/domain/forum/application/repositories/students-repository'

import { PrismaService } from './prisma/prisma.service'
import { PrismaQuestionsRepository } from './prisma/repositories/prisma-questions-repository'
import { PrismaStudentsRepository } from './prisma/repositories/prisma-students-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: StudentsRepository,
      useClass: PrismaStudentsRepository,
    },
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRepository,
    },
  ],
  exports: [PrismaService, StudentsRepository, QuestionsRepository],
})
export class DatabaseModule {}
