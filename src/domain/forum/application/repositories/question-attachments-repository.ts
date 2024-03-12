import { QuestionAttachment } from '~/domain/forum/enterprise/entities/attachments/question-attachment'

export abstract class QuestionAttachmentsRepository {
  abstract findManyByQuestionId(
    questionId: string,
  ): Promise<QuestionAttachment[]>

  abstract createMany(attachments: QuestionAttachment[]): Promise<void>
  abstract deleteMany(attachments: QuestionAttachment[]): Promise<void>
  abstract deleteManyByQuestionId(questionId: string): Promise<void>
}
