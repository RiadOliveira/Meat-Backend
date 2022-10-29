import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class CreateForeignProducerIdInCompanies1662730765616
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'companies',
            new TableForeignKey({
                columnNames: ['producerId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onUpdate: 'RESTRICT',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('companies', 'producerId');
    }
}
