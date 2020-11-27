import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import InventoryEntity from './Inventory';
import LocationEntity from './Location';

@Entity('survivors')
export default class SurvivorEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ default: false })
  infected!: boolean;

  @Column()
  age!: number;

  @Column()
  sex!: string;

  @OneToOne(() => InventoryEntity, (inventory) => inventory.survivor)
  inventory!: InventoryEntity;

  @OneToOne(() => LocationEntity, (location) => location.survivor)
  location!: LocationEntity;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}

/**
 * @JoinColumn: We just made our relationship bidirectional. Notice,
 * the inverse relationship does not have an @JoinColumn. @JoinColum
 * must be on only one side of the relationship - at the table that
 * will hold the foreign key.
 */
