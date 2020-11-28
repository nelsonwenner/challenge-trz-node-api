import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSeedItem1606624160550 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('items')
      .values([
        {
          id: 'e1182700-d1b0-4585-99bf-6510497602ab',
          name: 'Fiji Water',
          value: 14,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'e2056800-d7b2-4241-88bf-3211757351ab',
          name: 'Campbell Soup',
          value: 12,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'e3045700-d1b1-3341-78bf-5111269121ab',
          name: 'First Aid Pouch',
          value: 10,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'e4024300-d7b7-1253-60bf-6212457358ab',
          name: 'AK47',
          value: 8,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('items');
  }
}
