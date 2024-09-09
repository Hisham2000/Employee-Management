import { BadRequestException, Injectable } from '@nestjs/common';
import { AttendanceTypeDto } from '../dto/attendance-type.dto';
import { AttendanceType } from 'src/enums/attendance_type.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from 'src/entities/attendance.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
  ) {
  }

  getAttendanceTypes(): AttendanceTypeDto[] {
    return Object.values(AttendanceType).filter(value => typeof value === 'number').map(type => ({
      name: AttendanceType[type],
      id: type,
    }));
  }

  async attend(attendanceTypeId: number, user: any) {
    const lastAttendance = await this.getLastAttendance(user);
    if (lastAttendance && attendanceTypeId == lastAttendance.attendanceType) {
      throw new BadRequestException('You Did This Operation Before');
    } else {
      if (attendanceTypeId == AttendanceType.SIGN_OUT || attendanceTypeId == AttendanceType.SIGN_IN) {
        const newAttendance = new Attendance();
        newAttendance.day = new Date();
        newAttendance.time = new Date().toLocaleTimeString();
        newAttendance.attendanceType = attendanceTypeId;
        newAttendance.user = user;
        return this.attendanceRepository.save(newAttendance);
      } else {
        throw new BadRequestException('Provide A Wrong Parameter that is type-id');
      }
    }
  }

  async getLastAttendance(user: any): Promise<Attendance | null> {
    return this.attendanceRepository.findOne({
      where: {
        user: { id: user.id },
        day: new Date(),
      },
      order: { time: 'DESC' },
    });
  }
}
