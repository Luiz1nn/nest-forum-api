import { Injectable } from '@nestjs/common'

import { Either, right } from '~/core/either'
import { UniqueEntityID } from '~/core/entities/unique-entity-id'
import { QuestionsRepository } from '~/domain/forum/application/repositories/questions-repository'
import { Question } from '~/domain/forum/enterprise/entities/question'

type CreateQuestionUseCaseRequest = {
  authorId: string
  title: string
  content: string
}

type CreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Question
  }
>

@Injectable()
export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    title,
    content,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content,
    })

    await this.questionsRepository.create(question)

    return right({
      question,
    })
  }
}
