import { Module } from '@nestjs/common'

import { UploadAndCreateAttachmentUseCase } from '~/domain/forum/application/use-cases/attachments/upload-and-create-attachment'
import { DatabaseModule } from '~/infra/database/database.module'
import { UploadAttachmentController } from '~/infra/http/controllers/upload-attachment.controller'
import { StorageModule } from '~/infra/storage/storage.module'

import { AnswersControllerModule } from './controllers/answers/answers-controller.module'
import { AuthControllerModule } from './controllers/auth/auth-controller.module'
import { CommentsControllerModule } from './controllers/comments/comments-controller.module'
import { QuestionsControllerModule } from './controllers/questions/questions-controller.module'

@Module({
  imports: [
    DatabaseModule,
    StorageModule,
    AuthControllerModule,
    QuestionsControllerModule,
    AnswersControllerModule,
    CommentsControllerModule,
  ],
  controllers: [UploadAttachmentController],
  providers: [UploadAndCreateAttachmentUseCase],
})
export class HttpModule {}
