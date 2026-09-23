import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDeals1790152662233 implements MigrationInterface {
  name = 'AddDeals1790152662233';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`deals\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`description\` text NOT NULL, \`image\` varchar(300) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`deal_tags\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`dealId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`deal_tags\` ADD CONSTRAINT \`FK_e74a6259757b53c870f8bcf345c\` FOREIGN KEY (\`dealId\`) REFERENCES \`deals\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`deal_tags\` DROP FOREIGN KEY \`FK_e74a6259757b53c870f8bcf345c\``,
    );
    await queryRunner.query(`DROP TABLE \`deal_tags\``);
    await queryRunner.query(`DROP TABLE \`deals\``);
  }
}
