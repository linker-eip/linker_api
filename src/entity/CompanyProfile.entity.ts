import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CompanyProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  size: number;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  activity: string;

  @Column({ nullable: true })
  speciality: string;

  @Column({ nullable: true })
  website: string;
}

