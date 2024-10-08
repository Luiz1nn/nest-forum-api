import { Injectable } from '@nestjs/common'

import { Either, left, right } from '~/core/either'
import { NotAllowedError, ResourceNotFoundError } from '~/core/errors'
import { AnswerCommentsRepository } from '~/domain/forum/application/repositories'

type DeleteAnswerCommentUseCaseRequest = {
  authorId: string
  answerCommentId: string
}

type DeleteAnswerCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

@Injectable()
export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment =
      await this.answerCommentsRepository.findById(answerCommentId)

    if (!answerComment) return left(new ResourceNotFoundError())

    if (answerComment.authorId.toString() !== authorId)
      return left(new NotAllowedError())

    await this.answerCommentsRepository.delete(answerComment)

    return right(null)
  }
}
