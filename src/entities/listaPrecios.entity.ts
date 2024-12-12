import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_Lista_Precios')
export class ListaPrecios {
  @PrimaryColumn()
  ID_LISTA: string;

  @Column()
  DETALLE: string;

  @Column({ default: 1 })
  estado: number;
}
