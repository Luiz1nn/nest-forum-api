import {
  BadRequestException,
  Controller,
  HttpCode,
  Param,
  Patch,
} from '@nestjs/common'

import { ChooseQuestionsBestAnswerUseCase } from '~/domain/forum/application/use-cases/choose-question-best-answer'
import { CurrentUser } from '~/infra/auth/current-user-decorator'
import { UserPayload } from '~/infra/auth/jwt.strategy'

@Controller('/answers/:answerId/choose-as-best')
export class ChooseQuestionBestAnswerController {
  constructor(
    private chooseQuestionsBestAnswer: ChooseQuestionsBestAnswerUseCase,
  ) {}

  @Patch()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('answerId') answerId: string,
  ) {
    const userId = user.sub

    const result = await this.chooseQuestionsBestAnswer.execute({
      authorId: userId,
      answerId,
    })

    if (result.isLeft()) throw new BadRequestException()
  }
}
