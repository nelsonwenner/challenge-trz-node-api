import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Column,
} from 'typeorm';
import ResourceEntity from './Resource';

@Entity('items')
export default class ItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToMany(() => ResourceEntity, (resource) => resource.item)
  resource!: ResourceEntity;

  @Column()
  name!: string;

  @Column()
  value!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
