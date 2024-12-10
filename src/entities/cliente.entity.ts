import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Vendedor } from './vendedor.entity';
import { TipoCliente } from './tipoCliente.entity';
import { ListaPrecios } from './listaPrecios.entity';

@Entity('tbl_Clientes')
export class Cliente {
  @PrimaryColumn()
  id: string;
  @Column()
  NIT: string;
  @Column()
  Descripcion: string;
  @Column({ nullable: true })
  id_Tipo_Cliente: number;
  @Column({ nullable: true })
  id_Lista_Precio: number;
  @Column()
  id_Vendedor: string;
  @Column({ default: 1 })
  estado: number;

  @ManyToOne(() => Vendedor, (vendedor) => vendedor.id)
  @JoinColumn({ name: 'id_Vendedor' })
  vendedor: Vendedor;

  @ManyToOne(() => TipoCliente, (tipoCliente) => tipoCliente.ID)
  @JoinColumn({ name: 'id_Tipo_Cliente' })
  tipoCliente: TipoCliente;

  @ManyToOne(() => ListaPrecios, (listaPrecios) => listaPrecios.ID_LISTA)
  @JoinColumn({ name: 'id_Lista_Precio' })
  listaPrecios: ListaPrecios;
}
