import { Attachment } from '~/domain/forum/enterprise/entities/attachments'

export abstract class AttachmentsRepository {
  abstract create(attachment: Attachment): Promise<void>
}
