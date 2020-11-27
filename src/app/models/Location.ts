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
export default class LocationEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToOne(() => SurvivorEntity, (survivor) => survivor.location)
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

/**
 * @JoinColumn: it must be defined on only one side of the relationship
 * the side that must have the foreign key in the database table.
 */
