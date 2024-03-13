import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { StudentFactory } from 'test/factories/make-student'

import { AppModule } from '~/infra/app.module'
import { DatabaseModule } from '~/infra/database/database.module'

describe('Authenticate (E2E)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    studentFactory = moduleRef.get(StudentFactory)

    await app.init()
  })

  test('[POST] /sessions', async () => {
    await studentFactory.makePrismaStudent({
      email: 'any_email@mail.com',
      password: await hash('any_password', 8),
    })

    const response = await request(app.getHttpServer()).post('/sessions').send({
      email: 'any_email@mail.com',
      password: 'any_password',
    })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      accessToken: expect.any(String),
    })
  })
})
