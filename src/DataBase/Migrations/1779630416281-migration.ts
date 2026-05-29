import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1779630416281 implements MigrationInterface {
    name = 'Migration1779630416281'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("uuid" character varying NOT NULL, "name" character varying NOT NULL, "cpf" character varying NOT NULL, "contact" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_951b8f1dfc94ac1d0301a14b7e1" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "vehicles" ("uuid" character varying NOT NULL, "owner_id" character varying NOT NULL, "licensePlate" character varying NOT NULL, "renavam" character varying NOT NULL, "model" character varying NOT NULL, "state" character varying NOT NULL, "city" character varying NOT NULL, CONSTRAINT "PK_44081a0503cec549614d57eba9a" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "occurrences" ("uuid" character varying NOT NULL, "vehicle_id" character varying NOT NULL, "status" character varying NOT NULL, "date_occurrence" TIMESTAMP NOT NULL, "bo_number" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_36c33ba6025e2a92c7d3fe0b51a" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`ALTER TABLE "vehicles" ADD CONSTRAINT "FK_490a6fd6eb12a0a64e87b534dd9" FOREIGN KEY ("owner_id") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "occurrences" ADD CONSTRAINT "FK_6fd06bf8684c15dfb4c2d4e7c9a" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "occurrences" DROP CONSTRAINT "FK_6fd06bf8684c15dfb4c2d4e7c9a"`);
        await queryRunner.query(`ALTER TABLE "vehicles" DROP CONSTRAINT "FK_490a6fd6eb12a0a64e87b534dd9"`);
        await queryRunner.query(`DROP TABLE "occurrences"`);
        await queryRunner.query(`DROP TABLE "vehicles"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
