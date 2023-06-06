import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'models',
})
export class Model {
  @PrimaryGeneratedColumn()
  id: number;

  // TODO: Modify unique constraint with brand id
  @Column('varchar', {
    unique: true,
  })
  name: string;
}
