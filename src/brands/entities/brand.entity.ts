import { Model } from 'src/models/entities/model.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'brands',
})
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    unique: true,
  })
  name: string;

  @OneToMany(() => Model, (model) => model.brand)
  models: Model[];
}
