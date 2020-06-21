import { InputType, Field, ID } from "@nestjs/graphql";
import { MinLength, IsDateString, IsUUID } from 'class-validator';


// InputType's are a GraphQL concept.
@InputType() 
export class CreateLessonInput {
    @MinLength(1)
    @Field()
    name: string
    
    @IsDateString()
    @Field()
    startDate: string

    @IsDateString()
    @Field()
    endDate: string

    @IsUUID("4", { each: true })
    @Field(() => [ID], { defaultValue: [] })
    students: Array<string>
}