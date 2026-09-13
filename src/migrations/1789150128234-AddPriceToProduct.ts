import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPriceToProduct1789150128234 implements MigrationInterface {
  name = 'AddPriceToProduct1789150128234';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`audit_logs\` (\`id\` int NOT NULL AUTO_INCREMENT, \`action\` enum ('CREATE', 'UPDATE', 'DELETE') NOT NULL, \`entityType\` enum ('BRAND', 'CATEGORY', 'PRODUCT', 'USER', 'ORDER') NOT NULL, \`entityId\` int NOT NULL, \`oldValues\` json NULL, \`newValues\` json NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`password\` varchar(500) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD \`price\` decimal(10,2) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_151b79a83ba240b0cb31b2302d1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` CHANGE \`userId\` \`userId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`phoneNumber\` \`phoneNumber\` varchar(80) NULL`,
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
      `ALTER TABLE \`products\` CHANGE \`categoryId\` \`categoryId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` CHANGE \`brandId\` \`brandId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`brands\` CHANGE \`logo\` \`logo\` varchar(200) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_151b79a83ba240b0cb31b2302d1\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_151b79a83ba240b0cb31b2302d1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`brands\` CHANGE \`logo\` \`logo\` varchar(200) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` CHANGE \`brandId\` \`brandId\` int NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` CHANGE \`categoryId\` \`categoryId\` int NULL DEFAULT 'NULL'`,
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
      `ALTER TABLE \`users\` CHANGE \`phoneNumber\` \`phoneNumber\` varchar(80) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_151b79a83ba240b0cb31b2302d1\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`price\``);
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`password\``);
    await queryRunner.query(`DROP TABLE \`audit_logs\``);
  }
}
