import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateclinicRequest1790593682035 implements MigrationInterface {
  name = 'UpdateclinicRequest1790593682035';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`clinic-requests\` CHANGE \`description\` \`description\` text NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`clinic-requests\` CHANGE \`description\` \`description\` text NOT NULL`,
    );
  }
}
