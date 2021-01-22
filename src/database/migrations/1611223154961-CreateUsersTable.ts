import { query } from 'express';
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1611223154961 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        {
          name: 'email',
          isNullable: false,
          type: 'varchar',
        },
        {
          name: 'password',
          isNullable: false,
          type: 'varchar',
        },
        {
          name: 'created_at',
          type: 'date',
          default: 'CURRENT_DATE',
          isNullable: false
        }
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
    await queryRunner.query('DROP EXTENSION "uuid-ossp"');
  }

}
