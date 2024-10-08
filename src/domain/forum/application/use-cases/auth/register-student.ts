import { Injectable } from '@nestjs/common'

import { Either, left, right } from '~/core/either'
import { HashGenerator } from '~/domain/forum/application/cryptography'
import { StudentsRepository } from '~/domain/forum/application/repositories'
import { StudentAlreadyExistsError } from '~/domain/forum/application/use-cases/errors'
import { Student } from '~/domain/forum/enterprise/entities/student'

type RegisterStudentUseCaseRequest = {
  name: string
  email: string
  password: string
}

type RegisterStudentUseCaseResponse = Either<
  StudentAlreadyExistsError,
  {
    student: Student
  }
>

@Injectable()
export class RegisterStudentUseCase {
  constructor(
    private studentsRepository: StudentsRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterStudentUseCaseRequest): Promise<RegisterStudentUseCaseResponse> {
    const studentWithSameEmail =
      await this.studentsRepository.findByEmail(email)

    if (studentWithSameEmail) return left(new StudentAlreadyExistsError(email))

    const hashedPassword = await this.hashGenerator.hash(password)

    const student = Student.create({
      name,
      email,
      password: hashedPassword,
    })

    await this.studentsRepository.create(student)

    return right({
      student,
    })
  }
}
