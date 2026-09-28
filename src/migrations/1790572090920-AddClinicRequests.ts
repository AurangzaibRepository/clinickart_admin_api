import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddClinicRequests1790572090920 implements MigrationInterface {
  name = 'AddClinicRequests1790572090920';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`FK_cfa83f61e4d27a87fcae1e025ab\` ON \`audit_logs\``,
    );
    await queryRunner.query(
      `DROP INDEX \`FK_e5de51ca888d8b1f5ac25799dd1\` ON \`orders\``,
    );
    await queryRunner.query(
      `CREATE TABLE \`clinic-requests\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`clinicName\` varchar(100) NOT NULL, \`phoneNumber\` varchar(100) NOT NULL, \`city\` varchar(100) NOT NULL, \`package\` varchar(100) NOT NULL, \`description\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`phoneNumber\` \`phoneNumber\` varchar(80) NULL`,
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
      `ALTER TABLE \`orders\` CHANGE \`customerId\` \`customerId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_items\` DROP FOREIGN KEY \`FK_f1d359a55923bb45b057fbdab0d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_items\` DROP FOREIGN KEY \`FK_cdb99c05982d5191ac8465ac010\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_items\` CHANGE \`orderId\` \`orderId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_items\` CHANGE \`productId\` \`productId\` int NULL`,
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
      `ALTER TABLE \`deal_tags\` DROP FOREIGN KEY \`FK_e74a6259757b53c870f8bcf345c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`deal_tags\` CHANGE \`dealId\` \`dealId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`audit_logs\` ADD CONSTRAINT \`FK_cfa83f61e4d27a87fcae1e025ab\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_e5de51ca888d8b1f5ac25799dd1\` FOREIGN KEY (\`customerId\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_items\` ADD CONSTRAINT \`FK_f1d359a55923bb45b057fbdab0d\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_items\` ADD CONSTRAINT \`FK_cdb99c05982d5191ac8465ac010\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD CONSTRAINT \`FK_ff56834e735fa78a15d0cf21926\` FOREIGN KEY (\`categoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD CONSTRAINT \`FK_ea86d0c514c4ecbb5694cbf57df\` FOREIGN KEY (\`brandId\`) REFERENCES \`brands\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`deal_tags\` ADD CONSTRAINT \`FK_e74a6259757b53c870f8bcf345c\` FOREIGN KEY (\`dealId\`) REFERENCES \`deals\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`deal_tags\` DROP FOREIGN KEY \`FK_e74a6259757b53c870f8bcf345c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_ea86d0c514c4ecbb5694cbf57df\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_ff56834e735fa78a15d0cf21926\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_items\` DROP FOREIGN KEY \`FK_cdb99c05982d5191ac8465ac010\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_items\` DROP FOREIGN KEY \`FK_f1d359a55923bb45b057fbdab0d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_e5de51ca888d8b1f5ac25799dd1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`audit_logs\` DROP FOREIGN KEY \`FK_cfa83f61e4d27a87fcae1e025ab\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`deal_tags\` CHANGE \`dealId\` \`dealId\` int NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`deal_tags\` ADD CONSTRAINT \`FK_e74a6259757b53c870f8bcf345c\` FOREIGN KEY (\`dealId\`) REFERENCES \`deals\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE \`order_items\` CHANGE \`productId\` \`productId\` int NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_items\` CHANGE \`orderId\` \`orderId\` int NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_items\` ADD CONSTRAINT \`FK_cdb99c05982d5191ac8465ac010\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_items\` ADD CONSTRAINT \`FK_f1d359a55923bb45b057fbdab0d\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` CHANGE \`customerId\` \`customerId\` int NULL DEFAULT 'NULL'`,
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
      `ALTER TABLE \`users\` CHANGE \`phoneNumber\` \`phoneNumber\` varchar(80) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`createdAt\``);
    await queryRunner.query(`DROP TABLE \`clinic-requests\``);
    await queryRunner.query(
      `CREATE INDEX \`FK_e5de51ca888d8b1f5ac25799dd1\` ON \`orders\` (\`customerId\`)`,
    );
    await queryRunner.query(
      `CREATE INDEX \`FK_cfa83f61e4d27a87fcae1e025ab\` ON \`audit_logs\` (\`userId\`)`,
    );
  }
}
