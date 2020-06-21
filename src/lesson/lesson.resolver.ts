import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { CreateLessonInput } from './lesson.input';
import { AssignStudentsToLessonInput } from './assign-students.input';
import { Lesson } from './lesson.entity';
import { StudentService } from 'src/student/student.service';

// GrqphQL resolvers are equivilant to our REST controllers.
// This Resolver resolves Lessons

@Resolver(of => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
    ) {}

  // The Query functions name will be the query function in GraphQL so best to name it the entity.
  // Mutations should be called by what the do!
  @Query(returns => LessonType)
  public async lesson(@Args('id') id: string) {
    const result = await this.lessonService.getLessonById(id);
    return result;
  }

  // Query Decorator cannot use Array<A> or A[] it must use [A]
  @Query(returns => [LessonType])
  public async lessons() {
    return await this.lessonService.getAllLessons();
  }

  @Mutation(returns => LessonType)
  public async createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    const result = await this.lessonService.createLesson(createLessonInput);
    return result;
  }

  @Mutation(returns => LessonType)
  public async assignStudentsToLesson(
    @Args('assignStudentsToLesson')
    assignStudentsToLessonInput: AssignStudentsToLessonInput,
  ) {
    return await this.lessonService.assignStudentsToLesson(
      assignStudentsToLessonInput,
    );
  }

  @ResolveField()
  public async students(@Parent() lesson: Lesson) {
    return await this.studentService.getStudentsByIds(lesson.students);
  }
}
