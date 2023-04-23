import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCompanyUser1682246901200 implements MigrationInterface {
    name = 'CreateCompanyUser1682246901200'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`company_user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`companyName\` varchar(255) NOT NULL, \`picture\` varchar(255) NULL, \`companyPicture\` varchar(255) NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`lastConnectedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP(), \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP(), UNIQUE INDEX \`IDX_71317b70f843581c2913b1cee4\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_71317b70f843581c2913b1cee4\` ON \`company_user\``);
        await queryRunner.query(`DROP TABLE \`company_user\``);
    }

}
