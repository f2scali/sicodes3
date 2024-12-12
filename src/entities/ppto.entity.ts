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
  codVendedor: string;

  @Column()
  AÑO: string;

  @Column()
  MES: string;

  @Column()
  CUOTA: string;

  @Column({ nullable: true })
  VENTAS: string;

  @Column({ default: 1 })
  estado: number;

  @ManyToOne(() => Vendedor, (vendedor) => vendedor.id)
  @JoinColumn({ name: 'id_Vendedor' })
  vendedor: Vendedor;
}
