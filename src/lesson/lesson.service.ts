import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Lesson } from './lesson.entity';
import { CreateLessonInput } from './lesson.input';
import { AssignStudentsToLessonInput } from './assign-students.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>,
  ) {}

  public async getAllLessons(): Promise<Array<Lesson>> {
    return this.lessonRepository.find();
  }

  public async getLessonById(id: string): Promise<Lesson> {
    return this.lessonRepository.findOne({ id });
  }

  public async createLesson(
    createLessonInput: CreateLessonInput,
  ): Promise<Lesson> {
    const { name, startDate, endDate, students } = createLessonInput;
    const lesson = this.lessonRepository.create({
      id: uuid(),
      name,
      startDate,
      endDate,
      students: students,
    });

    return this.lessonRepository.save(lesson);
  }

  public async assignStudentsToLesson(
    assignStudentsToLessonInput: AssignStudentsToLessonInput,
  ): Promise<Lesson> {
    const { lessonId, studentIds } = assignStudentsToLessonInput;
    const lesson = await this.lessonRepository.findOne({ id: lessonId });
    lesson.students = [...lesson.students, ...studentIds]; // Array appending, Does not filter duplicates!
    return this.lessonRepository.save(lesson);
  }
}
