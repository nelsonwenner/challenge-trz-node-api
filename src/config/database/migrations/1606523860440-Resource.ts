import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableUnique,
  Table,
} from 'typeorm';

export class Resource1606523860440 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'resources',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    );

    await queryRunner.addColumn(
      'resources',
      new TableColumn({
        name: 'repositoryId',
        type: 'uuid',
      })
    );

    await queryRunner.addColumn(
      'resources',
      new TableColumn({
        name: 'itemId',
        type: 'uuid',
      })
    );

    await queryRunner.createUniqueConstraint(
      'resources',
      new TableUnique({
        name: 'UniquePairOfResource',
        columnNames: ['repositoryId', 'itemId'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropUniqueConstraint('resources', 'UniquePairOfResource');
    await queryRunner.dropColumn('resources', 'repositoryId');
    await queryRunner.dropColumn('resources', 'itemId');
  }
}
