import { Controller, Get, Post, Query } from '@nestjs/common';
import { AttendanceService } from '../service/attendance.service';
import { User } from 'src/auth/decorator/user.decorator';
import { AttendanceTypeDto } from '../dto/attendance-type.dto';

@Controller('attendance')
export class AttendanceController {
    constructor(private readonly attendanceService: AttendanceService) {

    }

    @Post('attend')
    async attend(@User() user: any, @Query('type-id') typeId: number = 1){
        return this.attendanceService.attend(typeId, user);
    }

    @Get('types')
    getAttendanceTypes(): AttendanceTypeDto[] {
        return this.attendanceService.getAttendanceTypes();
    }

    @Get('last-attendace')
    async lastUserAttendance(@User() user: any){
        return this.attendanceService.getLastAttendance(user);
    }
}
