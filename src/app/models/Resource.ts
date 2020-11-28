import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import InventoryEntity from './Inventory';
import ItemEntity from './Item';

@Entity('resources')
export default class ResourceEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => InventoryEntity, (inventory) => inventory.resource)
  @JoinColumn()
  inventory!: InventoryEntity;

  @ManyToOne(() => ItemEntity, (item) => item.resource)
  @JoinColumn()
  item!: ItemEntity;

  @Column()
  quantity!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
