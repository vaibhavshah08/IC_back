import { UserEntity } from "src/users/user.entity";
import { PrimaryGeneratedColumn, Column, ManyToOne, Entity, CreateDateColumn, JoinColumn } from "typeorm";

@Entity()
export class cmdentity{
    @PrimaryGeneratedColumn()
    projectid: number;

    @Column()
    project_name:string;

    @Column()
    location:string;
    
    @Column()
    prompt: string;

    @Column()
    response: string;

    @Column()
    commands: string;

    @Column()
    timestamp:string;

    @Column()
    userId: number;

    @ManyToOne(() => UserEntity, user => user.history)
    @JoinColumn({ name: 'Id' }) // Foreign key column in cmdentity table
    user: UserEntity;



}