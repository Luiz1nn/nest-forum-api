import { Module } from '@nestjs/common'

import { AuthenticateStudentUseCase } from '~/domain/forum/application/use-cases/authenticate-student'
import { CreateQuestionUseCase } from '~/domain/forum/application/use-cases/create-question'
import { RegisterStudentUseCase } from '~/domain/forum/application/use-cases/register-student'
import { CryptographyModule } from '~/infra/cryptography/cryptography.module'
import { DatabaseModule } from '~/infra/database/database.module'
import { AuthenticateController } from '~/infra/http/controllers/authenticate.controller'
import { CreateAccountController } from '~/infra/http/controllers/create-account.controller'
import { CreateQuestionController } from '~/infra/http/controllers/create-question.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
  ],
  providers: [
    RegisterStudentUseCase,
    AuthenticateStudentUseCase,
    CreateQuestionUseCase,
  ],
})
export class HttpModule {}
