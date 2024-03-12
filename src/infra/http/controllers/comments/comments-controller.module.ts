import { Module } from '@nestjs/common'

import { CommentOnAnswerUseCase } from '~/domain/forum/application/use-cases/comments/comment-on-answer'
import { CommentOnQuestionUseCase } from '~/domain/forum/application/use-cases/comments/comment-on-question'
import { DeleteAnswerCommentUseCase } from '~/domain/forum/application/use-cases/comments/delete-answer-comment'
import { DeleteQuestionCommentUseCase } from '~/domain/forum/application/use-cases/comments/delete-question-comment'
import { FetchAnswerCommentsUseCase } from '~/domain/forum/application/use-cases/comments/fetch-answer-comments'
import { FetchQuestionCommentsUseCase } from '~/domain/forum/application/use-cases/comments/fetch-question-comments'
import { DatabaseModule } from '~/infra/database/database.module'

import { CommentOnAnswerController } from './comment-on-answer.controller'
import { CommentOnQuestionController } from './comment-on-question.controller'
import { DeleteAnswerCommentController } from './delete-answer-comment.controller'
import { DeleteQuestionCommentController } from './delete-question-comment.controller'
import { FetchAnswerCommentsController } from './fetch-answer-comments.controller'
import { FetchQuestionCommentsController } from './fetch-question-comments.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CommentOnQuestionController,
    FetchQuestionCommentsController,
    DeleteQuestionCommentController,
    CommentOnAnswerController,
    FetchAnswerCommentsController,
    DeleteAnswerCommentController,
  ],
  providers: [
    CommentOnQuestionUseCase,
    FetchQuestionCommentsUseCase,
    DeleteQuestionCommentUseCase,
    CommentOnAnswerUseCase,
    FetchAnswerCommentsUseCase,
    DeleteAnswerCommentUseCase,
  ],
})
export class CommentsControllerModule {}
