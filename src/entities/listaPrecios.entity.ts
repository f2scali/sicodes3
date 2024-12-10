import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_Lista_Precios')
export class ListaPrecios {
  @PrimaryGeneratedColumn()
  ID_LISTA: number;

  @Column()
  DETALLE: string;

  @Column({ default: 1 })
  estado: number;
}
