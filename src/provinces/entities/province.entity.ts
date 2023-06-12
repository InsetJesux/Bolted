import { City } from 'src/cities/entities/city.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'provinces',
})
export class Province {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', {
    unique: true,
  })
  name: string;

  @OneToMany(() => City, (city) => city.province)
  cities: City[];
}
