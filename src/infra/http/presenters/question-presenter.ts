import { Question } from '~/domain/forum/enterprise/entities/question'

export class QuestionPresenter {
  static toHttp(question: Question) {
    return {
      id: question.id.toString(),
      title: question.title,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    }
  }
}
