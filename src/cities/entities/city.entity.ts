import { Client } from 'src/clients/entities/client.entity';
import { Province } from 'src/provinces/entities/province.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'cities',
})
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', {
    unique: true,
  })
  name: string;

  @ManyToOne(() => Province, (province) => province.cities, {
    nullable: false,
  })
  @JoinColumn({
    name: 'province_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_province_id',
  })
  province: Province;

  @OneToMany(() => Client, (client) => client.city)
  clients: Client[];
}
