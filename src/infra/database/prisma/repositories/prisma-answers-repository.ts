import { Injectable } from '@nestjs/common'

import { DomainEvents } from '~/core/events/domain-events'
import { AnswerAttachmentsRepository } from '~/domain/forum/application/repositories/answer-attachments-repository'
import { AnswersRepository } from '~/domain/forum/application/repositories/answers-repository'
import { Answer } from '~/domain/forum/enterprise/entities/answer'

import { PrismaAnswerMapper } from '../mappers/prisma-answer-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaAnswersRepository implements AnswersRepository {
  constructor(
    private prisma: PrismaService,
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {}

  async findById(id: string): Promise<Answer | null> {
    const answer = await this.prisma.answer.findUnique({
      where: {
        id,
      },
    })

    if (!answer) return null

    return PrismaAnswerMapper.toDomain(answer)
  }

  async create(answer: Answer): Promise<void> {
    const data = PrismaAnswerMapper.toPrisma(answer)

    await this.prisma.answer.create({
      data,
    })

    await this.answerAttachmentsRepository.createMany(
      answer.attachments.getItems(),
    )

    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  async save(answer: Answer): Promise<void> {
    const data = PrismaAnswerMapper.toPrisma(answer)

    await Promise.all([
      this.prisma.answer.update({
        where: {
          id: answer.id.toString(),
        },
        data,
      }),
    ])
  }

  async delete(answer: Answer): Promise<void> {
    await this.prisma.answer.delete({
      where: {
        id: answer.id.toString(),
      },
    })
  }
}
