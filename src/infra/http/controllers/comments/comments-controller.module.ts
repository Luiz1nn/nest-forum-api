import { Module } from '@nestjs/common'

import {
  CommentOnAnswerUseCase,
  CommentOnQuestionUseCase,
  DeleteAnswerCommentUseCase,
  DeleteQuestionCommentUseCase,
  FetchAnswerCommentsUseCase,
  FetchQuestionCommentsUseCase,
} from '~/domain/forum/application/use-cases/comments'
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
