import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('tbl_Tipo_Inventario')
export class TipoInventario {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  Detalle: string;

  @Column({ default: 1 })
  estado: number;
}
