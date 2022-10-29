import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateBatchesTable1662730848574 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

        await queryRunner.createTable(
            new Table({
                name: 'batches',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isGenerated: true,
                        generationStrategy: 'uuid',
                        isPrimary: true,
                        isUnique: true,
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'idOfUserThatMadeLastChange',
                        type: 'uuid',
                    },
                    {
                        name: 'animal',
                        type: 'smallint',
                    },
                    {
                        name: 'creationDate',
                        type: 'timestamp with time zone',
                    },
                    {
                        name: 'endingDate',
                        type: 'timestamp with time zone',
                        isNullable: true,
                        default: null,
                    },
                    {
                        name: 'race',
                        type: 'varchar',
                    },
                    {
                        name: 'city',
                        type: 'varchar',
                    },
                    {
                        name: 'state',
                        type: 'varchar',
                    },
                    {
                        name: 'companyId',
                        type: 'uuid',
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
                foreignKeys: [
                    {
                        referencedTableName: 'companies',
                        columnNames: ['companyId'],
                        referencedColumnNames: ['id'],
                        onUpdate: 'RESTRICT',
                        onDelete: 'CASCADE',
                    },
                    {
                        referencedTableName: 'users',
                        columnNames: ['idOfUserThatMadeLastChange'],
                        referencedColumnNames: ['id'],
                        onUpdate: 'RESTRICT',
                        onDelete: 'RESTRICT',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('batches');
    }
}
