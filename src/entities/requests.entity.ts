import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AttendanceType } from '../enums/attendance_type.enum';
import { RequestStatusEnum } from '../enums/request-status.enum';
import { User } from './user.entity';
import { RequestType } from './request-type.entity';

export class Requests{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  reason: string;

  @Column({nullable: false, name: 'from_date'})
  fromDate: Date;


  @Column({nullable: false, name: 'to_date'})
  toDate: Date;

  @Column({ type: 'enum', enum: RequestStatusEnum })
  attendanceType: RequestStatusEnum;

  @ManyToOne(() => User, user => user.requests)
  user: User;

  @ManyToOne(() => RequestType, requestType => requestType.requests)
  requestType: RequestType;
}