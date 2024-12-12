import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tbl_Tipo_Inventario')
export class TipoInventario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  codInventario: string;

  @Column()
  detalle: string;

  @Column({ default: 1 })
  estado: number;
}
