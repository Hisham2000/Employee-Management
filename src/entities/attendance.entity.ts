import { AttendanceType } from 'src/enums/attendance_type.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Attendance {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date' })
    day: Date;

    @Column({ type: 'time' })
    time: string;
    
    @Column({ type: 'enum', enum: AttendanceType })
    attendanceType: AttendanceType;

    @ManyToOne(() => User, user => user.attendances)
    user: User;

}
