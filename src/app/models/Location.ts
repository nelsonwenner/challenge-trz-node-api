import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  Double,
} from 'typeorm';
import { SurvivorEntity } from './Survivor';

@Entity('locations')
export class LocationEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToOne(() => SurvivorEntity)
  @JoinColumn()
  survivor!: SurvivorEntity;

  @Column()
  latitude!: Double;

  @Column()
  longitude!: Double;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
