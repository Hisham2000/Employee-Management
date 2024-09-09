import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role.entity';
import { Exclude } from 'class-transformer';
import { Attendance } from './attendance.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;
  @Column({ nullable: false, unique: true })
  email: string;
  @Column({ nullable: false })
  @Exclude()
  password: string;
  @Column({ nullable: false })
  salary: number;
  @ManyToOne(() => Role, (role) => role.users, {nullable: false})
  @JoinColumn({ name: 'roleId' })
  role: Role;

  @ManyToOne(() => User, (user) => user.managedUsers, { nullable: true })
  @JoinColumn({ name: 'managerId' })
  manager: User;

  @OneToMany(() => User, (user) => user.manager)
  managedUsers: User[];

  @OneToMany(() => Attendance, attendance => attendance.user)
  attendances: Attendance[];
}
