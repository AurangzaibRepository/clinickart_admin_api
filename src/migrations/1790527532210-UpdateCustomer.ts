import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCustomer1790527532210 implements MigrationInterface {
  name = 'UpdateCustomer1790527532210';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`customers\` DROP COLUMN \`firstName\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`customers\` DROP COLUMN \`lastName\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`customers\` ADD \`name\` varchar(200) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`customers\` ADD \`city\` varchar(100) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`customers\` DROP COLUMN \`city\``);
    await queryRunner.query(`ALTER TABLE \`customers\` DROP COLUMN \`name\``);
    await queryRunner.query(
      `ALTER TABLE \`customers\` ADD \`lastName\` varchar(100) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`customers\` ADD \`firstName\` varchar(100) NOT NULL`,
    );
  }
}
