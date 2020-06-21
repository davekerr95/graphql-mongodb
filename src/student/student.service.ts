import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Student } from './student.entity';
import { CreateStudentInput } from './create-student.input';

@Injectable()
export class StudentService {
    
    constructor(
        @InjectRepository(Student) private studentRepository: Repository<Student>
    ) {}

    public async getStudentById(id: string): Promise<Student> {
        const result = this.studentRepository.findOne({ id });
        return result;
    }

    public async getStudentsByIds(studentIds: Array<string>): Promise<Array<Student>> {
        return this.studentRepository.find({
            where: {
                id: {
                    $in: studentIds,
                }
            }
        })
    }

    public async getAllStudents(): Promise<Array<Student>> {
        const results = this.studentRepository.find();
        return results;
    }

    public async createStudent(createStudentInput: CreateStudentInput): Promise<Student> {
        const { firstName, lastName } = createStudentInput;
        const result = this.studentRepository.create({ 
            id: uuid(),
            firstName, 
            lastName 
        });
        
        result.save();
        return result;
    }

}
