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
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'latitude',
            type: 'float',
          },
          {
            name: 'longitude',
            type: 'float',
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
        type: 'uuid',
      })
    );

    await queryRunner.createForeignKey(
      'locations',
      new TableForeignKey({
        columnNames: ['survivorId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'survivors',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('locations', 'survivorId');
    await queryRunner.dropColumn('locations', 'survivorId');
  }
}
