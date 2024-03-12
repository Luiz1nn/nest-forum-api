import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { makeStudent } from 'test/factories/make-student'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'

import { AuthenticateStudentUseCase } from './authenticate-student'

let fakeEncrypter: FakeEncrypter
let fakeHasher: FakeHasher
let inMemoryStudentsRepository: InMemoryStudentsRepository
let sut: AuthenticateStudentUseCase

describe('Authenticate Student', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    fakeHasher = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()
    sut = new AuthenticateStudentUseCase(
      inMemoryStudentsRepository,
      fakeHasher,
      fakeEncrypter,
    )
  })

  it('should be able to authenticate a student', async () => {
    const student = makeStudent({
      email: 'any_email@mail.com',
      password: await fakeHasher.hash('any_password'),
    })

    inMemoryStudentsRepository.items.push(student)

    const result = await sut.execute({
      email: 'any_email@mail.com',
      password: 'any_password',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })
})
