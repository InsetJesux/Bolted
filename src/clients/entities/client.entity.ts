import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'clients',
})
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar', {
    nullable: true,
  })
  nif?: string;

  @Column('varchar', {
    nullable: true,
  })
  address?: string;

  @Column('varchar', {
    nullable: true,
  })
  phone?: string;
}
