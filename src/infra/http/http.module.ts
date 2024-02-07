import { Module } from '@nestjs/common'

import { RegisterStudentUseCase } from '~/domain/forum/application/use-cases/register-student'
import { CryptographyModule } from '~/infra/cryptography/cryptography.module'
import { DatabaseModule } from '~/infra/database/database.module'
import { CreateAccountController } from '~/infra/http/controllers/create-account.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [CreateAccountController],
  providers: [RegisterStudentUseCase],
})
export class HttpModule {}
