import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBrandRatings1790745121791 implements MigrationInterface {
  name = 'AddBrandRatings1790745121791';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`brand_ratings\` (\`id\` int NOT NULL AUTO_INCREMENT, \`rating\` decimal(6,2) NOT NULL, \`brandId\` int NULL, \`customerId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`brands\` ADD \`average_rating\` decimal(6,2) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`brand_ratings\` ADD CONSTRAINT \`FK_0744a48a037e86ad67ae5c95188\` FOREIGN KEY (\`brandId\`) REFERENCES \`brands\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`brand_ratings\` ADD CONSTRAINT \`FK_f91e4aed90f017e05776c526188\` FOREIGN KEY (\`customerId\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`brand_ratings\` DROP FOREIGN KEY \`FK_f91e4aed90f017e05776c526188\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`brand_ratings\` DROP FOREIGN KEY \`FK_0744a48a037e86ad67ae5c95188\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`brands\` DROP COLUMN \`average_rating\``,
    );
    await queryRunner.query(`DROP TABLE \`brand_ratings\``);
  }
}
