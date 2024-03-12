import { Question as PrismaQuestion, User as PrismaUser } from '@prisma/client'

import { UniqueEntityID } from '~/core/entities/unique-entity-id'
import { QuestionDetails } from '~/domain/forum/enterprise/entities/value-objects/question-details'
import { Slug } from '~/domain/forum/enterprise/entities/value-objects/slug'

type PrismaQuestionDetails = PrismaQuestion & {
  author: PrismaUser
}

export class PrismaQuestionDetailsMapper {
  static toDomain(raw: PrismaQuestionDetails): QuestionDetails {
    return QuestionDetails.create({
      authorId: new UniqueEntityID(raw.author.id),
      questionId: new UniqueEntityID(raw.id),
      author: raw.author.name,
      title: raw.title,
      slug: Slug.create(raw.slug),
      bestAnswerId: raw.bestAnswerId
        ? new UniqueEntityID(raw.bestAnswerId)
        : null,
      content: raw.content,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    })
  }
}
