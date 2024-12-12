import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_Roles')
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string;
}
