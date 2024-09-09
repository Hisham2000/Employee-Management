import { MigrationInterface, QueryRunner } from 'typeorm';

export class Role1725794786870 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO role (name) VALUES
      ('HR'),
      ('Admin'),
      ('Manager'),
      ('User');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM role
      WHERE name IN ('HR', 'Admin', 'User');
    `);
  }

}
