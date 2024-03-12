import { Module } from '@nestjs/common'

import { UploadAndCreateAttachmentUseCase } from '~/domain/forum/application/use-cases/attachments/upload-and-create-attachment'
import { CommentOnAnswerUseCase } from '~/domain/forum/application/use-cases/comments/comment-on-answer'
import { CommentOnQuestionUseCase } from '~/domain/forum/application/use-cases/comments/comment-on-question'
import { DeleteAnswerCommentUseCase } from '~/domain/forum/application/use-cases/comments/delete-answer-comment'
import { DeleteQuestionCommentUseCase } from '~/domain/forum/application/use-cases/comments/delete-question-comment'
import { FetchAnswerCommentsUseCase } from '~/domain/forum/application/use-cases/comments/fetch-answer-comments'
import { FetchQuestionCommentsUseCase } from '~/domain/forum/application/use-cases/comments/fetch-question-comments'
import { ChooseQuestionsBestAnswerUseCase } from '~/domain/forum/application/use-cases/questions/choose-question-best-answer'
import { DatabaseModule } from '~/infra/database/database.module'
import { CommentOnAnswerController } from '~/infra/http/controllers/comments/comment-on-answer.controller'
import { CommentOnQuestionController } from '~/infra/http/controllers/comments/comment-on-question.controller'
import { DeleteAnswerCommentController } from '~/infra/http/controllers/comments/delete-answer-comment.controller'
import { DeleteQuestionCommentController } from '~/infra/http/controllers/comments/delete-question-comment.controller'
import { FetchAnswerCommentsController } from '~/infra/http/controllers/comments/fetch-answer-comments.controller'
import { FetchQuestionCommentsController } from '~/infra/http/controllers/comments/fetch-question-comments.controller'
import { UploadAttachmentController } from '~/infra/http/controllers/upload-attachment.controller'
import { StorageModule } from '~/infra/storage/storage.module'

import { AnswersControllerModule } from './controllers/answers/answers-controller.module'
import { AuthControllerModule } from './controllers/auth/auth-controller.module'
import { QuestionsControllerModule } from './controllers/questions/questions-controller.module'

@Module({
  imports: [
    DatabaseModule,
    StorageModule,
    AuthControllerModule,
    QuestionsControllerModule,
    AnswersControllerModule,
  ],
  controllers: [
    CommentOnQuestionController,
    FetchQuestionCommentsController,
    DeleteQuestionCommentController,
    CommentOnAnswerController,
    FetchAnswerCommentsController,
    DeleteAnswerCommentController,
    UploadAttachmentController,
  ],
  providers: [
    ChooseQuestionsBestAnswerUseCase,
    CommentOnQuestionUseCase,
    FetchQuestionCommentsUseCase,
    DeleteQuestionCommentUseCase,
    CommentOnAnswerUseCase,
    FetchAnswerCommentsUseCase,
    DeleteAnswerCommentUseCase,
    UploadAndCreateAttachmentUseCase,
  ],
})
export class HttpModule {}
