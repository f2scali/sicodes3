import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('tbl_Tipo_Clientes')
export class TipoCliente {
  @PrimaryColumn()
  ID: number;

  @Column()
  Detalle: string;

  @Column({ default: 1 })
  estado: number;
}
