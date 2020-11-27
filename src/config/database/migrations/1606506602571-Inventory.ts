import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class Inventory1606506602571 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'inventories',
        columns: [
          {
            name: 'id',
            type: 'varchar',
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
      'inventories',
      new TableColumn({
        name: 'survivorId',
        type: 'varchar',
      })
    );

    await queryRunner.createForeignKey(
      'inventories',
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
    await queryRunner.dropForeignKey('inventories', 'survivorId');
    await queryRunner.dropColumn('inventories', 'survivorId');
  }
}
