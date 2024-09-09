import { DataSource, DataSourceOptions } from "typeorm";
import * as process from "node:process";
import { Role } from "./src/entities/role.entity";
import { User } from "./src/entities/user.entity";
import { config as dotenvConfig } from 'dotenv';
import { registerAs } from '@nestjs/config';

dotenvConfig({ path: '.env' });

const config = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: `${process.env.DATABASE_PASSWORD}`,
  database: process.env.DATABASE_NAME,
  migrations: ['migrations/**'],
  entities: [Role, User],
  synchronous: true
};

export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions);
