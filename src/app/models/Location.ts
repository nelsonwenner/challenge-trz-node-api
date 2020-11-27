import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import SurvivorEntity from './Survivor';

@Entity('locations')
export class LocationEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToOne(() => SurvivorEntity)
  @JoinColumn()
  survivor!: SurvivorEntity;

  @Column()
  latitude!: number;

  @Column()
  longitude!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
