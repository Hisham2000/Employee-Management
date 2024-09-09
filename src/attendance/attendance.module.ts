import { AttendanceService } from './service/attendance.service';
import { AttendanceController } from './controller/attendance.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from 'src/entities/attendance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attendance])],
  providers: [
    AttendanceService,
  ],
  controllers: [
    AttendanceController,
  ]
})
export class AttendanceModule { }
