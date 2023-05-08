import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm"

export class UpdatedUserTable1683266727091 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('users', [
            new TableColumn({
                name: 'address',
                type: 'varchar'
            }),
            new TableColumn({
                name: 'password',
                type: 'varchar',
            }),
            new TableColumn({
                name: 'fileLink',
                type: 'varchar'
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}
