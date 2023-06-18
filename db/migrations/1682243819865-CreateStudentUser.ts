import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStudentUser1682243819865 implements MigrationInterface {
    name = 'CreateStudentUser1682243819865'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`student_user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`picture\` varchar(255) NULL, \`lastConnectedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP(), \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP(), UNIQUE INDEX \`IDX_073deaa49596fe9e480286399c\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_073deaa49596fe9e480286399c\` ON \`student_user\``);
        await queryRunner.query(`DROP TABLE \`student_user\``);
    }

}
