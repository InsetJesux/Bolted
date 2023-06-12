import { Brand } from 'src/brands/entities/brand.entity';
import { Workorder } from 'src/workorders/entities/workorder.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({
  name: 'models',
})
@Unique('UQ_MODEL', ['name', 'brand'])
export class Model {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @ManyToOne(() => Brand, (brand) => brand.models, {
    nullable: false,
  })
  @JoinColumn({
    name: 'brand_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_brand_id',
  })
  brand: Brand;

  @OneToMany(() => Workorder, (workorder) => workorder.model)
  workorders: Workorder[];
}
