import { Injectable } from '@nestjs/common'

import { Either, left, right } from '~/core/either'
import { UniqueEntityID } from '~/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '~/core/errors'
import {
  QuestionCommentsRepository,
  QuestionsRepository,
} from '~/domain/forum/application/repositories'
import { QuestionComment } from '~/domain/forum/enterprise/entities/comments'

type CommentOnQuestionUseCaseRequest = {
  authorId: string
  questionId: string
  content: string
}

type CommentOnQuestionUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    questionComment: QuestionComment
  }
>

@Injectable()
export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionCommentsRepository: QuestionCommentsRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) return left(new ResourceNotFoundError())

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
      content,
    })

    await this.questionCommentsRepository.create(questionComment)

    return right({
      questionComment,
    })
  }
}
