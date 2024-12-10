import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity('tbl_Vendedor')
export class Vendedor {
  @PrimaryColumn()
  id: number; // ID principal y clave primaria compartida con Usuario

  @Column({ length: 100 })
  NOMBRE: string;

  @Column({ length: 100 })
  APELLIDO: string;

  @Column({ length: 100, nullable: true })
  Correo: string;

  @Column()
  Telefono: string;

  @Column({ default: 1 })
  estado: number;
  @OneToOne(() => Usuario, (usuario) => usuario.id)
  @JoinColumn({ name: 'id' })
  usuario: Usuario; // Relación 1:1 con Usuario
}
