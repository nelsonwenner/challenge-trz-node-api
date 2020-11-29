import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import SurvivorEntity from './Survivor';

@Entity('flags')
export default class FlagEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => SurvivorEntity)
  @JoinColumn()
  sender!: SurvivorEntity;

  @ManyToOne(() => SurvivorEntity)
  @JoinColumn()
  target!: SurvivorEntity;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
