import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  AfterInsert,
  getRepository,
} from 'typeorm';
import { FlagRepository } from '../repositories/FlagRepository';
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

  @AfterInsert()
  async afterCreate() {
    const amountFlagsTarget = await FlagRepository.countFlags(this.target);

    if (amountFlagsTarget === 5) {
      const survivorRepository = getRepository(SurvivorEntity);
      this.target.infected = true;
      await survivorRepository.save(this.target);
    }
  }
}
