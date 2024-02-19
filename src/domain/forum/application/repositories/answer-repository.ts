import { Answer } from '~/domain/forum/enterprise/entities/answer'

export abstract class AnswerRepository {
  abstract create(answer: Answer): Promise<void>
}
