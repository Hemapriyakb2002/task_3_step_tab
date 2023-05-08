import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUsersTable1682417240527 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'users',
              columns: [
                {
                  name: 'id',
                  type: 'int',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
                },
                {
                  name: 'name',
                  type: 'varchar',
                },
                {
                  name: 'email',
                  type: 'varchar',
                  isUnique: true,
                },
                {
                  name: 'phone',
                  type: 'varchar',
                  isUnique: true,
                },
              ],
            }),
            true,
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}
