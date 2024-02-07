import { Module } from '@nestjs/common'

import { AuthenticateStudentUseCase } from '~/domain/forum/application/use-cases/authenticate-student'
import { RegisterStudentUseCase } from '~/domain/forum/application/use-cases/register-student'
import { CryptographyModule } from '~/infra/cryptography/cryptography.module'
import { DatabaseModule } from '~/infra/database/database.module'
import { AuthenticateController } from '~/infra/http/controllers/authenticate.controller'
import { CreateAccountController } from '~/infra/http/controllers/create-account.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [CreateAccountController, AuthenticateController],
  providers: [RegisterStudentUseCase, AuthenticateStudentUseCase],
})
export class HttpModule {}
