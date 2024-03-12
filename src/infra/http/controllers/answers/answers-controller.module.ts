import { Module } from '@nestjs/common'

import { AnswerQuestionUseCase } from '~/domain/forum/application/use-cases/answers/answer-question'
import { DeleteAnswerUseCase } from '~/domain/forum/application/use-cases/answers/delete-answer'
import { EditAnswerUseCase } from '~/domain/forum/application/use-cases/answers/edit-answer'
import { DatabaseModule } from '~/infra/database/database.module'

import { AnswerQuestionController } from './answer-question.controller'
import { DeleteAnswerController } from './delete-answer.controller'
import { EditAnswerController } from './edit-answer.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [
    AnswerQuestionController,
    EditAnswerController,
    DeleteAnswerController,
  ],
  providers: [AnswerQuestionUseCase, EditAnswerUseCase, DeleteAnswerUseCase],
})
export class AnswersControllerModule {}
