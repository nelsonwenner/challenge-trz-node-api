import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import SurvivorEntity from './Survivor';
import ResourceEntity from './Resource';

@Entity('inventories')
export default class InventoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => SurvivorEntity, (survivor) => survivor.inventory)
  @JoinColumn()
  survivor: SurvivorEntity;

  @OneToMany(() => ResourceEntity, (resource) => resource.inventory)
  resource: ResourceEntity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
