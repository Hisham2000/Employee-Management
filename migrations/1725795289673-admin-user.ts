import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class AdminUser1725795289673 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const hashedPassword = await bcrypt.hash('123456789', 10);
    const result = await queryRunner.query(`
      SELECT id FROM role WHERE name = 'Admin'
    `);
    const roleId = result[0]?.id;
    if (roleId) {
      await queryRunner.query(`
          INSERT INTO users (name, email, password, salary, "roleId")
          VALUES ('Admin Admin', 'admin@mint-ops.com', '${hashedPassword}', 12345, ${roleId});
      `);
    } else {
      throw new Error('Role ID for Admin not found');
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE
        FROM users
        WHERE email = 'admin@mint-ops.com';
    `);
  }

}
