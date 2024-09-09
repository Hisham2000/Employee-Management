import { Module } from "@nestjs/common";
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtStrategy } from './auth/jwt-strategy';
import { ConfigModule } from '@nestjs/config';
import { CustomLogger } from "./custom-logger";
import { RoleModule } from './role/role.module';
import TypeOrmConfig from '../type-orm.config';
import { AttendanceModule } from './attendance/attendance.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [TypeOrmConfig] }),
    DatabaseModule,
    AuthModule,
    UserModule,
    RoleModule,
    AttendanceModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtStrategy,
    },
    CustomLogger,
  ],
  exports: []
})
export class AppModule {}
