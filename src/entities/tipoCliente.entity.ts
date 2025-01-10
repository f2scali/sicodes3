import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Cliente } from './cliente.entity';

@Entity('tbl_Tipo_Clientes')
export class TipoCliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  codTipoCliente: string;

  @Column()
  Detalle: string;

  @Column({ default: 1 })
  estado: number;

  @OneToMany(() => Cliente, (cliente) => cliente.tipoCliente)
  clientes: Cliente[];
}
