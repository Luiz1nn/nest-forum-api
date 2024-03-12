import { AnswerAttachment } from '~/domain/forum/enterprise/entities/attachments/answer-attachment'

export abstract class AnswerAttachmentsRepository {
  abstract createMany(attachments: AnswerAttachment[]): Promise<void>
}
