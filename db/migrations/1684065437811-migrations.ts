import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1684065437811 implements MigrationInterface {
    name = 'Migrations1684065437811'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`company_profile\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NULL, \`description\` varchar(255) NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NULL, \`address\` varchar(255) NULL, \`size\` int NULL, \`location\` varchar(255) NULL, \`activity\` varchar(255) NULL, \`speciality\` varchar(255) NULL, \`website\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`company_user\` ADD \`profileId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`company_user\` ADD UNIQUE INDEX \`IDX_62e869bfb6b6e7e46cedc267dd\` (\`profileId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_62e869bfb6b6e7e46cedc267dd\` ON \`company_user\` (\`profileId\`)`);
        await queryRunner.query(`ALTER TABLE \`company_user\` ADD CONSTRAINT \`FK_62e869bfb6b6e7e46cedc267dd4\` FOREIGN KEY (\`profileId\`) REFERENCES \`company_profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`company_user\` DROP FOREIGN KEY \`FK_62e869bfb6b6e7e46cedc267dd4\``);
        await queryRunner.query(`DROP INDEX \`REL_62e869bfb6b6e7e46cedc267dd\` ON \`company_user\``);
        await queryRunner.query(`ALTER TABLE \`company_user\` DROP INDEX \`IDX_62e869bfb6b6e7e46cedc267dd\``);
        await queryRunner.query(`ALTER TABLE \`company_user\` DROP COLUMN \`profileId\``);
        await queryRunner.query(`DROP TABLE \`company_profile\``);
    }

}
