import { Module } from '@nestjs/common'

import {
  AuthenticateStudentUseCase,
  RegisterStudentUseCase,
} from '~/domain/forum/application/use-cases/auth'
import { CryptographyModule } from '~/infra/cryptography/cryptography.module'
import { DatabaseModule } from '~/infra/database/database.module'

import { AuthenticateController } from './authenticate.controller'
import { CreateAccountController } from './create-account.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [CreateAccountController, AuthenticateController],
  providers: [RegisterStudentUseCase, AuthenticateStudentUseCase],
})
export class AuthControllerModule {}
