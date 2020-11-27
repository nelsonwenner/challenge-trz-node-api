import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import SurvivorEntity from './Survivor';

@Entity('inventories')
export default class InventoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToOne(() => SurvivorEntity, (survivor) => survivor.location)
  @JoinColumn()
  survivor!: SurvivorEntity;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
