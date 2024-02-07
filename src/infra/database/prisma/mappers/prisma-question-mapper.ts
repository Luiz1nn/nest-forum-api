import { Prisma, Question as PrismaQuestion } from '@prisma/client'

import { UniqueEntityID } from '~/core/entities/unique-entity-id'
import { Question } from '~/domain/forum/enterprise/entities/question'

export class PrismaQuestionMapper {
  static toDomain(raw: PrismaQuestion): Question {
    return Question.create(
      {
        title: raw.title,
        content: raw.content,
        authorId: new UniqueEntityID(raw.authorId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(question: Question): Prisma.QuestionUncheckedCreateInput {
    return {
      id: question.id.toString(),
      authorId: question.authorId.toString(),
      title: question.title,
      content: question.content,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    }
  }
}
