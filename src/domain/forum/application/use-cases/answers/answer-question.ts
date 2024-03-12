import { Injectable } from '@nestjs/common'

import { Either, right } from '~/core/either'
import { UniqueEntityID } from '~/core/entities/unique-entity-id'
import { AnswersRepository } from '~/domain/forum/application/repositories'
import { Answer } from '~/domain/forum/enterprise/entities/answer'
import {
  AnswerAttachment,
  AnswerAttachmentList,
} from '~/domain/forum/enterprise/entities/attachments'

type AnswerQuestionUseCaseRequest = {
  authorId: string
  questionId: string
  content: string
  attachmentsIds: string[]
}

type AnswerQuestionUseCaseResponse = Either<
  null,
  {
    answer: Answer
  }
>

@Injectable()
export class AnswerQuestionUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    authorId,
    questionId,
    content,
    attachmentsIds,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
    })

    const answerAttachments = attachmentsIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        answerId: answer.id,
      })
    })

    answer.attachments = new AnswerAttachmentList(answerAttachments)

    await this.answerRepository.create(answer)

    return right({
      answer,
    })
  }
}
