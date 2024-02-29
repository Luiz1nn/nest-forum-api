import { Module } from '@nestjs/common'

import { AnswerQuestionUseCase } from '~/domain/forum/application/use-cases/answer-question'
import { AuthenticateStudentUseCase } from '~/domain/forum/application/use-cases/authenticate-student'
import { ChooseQuestionsBestAnswerUseCase } from '~/domain/forum/application/use-cases/choose-question-best-answer'
import { CommentOnQuestionUseCase } from '~/domain/forum/application/use-cases/comment-on-question'
import { CreateQuestionUseCase } from '~/domain/forum/application/use-cases/create-question'
import { DeleteAnswerUseCase } from '~/domain/forum/application/use-cases/delete-answer'
import { DeleteQuestionUseCase } from '~/domain/forum/application/use-cases/delete-question'
import { EditAnswerUseCase } from '~/domain/forum/application/use-cases/edit-answer'
import { EditQuestionUseCase } from '~/domain/forum/application/use-cases/edit-question'
import { FetchQuestionCommentsUseCase } from '~/domain/forum/application/use-cases/fetch-question-comments'
import { FetchRecentQuestionsUseCase } from '~/domain/forum/application/use-cases/fetch-recent-questions'
import { RegisterStudentUseCase } from '~/domain/forum/application/use-cases/register-student'
import { CryptographyModule } from '~/infra/cryptography/cryptography.module'
import { DatabaseModule } from '~/infra/database/database.module'
import { AnswerQuestionController } from '~/infra/http/controllers/answer-question.controller'
import { AuthenticateController } from '~/infra/http/controllers/authenticate.controller'
import { ChooseQuestionBestAnswerController } from '~/infra/http/controllers/choose-question-best-answer.controller'
import { CommentOnQuestionController } from '~/infra/http/controllers/comment-on-question.controller'
import { CreateAccountController } from '~/infra/http/controllers/create-account.controller'
import { CreateQuestionController } from '~/infra/http/controllers/create-question.controller'
import { DeleteAnswerController } from '~/infra/http/controllers/delete-answer.controller'
import { DeleteQuestionController } from '~/infra/http/controllers/delete-question.controller'
import { EditAnswerController } from '~/infra/http/controllers/edit-answer.controller'
import { EditQuestionController } from '~/infra/http/controllers/edit-question.controller'
import { FetchQuestionCommentsController } from '~/infra/http/controllers/fetch-question-comments.controller'
import { FetchRecentQuestionsController } from '~/infra/http/controllers/fetch-recent-questions.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
    EditQuestionController,
    DeleteQuestionController,
    AnswerQuestionController,
    ChooseQuestionBestAnswerController,
    EditAnswerController,
    DeleteAnswerController,
    CommentOnQuestionController,
    FetchQuestionCommentsController,
  ],
  providers: [
    RegisterStudentUseCase,
    AuthenticateStudentUseCase,
    CreateQuestionUseCase,
    FetchRecentQuestionsUseCase,
    EditQuestionUseCase,
    DeleteQuestionUseCase,
    AnswerQuestionUseCase,
    ChooseQuestionsBestAnswerUseCase,
    EditAnswerUseCase,
    DeleteAnswerUseCase,
    CommentOnQuestionUseCase,
    FetchQuestionCommentsUseCase,
  ],
})
export class HttpModule {}
