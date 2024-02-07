import { Injectable } from '@nestjs/common'

import { QuestionsRepository } from '~/domain/forum/application/repositories/questions-repository'
import { Question } from '~/domain/forum/enterprise/entities/question'

import { PrismaQuestionMapper } from '../mappers/prisma-question-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaQuestionsRepository implements QuestionsRepository {
  constructor(private prisma: PrismaService) {}

  async create(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)

    await this.prisma.question.create({
      data,
    })
  }
}
