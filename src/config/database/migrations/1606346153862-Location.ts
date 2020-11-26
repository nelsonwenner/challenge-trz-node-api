import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class Location1606346153862 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'locations',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'latitude',
            type: 'int',
          },
          {
            name: 'longitude',
            type: 'int',
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
      'locations',
      new TableColumn({
        name: 'survivorId',
        type: 'varchar',
      })
    );

    await queryRunner.createForeignKey(
      'locations',
      new TableForeignKey({
        columnNames: ['survivorId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'survivors',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('locations');
  }
}