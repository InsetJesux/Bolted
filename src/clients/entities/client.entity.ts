import { City } from 'src/cities/entities/city.entity';
import { Workorder } from 'src/workorders/entities/workorder.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'clients',
})
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text', {
    nullable: true,
  })
  nif?: string;

  @Column('text', {
    nullable: true,
  })
  address?: string;

  @Column('text', {
    nullable: true,
  })
  phone?: string;

  @ManyToOne(() => City, (city) => city.clients)
  @JoinColumn({
    name: 'city_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_city_id',
  })
  city?: City;

  @OneToMany(() => Workorder, (workorder) => workorder.client)
  workorders: Workorder[];
}
