import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_Tipo_Clientes')
export class TipoCliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  codTipoCliente: string;

  @Column()
  Detalle: string;

  @Column({ default: 1 })
  estado: number;
}
