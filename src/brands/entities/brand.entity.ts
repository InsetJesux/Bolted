import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'brands',
})
export class Brand {
  @PrimaryGeneratedColumn()
  id;

  @Column('varchar', {
    unique: true,
  })
  name: string;
}
