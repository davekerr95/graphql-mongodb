import { ObjectType, Field, ID } from "@nestjs/graphql";
import { StudentType } from "src/student/student.type";

// Explicitly declaring the GraphQL Type name instead of using Class name

@ObjectType('Lesson')
export class LessonType {

    // Explicitly declaring the GraphQL type
    @Field(type => ID) 
    id: string;
    
    @Field()
    name: string;
    
    // ISO DateString instead of Date
    @Field()
    startDate: string; 

    @Field()
    endDate: string;

    @Field(type => [StudentType])
    students: Array<string>
}
