import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { LocationEntity } from './Location';

@Entity('survivors')
export class SurvivorEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  infected!: boolean;

  @Column()
  age!: number;

  @Column()
  sex!: string;

  @OneToOne(() => LocationEntity, (location) => location.survivor)
  location!: LocationEntity;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
