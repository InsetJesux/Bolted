import { Client } from 'src/clients/entities/client.entity';
import { Model } from 'src/models/entities/model.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
  purchaseDate?: string;

  @Column('timestamp', {
    nullable: true,
  })
  warrantyDate?: string;

  @Column('boolean', {
    default: false,
  })
  isWarranty: boolean;

  @ManyToOne(() => Client, (client) => client.workorders)
  @JoinColumn({
    name: 'workorder_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_workorder_id',
  })
  client: Client;

  @ManyToOne(() => Model, (model) => model.workorders)
  @JoinColumn({
    name: 'model_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_model_id',
  })
  model: Model;
}
