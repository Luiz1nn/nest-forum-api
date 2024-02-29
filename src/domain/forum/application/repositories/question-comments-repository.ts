import { PaginationParams } from '~/core/repositories/pagination-params'
import { QuestionComment } from '~/domain/forum/enterprise/entities/question-comment'
import { CommentWithAuthor } from '~/domain/forum/enterprise/value-objects/comment-with-author'

export abstract class QuestionCommentsRepository {
  abstract findManyByQuestionIdWithAuthor(
    questionId: string,
    params: PaginationParams,
  ): Promise<CommentWithAuthor[]>

  abstract create(questionComment: QuestionComment): Promise<void>
}
