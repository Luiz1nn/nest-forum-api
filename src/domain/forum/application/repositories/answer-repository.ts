import { Answer } from '~/domain/forum/enterprise/entities/answer'

export abstract class AnswerRepository {
  abstract findById(id: string): Promise<Answer | null>
  abstract create(answer: Answer): Promise<void>
  abstract save(answer: Answer): Promise<void>
}
