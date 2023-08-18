import { cmdentity } from 'src/chatgpt/command.entity';
import { AfterInsert, AfterRemove, AfterUpdate, Entity, Column, PrimaryGeneratedColumn,OneToMany } from 'typeorm';


@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string; 

    @Column()
    password: string; 

    // @Column({ default: true })
    // admin: boolean;

    @OneToMany(() => cmdentity, (cmd) => cmd.user)
    history: cmdentity[];


    @AfterInsert()
    logInsert() {
        console.log('Inserted User with Id', this.id)
    }
    @AfterUpdate()
    logUpdate() {
        console.log('Updated user with Id', this.id);
    }
    @AfterRemove() 
    logRemove() {
        console.log('User Removed!!!')
    }
}