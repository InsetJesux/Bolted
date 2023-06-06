import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'workorders',
})
export class Workorder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  serial: string;

  @Column('text')
  symptoms: string;

  @Column('timestamp', {
    nullable: true,
  })
  purchaseDate: string;

  @Column('timestamp', {
    nullable: true,
  })
  warrantyDate: string;

  @Column('boolean', {
    default: false,
  })
  isWarranty: boolean;
}
