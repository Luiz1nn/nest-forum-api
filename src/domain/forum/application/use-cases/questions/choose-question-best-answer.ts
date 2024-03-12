import { Injectable } from '@nestjs/common'

import { Either, left, right } from '~/core/either'
import { NotAllowedError, ResourceNotFoundError } from '~/core/errors'
import {
  AnswersRepository,
  QuestionsRepository,
} from '~/domain/forum/application/repositories'
import { Question } from '~/domain/forum/enterprise/entities/question'

type ChooseQuestionsBestAnswerUseCaseRequest = {
  authorId: string
  answerId: string
}

type ChooseQuestionsBestAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

@Injectable()
export class ChooseQuestionsBestAnswerUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private answerRepository: AnswersRepository,
  ) {}

  async execute({
    authorId,
    answerId,
  }: ChooseQuestionsBestAnswerUseCaseRequest): Promise<ChooseQuestionsBestAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) return left(new ResourceNotFoundError())

    const question = await this.questionsRepository.findById(
      answer.questionId.toString(),
    )

    if (!question) return left(new ResourceNotFoundError())

    if (authorId !== question.authorId.toString())
      return left(new NotAllowedError())

    question.bestAnswerId = answer.id

    await this.questionsRepository.save(question)

    return right({
      question,
    })
  }
}
