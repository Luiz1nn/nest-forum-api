import { Injectable } from '@nestjs/common'

import { Either, left, right } from '~/core/either'
import { NotAllowedError, ResourceNotFoundError } from '~/core/errors'
import { AnswersRepository } from '~/domain/forum/application/repositories'
import { Answer } from '~/domain/forum/enterprise/entities/answer'

type EditAnswerUseCaseRequest = {
  authorId: string
  answerId: string
  content: string
}

type EditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer
  }
>

@Injectable()
export class EditAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) return left(new ResourceNotFoundError())

    if (authorId !== answer.authorId.toString())
      return left(new NotAllowedError())

    answer.content = content

    await this.answerRepository.save(answer)

    return right({
      answer,
    })
  }
}
