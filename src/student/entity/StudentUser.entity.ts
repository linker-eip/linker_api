import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class StudentUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true, nullable: false})
    email: string;

    @Column({nullable: false})
    password: string;

    @Column({type: "varchar", length: 255, nullable: false})
    firstName: string;

    @Column({type: "varchar", length: 255, nullable: false})
    lastName: string;

    @Column({type: "varchar", length: 255, nullable: true})
    picture: string;

    @Column({default: true})
    isActive: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    lastConnectedAt: Date

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date

    @Column({ type: 'varchar', nullable: true})
    resetPasswordToken: string;
}