import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity('tbl_Tipo_Inventario')
export class TipoInventario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  codInventario: string;
  @Column()
  Detalle: string;

  @Column({ default: 1 })
  estado: number;
}
