import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Attendance } from './attendance.entity';
import { Requests } from './requests.entity';

@Entity()
export class RequestType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  name: string;

  @OneToMany(() => Requests, requests => requests.requestType)
  requests: Requests[];
}