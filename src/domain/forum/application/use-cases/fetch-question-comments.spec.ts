import { makeQuestionComment } from 'test/factories/make-question-comment'
import { makeStudent } from 'test/factories/make-student'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'

import { UniqueEntityID } from '~/core/entities/unique-entity-id'

import { FetchQuestionCommentsUseCase } from './fetch-question-comments'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: FetchQuestionCommentsUseCase

describe('Fetch Question Comments', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository(
      inMemoryStudentsRepository,
    )
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able to fetch question comments', async () => {
    const student = makeStudent({ name: 'any_name' })

    inMemoryStudentsRepository.items.push(student)

    const comment1 = makeQuestionComment({
      questionId: new UniqueEntityID('any_question_id'),
      authorId: student.id,
    })

    const comment2 = makeQuestionComment({
      questionId: new UniqueEntityID('any_question_id'),
      authorId: student.id,
    })

    const comment3 = makeQuestionComment({
      questionId: new UniqueEntityID('any_question_id'),
      authorId: student.id,
    })

    await inMemoryQuestionCommentsRepository.create(comment1)
    await inMemoryQuestionCommentsRepository.create(comment2)
    await inMemoryQuestionCommentsRepository.create(comment3)

    const result = await sut.execute({
      questionId: 'any_question_id',
      page: 1,
    })

    expect(result.value?.comments).toHaveLength(3)
    expect(result.value?.comments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          author: 'any_name',
          commentId: comment1.id,
        }),
        expect.objectContaining({
          author: 'any_name',
          commentId: comment2.id,
        }),
        expect.objectContaining({
          author: 'any_name',
          commentId: comment3.id,
        }),
      ]),
    )
  })

  it('should be able to fetch paginated question comments', async () => {
    const student = makeStudent({ name: 'any_name' })

    inMemoryStudentsRepository.items.push(student)

    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityID('any_question_id'),
          authorId: student.id,
        }),
      )
    }

    const result = await sut.execute({
      questionId: 'any_question_id',
      page: 2,
    })

    expect(result.value?.comments).toHaveLength(2)
  })
})
