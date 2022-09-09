import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateVaccinationsTable1662731173437
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

        await queryRunner.createTable(
            new Table({
                name: 'vaccinations',
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
                        name: 'vaccinationBatch',
                        type: 'varchar',
                    },
                    {
                        name: 'batchId',
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
                        referencedTableName: 'batches',
                        columnNames: ['batchId'],
                        referencedColumnNames: ['id'],
                        onUpdate: 'RESTRICT',
                        onDelete: 'CASCADE',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('vaccinations');
    }
}
