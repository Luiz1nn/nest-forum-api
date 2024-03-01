import { Injectable } from '@nestjs/common'

import { AnswerCommentsRepository } from '~/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '~/domain/forum/enterprise/entities/answer-comment'

import { PrismaAnswerCommentMapper } from '../mappers/prisma-answer-comment-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  constructor(private prisma: PrismaService) {}

  async create(answerComment: AnswerComment): Promise<void> {
    const data = PrismaAnswerCommentMapper.toPrisma(answerComment)

    await this.prisma.comment.create({
      data,
    })
  }
}
