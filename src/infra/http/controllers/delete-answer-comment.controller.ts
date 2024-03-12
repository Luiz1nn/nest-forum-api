import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'

import { DeleteAnswerCommentUseCase } from '~/domain/forum/application/use-cases/comments/delete-answer-comment'
import { CurrentUser } from '~/infra/auth/current-user-decorator'
import { UserPayload } from '~/infra/auth/jwt.strategy'

@Controller('/answers/comments/:id')
export class DeleteAnswerCommentController {
  constructor(private deleteAnswerComment: DeleteAnswerCommentUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('id') answerCommentId: string,
  ) {
    const userId = user.sub

    const result = await this.deleteAnswerComment.execute({
      answerCommentId,
      authorId: userId,
    })

    if (result.isLeft()) throw new BadRequestException()
  }
}
