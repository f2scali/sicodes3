import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_Lista_Precios')
export class ListaPrecios {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  codLista: string;

  @Column()
  DETALLE: string;

  @Column({ default: 1 })
  estado: number;
}
