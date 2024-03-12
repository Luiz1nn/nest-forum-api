import { Injectable } from '@nestjs/common'

import { Either, left, right } from '~/core/either'
import { NotAllowedError, ResourceNotFoundError } from '~/core/errors'
import { QuestionCommentsRepository } from '~/domain/forum/application/repositories'

type DeleteQuestionCommentUseCaseRequest = {
  authorId: string
  questionCommentId: string
}

type DeleteQuestionCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

@Injectable()
export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment =
      await this.questionCommentsRepository.findById(questionCommentId)

    if (!questionComment) return left(new ResourceNotFoundError())

    if (questionComment.authorId.toString() !== authorId)
      return left(new NotAllowedError())

    await this.questionCommentsRepository.delete(questionComment)

    return right(null)
  }
}
