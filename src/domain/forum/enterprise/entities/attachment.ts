import { Entity } from '~/core/entities/entity'
import { UniqueEntityID } from '~/core/entities/unique-entity-id'

type AttachmentProps = {
  title: string
  url: string
}

export class Attachment extends Entity<AttachmentProps> {
  static create(props: AttachmentProps, id?: UniqueEntityID) {
    const attachment = new Attachment(props, id)

    return attachment
  }
}
