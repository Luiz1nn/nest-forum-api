import { Module } from '@nestjs/common'

import {
  ChooseQuestionsBestAnswerUseCase,
  CreateQuestionUseCase,
  DeleteQuestionUseCase,
  EditQuestionUseCase,
  FetchRecentQuestionsUseCase,
  GetQuestionBySlugUseCase,
} from '~/domain/forum/application/use-cases/questions'
import { DatabaseModule } from '~/infra/database/database.module'

import { ChooseQuestionBestAnswerController } from './choose-question-best-answer.controller'
import { CreateQuestionController } from './create-question.controller'
import { DeleteQuestionController } from './delete-question.controller'
import { EditQuestionController } from './edit-question.controller'
import { FetchRecentQuestionsController } from './fetch-recent-questions.controller'
import { GetQuestionBySlugController } from './get-question-by-slug.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateQuestionController,
    FetchRecentQuestionsController,
    EditQuestionController,
    DeleteQuestionController,
    ChooseQuestionBestAnswerController,
    GetQuestionBySlugController,
  ],
  providers: [
    CreateQuestionUseCase,
    FetchRecentQuestionsUseCase,
    EditQuestionUseCase,
    DeleteQuestionUseCase,
    ChooseQuestionsBestAnswerUseCase,
    GetQuestionBySlugUseCase,
  ],
})
export class QuestionsControllerModule {}
