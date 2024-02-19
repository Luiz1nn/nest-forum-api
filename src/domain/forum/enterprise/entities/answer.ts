import { AggregateRoot } from '~/core/entities/aggregate-root'
import { UniqueEntityID } from '~/core/entities/unique-entity-id'
import { Optional } from '~/core/types/optional'

type AnswerProps = {
  authorId: UniqueEntityID
  questionId: UniqueEntityID
  content: string
  createdAt: Date
  updateAt?: Date | null
}

export class Answer extends AggregateRoot<AnswerProps> {
  static create(
    props: Optional<AnswerProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const answer = new Answer(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return answer
  }
}
