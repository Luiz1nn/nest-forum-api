import { UniqueEntityID } from '~/core/entities/unique-entity-id'
import { ValueObject } from '~/core/entities/value-object'

import { Slug } from './slug'

type QuestionDetailsProps = {
  questionId: UniqueEntityID
  authorId: UniqueEntityID
  author: string
  title: string
  content: string
  slug: Slug
  bestAnswerId?: UniqueEntityID | null
  createdAt: Date
  updatedAt?: Date | null
}

export class QuestionDetails extends ValueObject<QuestionDetailsProps> {
  get author() {
    return this.props.author
  }

  get title() {
    return this.props.title
  }

  static create(props: QuestionDetailsProps) {
    return new QuestionDetails(props)
  }
}
