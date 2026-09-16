import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPasswordToCustomers1789531652063 implements MigrationInterface {
  name = 'AddPasswordToCustomers1789531652063';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`FK_151b79a83ba240b0cb31b2302d1\` ON \`orders\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`customers\` ADD \`password\` varchar(500) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`phoneNumber\` \`phoneNumber\` varchar(80) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`audit_logs\` DROP FOREIGN KEY \`FK_cfa83f61e4d27a87fcae1e025ab\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`audit_logs\` DROP COLUMN \`oldValues\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`audit_logs\` ADD \`oldValues\` json NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`audit_logs\` DROP COLUMN \`newValues\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`audit_logs\` ADD \`newValues\` json NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`audit_logs\` CHANGE \`userId\` \`userId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`categories\` CHANGE \`image\` \`image\` varchar(300) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_ff56834e735fa78a15d0cf21926\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_ea86d0c514c4ecbb5694cbf57df\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` CHANGE \`image\` \`image\` varchar(200) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` CHANGE \`categoryId\` \`categoryId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` CHANGE \`brandId\` \`brandId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`brands\` CHANGE \`logo\` \`logo\` varchar(200) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`audit_logs\` ADD CONSTRAINT \`FK_cfa83f61e4d27a87fcae1e025ab\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD CONSTRAINT \`FK_ff56834e735fa78a15d0cf21926\` FOREIGN KEY (\`categoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD CONSTRAINT \`FK_ea86d0c514c4ecbb5694cbf57df\` FOREIGN KEY (\`brandId\`) REFERENCES \`brands\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_ea86d0c514c4ecbb5694cbf57df\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_ff56834e735fa78a15d0cf21926\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`audit_logs\` DROP FOREIGN KEY \`FK_cfa83f61e4d27a87fcae1e025ab\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`brands\` CHANGE \`logo\` \`logo\` varchar(200) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` CHANGE \`brandId\` \`brandId\` int NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` CHANGE \`categoryId\` \`categoryId\` int NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` CHANGE \`image\` \`image\` varchar(200) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD CONSTRAINT \`FK_ea86d0c514c4ecbb5694cbf57df\` FOREIGN KEY (\`brandId\`) REFERENCES \`brands\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD CONSTRAINT \`FK_ff56834e735fa78a15d0cf21926\` FOREIGN KEY (\`categoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`categories\` CHANGE \`image\` \`image\` varchar(300) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`audit_logs\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`audit_logs\` DROP COLUMN \`newValues\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`audit_logs\` ADD \`newValues\` longtext CHARACTER SET "utf8mb4" COLLATE "utf8mb4_bin" NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`audit_logs\` DROP COLUMN \`oldValues\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`audit_logs\` ADD \`oldValues\` longtext CHARACTER SET "utf8mb4" COLLATE "utf8mb4_bin" NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`audit_logs\` ADD CONSTRAINT \`FK_cfa83f61e4d27a87fcae1e025ab\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`phoneNumber\` \`phoneNumber\` varchar(80) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`customers\` DROP COLUMN \`password\``,
    );
  }
}
