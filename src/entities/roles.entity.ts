import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_Roles')
export class Roles {
  @PrimaryColumn()
  id: number;

  @Column()
  descripcion: string;
}
