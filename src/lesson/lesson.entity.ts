import { Entity, BaseEntity, Column, PrimaryColumn, ObjectIdColumn } from "typeorm";

@Entity()
export class Lesson extends BaseEntity {

    // Required for MongoDB
    @ObjectIdColumn() 
    _id: string

    @PrimaryColumn() 
    id: string;
    
    @Column()
    name: string;
    
    @Column()
    startDate: string; 

    @Column()
    endDate: string;

    @Column()
    students: Array<string>;
}