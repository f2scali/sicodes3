import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Vendedor } from './vendedor.entity';
import { TipoCliente } from './tipoCliente.entity';
import { ListaPrecios } from './listaPrecios.entity';

@Entity('tbl_Clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  NIT: string;
  @Column()
  Descripcion: string;
  @Column({ nullable: true })
  id_Tipo_Cliente: number;
  @Column({ nullable: true })
  id_Lista_Precio: number;
  @Column()
  id_Vendedor: number;
  @Column({ default: 1 })
  estado: number;

  @ManyToOne(() => Vendedor, (vendedor) => vendedor.id, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_Vendedor' })
  vendedor: Vendedor;

  @ManyToOne(() => TipoCliente, (tipoCliente) => tipoCliente.id, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_Tipo_Cliente' })
  tipoCliente: TipoCliente;

  @ManyToOne(() => ListaPrecios, (listaPrecios) => listaPrecios.id, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_Lista_Precio' })
  listaPrecios: ListaPrecios;
}
