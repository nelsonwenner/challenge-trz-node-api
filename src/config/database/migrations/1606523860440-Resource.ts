import {
  MigrationInterface,
  TableForeignKey,
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
            name: 'quantity',
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
      'resources',
      new TableColumn({
        name: 'inventoryId',
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

    await queryRunner.createForeignKey(
      'resources',
      new TableForeignKey({
        columnNames: ['inventoryId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'inventories',
        name: 'ResourceInventory',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      })
    );

    await queryRunner.createForeignKey(
      'resources',
      new TableForeignKey({
        columnNames: ['itemId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'items',
        name: 'ResourceItem',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      })
    );

    await queryRunner.createUniqueConstraint(
      'resources',
      new TableUnique({
        name: 'UniquePairOfResource',
        columnNames: ['inventoryId', 'itemId'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('resources', 'ResourceInventory');
    await queryRunner.dropForeignKey('resources', 'ResourceItem');
    await queryRunner.dropUniqueConstraint('resources', 'UniquePairOfResource');
    await queryRunner.dropColumn('resources', 'inventoryId');
    await queryRunner.dropColumn('resources', 'itemId');
  }
}
