import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Vendedor } from './vendedor.entity';

@Entity('tbl_Ppto')
export class Ppto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_Vendedor: number;

  @Column()
  Año: string;

  @Column()
  Mes: string;

  @Column()
  Cuota: string;

  @Column({ nullable: true })
  Ventas: string;

  @Column({ default: 1 })
  estado: number;

  @ManyToOne(() => Vendedor, (vendedor) => vendedor.id)
  @JoinColumn({ name: 'id_Vendedor' })
  vendedor: Vendedor;
}
