import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { StudentType } from './student.type';
import { StudentService } from './student.service';
import { CreateStudentInput } from './create-student.input';
import { Student } from './student.entity';
import { Query } from "@nestjs/graphql";
import { NotFoundException } from "@nestjs/common";

@Resolver(of => StudentType)
export class StudentResolver {

    constructor(
        private studentService: StudentService
    ) {}

    @Query(returns => StudentType)
    public async student(@Args('id') id: string): Promise<Student> {
        return await this.studentService.getStudentById(id);
    }

    @Query(returns => [StudentType])
    public async students(): Promise<Array<Student>> {
        return await this.studentService.getAllStudents();
    }

    @Mutation(returns => StudentType)
    public async createStudent(@Args('createStudentInput') createStudentInput: CreateStudentInput): Promise<Student> {
        return await this.studentService.createStudent(createStudentInput);
    }
}