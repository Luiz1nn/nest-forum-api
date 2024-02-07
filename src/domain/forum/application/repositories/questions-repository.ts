import { PaginationParams } from '~/core/repositories/pagination-params'
import { Question } from '~/domain/forum/enterprise/entities/question'

export abstract class QuestionsRepository {
  abstract findManyRecent(params: PaginationParams): Promise<Question[]>
  abstract create(question: Question): Promise<void>
}
