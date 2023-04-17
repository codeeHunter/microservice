import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDB1681479796611 implements MigrationInterface {
    name = 'InitDB1681479796611'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "name" TO "firstName"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "firstName" TO "name"`);
    }

}
