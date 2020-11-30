import {
  MigrationInterface,
  TableForeignKey,
  QueryRunner,
  TableColumn,
  TableUnique,
  Table,
} from 'typeorm';

export class Flag1606671306341 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'flags',
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
      'flags',
      new TableColumn({
        name: 'senderId',
        type: 'uuid',
      })
    );

    await queryRunner.addColumn(
      'flags',
      new TableColumn({
        name: 'targetId',
        type: 'uuid',
      })
    );

    await queryRunner.createForeignKey(
      'flags',
      new TableForeignKey({
        columnNames: ['senderId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'survivors',
        name: 'SenderFlag',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      })
    );

    await queryRunner.createForeignKey(
      'flags',
      new TableForeignKey({
        columnNames: ['targetId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'survivors',
        name: 'TargetFlag',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      })
    );

    await queryRunner.createUniqueConstraint(
      'flags',
      new TableUnique({
        name: 'UniquePairOfFlag',
        columnNames: ['senderId', 'targetId'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('flags', 'SenderFlag');
    await queryRunner.dropForeignKey('flags', 'TargetFlag');
    await queryRunner.dropUniqueConstraint('flags', 'UniquePairOfFlag');
    await queryRunner.dropColumn('flags', 'senderId');
    await queryRunner.dropColumn('flags', 'targetId');
  }
}
