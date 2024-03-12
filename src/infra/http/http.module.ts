import { Module } from '@nestjs/common'

import { UploadAndCreateAttachmentUseCase } from '~/domain/forum/application/use-cases/attachments/upload-and-create-attachment'
import { CommentOnAnswerUseCase } from '~/domain/forum/application/use-cases/comments/comment-on-answer'
import { CommentOnQuestionUseCase } from '~/domain/forum/application/use-cases/comments/comment-on-question'
import { DeleteAnswerCommentUseCase } from '~/domain/forum/application/use-cases/comments/delete-answer-comment'
import { DeleteQuestionCommentUseCase } from '~/domain/forum/application/use-cases/comments/delete-question-comment'
import { FetchAnswerCommentsUseCase } from '~/domain/forum/application/use-cases/comments/fetch-answer-comments'
import { FetchQuestionCommentsUseCase } from '~/domain/forum/application/use-cases/comments/fetch-question-comments'
import { ChooseQuestionsBestAnswerUseCase } from '~/domain/forum/application/use-cases/questions/choose-question-best-answer'
import { CreateQuestionUseCase } from '~/domain/forum/application/use-cases/questions/create-question'
import { DeleteQuestionUseCase } from '~/domain/forum/application/use-cases/questions/delete-question'
import { EditQuestionUseCase } from '~/domain/forum/application/use-cases/questions/edit-question'
import { FetchRecentQuestionsUseCase } from '~/domain/forum/application/use-cases/questions/fetch-recent-questions'
import { GetQuestionBySlugUseCase } from '~/domain/forum/application/use-cases/questions/get-question-by-slug'
import { DatabaseModule } from '~/infra/database/database.module'
import { CommentOnAnswerController } from '~/infra/http/controllers/comments/comment-on-answer.controller'
import { CommentOnQuestionController } from '~/infra/http/controllers/comments/comment-on-question.controller'
import { DeleteAnswerCommentController } from '~/infra/http/controllers/comments/delete-answer-comment.controller'
import { DeleteQuestionCommentController } from '~/infra/http/controllers/comments/delete-question-comment.controller'
import { FetchAnswerCommentsController } from '~/infra/http/controllers/comments/fetch-answer-comments.controller'
import { FetchQuestionCommentsController } from '~/infra/http/controllers/comments/fetch-question-comments.controller'
import { ChooseQuestionBestAnswerController } from '~/infra/http/controllers/questions/choose-question-best-answer.controller'
import { CreateQuestionController } from '~/infra/http/controllers/questions/create-question.controller'
import { DeleteQuestionController } from '~/infra/http/controllers/questions/delete-question.controller'
import { EditQuestionController } from '~/infra/http/controllers/questions/edit-question.controller'
import { FetchRecentQuestionsController } from '~/infra/http/controllers/questions/fetch-recent-questions.controller'
import { GetQuestionBySlugController } from '~/infra/http/controllers/questions/get-question-by-slug.controller'
import { UploadAttachmentController } from '~/infra/http/controllers/upload-attachment.controller'
import { StorageModule } from '~/infra/storage/storage.module'

import { AnswersControllerModule } from './controllers/answers/answers-controller.module'
import { AuthControllerModule } from './controllers/auth/auth-controller.module'

@Module({
  imports: [
    DatabaseModule,
    StorageModule,
    AuthControllerModule,
    AnswersControllerModule,
  ],
  controllers: [
    CreateQuestionController,
    FetchRecentQuestionsController,
    EditQuestionController,
    DeleteQuestionController,
    ChooseQuestionBestAnswerController,
    CommentOnQuestionController,
    FetchQuestionCommentsController,
    DeleteQuestionCommentController,
    CommentOnAnswerController,
    FetchAnswerCommentsController,
    DeleteAnswerCommentController,
    GetQuestionBySlugController,
    UploadAttachmentController,
  ],
  providers: [
    CreateQuestionUseCase,
    FetchRecentQuestionsUseCase,
    EditQuestionUseCase,
    DeleteQuestionUseCase,
    ChooseQuestionsBestAnswerUseCase,
    CommentOnQuestionUseCase,
    FetchQuestionCommentsUseCase,
    DeleteQuestionCommentUseCase,
    CommentOnAnswerUseCase,
    FetchAnswerCommentsUseCase,
    DeleteAnswerCommentUseCase,
    GetQuestionBySlugUseCase,
    UploadAndCreateAttachmentUseCase,
  ],
})
export class HttpModule {}
