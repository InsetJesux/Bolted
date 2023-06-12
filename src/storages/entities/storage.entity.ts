import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'storages',
})
export class Storage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', {
    unique: true,
  })
  name: string;

  @Column('text')
  description: string;
}
