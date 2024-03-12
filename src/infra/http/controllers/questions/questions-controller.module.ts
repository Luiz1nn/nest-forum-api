import { Module } from '@nestjs/common'

import { ChooseQuestionsBestAnswerUseCase } from '~/domain/forum/application/use-cases/questions/choose-question-best-answer'
import { CreateQuestionUseCase } from '~/domain/forum/application/use-cases/questions/create-question'
import { DeleteQuestionUseCase } from '~/domain/forum/application/use-cases/questions/delete-question'
import { EditQuestionUseCase } from '~/domain/forum/application/use-cases/questions/edit-question'
import { FetchRecentQuestionsUseCase } from '~/domain/forum/application/use-cases/questions/fetch-recent-questions'
import { GetQuestionBySlugUseCase } from '~/domain/forum/application/use-cases/questions/get-question-by-slug'
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
