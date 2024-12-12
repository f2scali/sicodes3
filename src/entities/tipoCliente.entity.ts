import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('tbl_Tipo_Clientes')
export class TipoCliente {
  @PrimaryColumn()
  ID: string;

  @Column()
  Detalle: string;

  @Column({ default: 1 })
  estado: number;
}
