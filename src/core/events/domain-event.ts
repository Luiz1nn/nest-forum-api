import { UniqueEntityID } from '~/core/entities/unique-entity-id'

export type DomainEvent = {
  ocurredAt: Date
  getAggregateId(): UniqueEntityID
}
