import { MigrationInterface, QueryRunner } from "typeorm";

export class CompanyUserUpdate1684105624952 implements MigrationInterface {
    name = 'CompanyUserUpdate1684105624952'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_62e869bfb6b6e7e46cedc267dd\` ON \`company_user\``);
        await queryRunner.query(`ALTER TABLE \`company_user\` DROP COLUMN \`firstName\``);
        await queryRunner.query(`ALTER TABLE \`company_user\` DROP COLUMN \`lastName\``);
        await queryRunner.query(`ALTER TABLE \`company_user\` ADD \`phoneNumber\` varchar(13) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`company_user\` DROP COLUMN \`phoneNumber\``);
        await queryRunner.query(`ALTER TABLE \`company_user\` ADD \`lastName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`company_user\` ADD \`firstName\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_62e869bfb6b6e7e46cedc267dd\` ON \`company_user\` (\`profileId\`)`);
    }

}
