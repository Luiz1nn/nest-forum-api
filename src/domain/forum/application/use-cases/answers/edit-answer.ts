import { Injectable } from '@nestjs/common'

import { Either, left, right } from '~/core/either'
import { UniqueEntityID } from '~/core/entities/unique-entity-id'
import { NotAllowedError, ResourceNotFoundError } from '~/core/errors'
import {
  AnswerAttachmentsRepository,
  AnswersRepository,
} from '~/domain/forum/application/repositories'
import { Answer } from '~/domain/forum/enterprise/entities/answer'
import {
  AnswerAttachment,
  AnswerAttachmentList,
} from '~/domain/forum/enterprise/entities/attachments'

type EditAnswerUseCaseRequest = {
  authorId: string
  answerId: string
  content: string
  attachmentsIds: string[]
}

type EditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer
  }
>

@Injectable()
export class EditAnswerUseCase {
  constructor(
    private answerRepository: AnswersRepository,
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
    attachmentsIds,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) return left(new ResourceNotFoundError())

    if (authorId !== answer.authorId.toString())
      return left(new NotAllowedError())

    const currentAnswerAttachments =
      await this.answerAttachmentsRepository.findManyByAnswerId(answerId)

    const answerAttachmentList = new AnswerAttachmentList(
      currentAnswerAttachments,
    )

    const answerAttachments = attachmentsIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        answerId: answer.id,
      })
    })

    answerAttachmentList.update(answerAttachments)

    answer.content = content
    answer.attachments = answerAttachmentList

    await this.answerRepository.save(answer)

    return right({
      answer,
    })
  }
}
