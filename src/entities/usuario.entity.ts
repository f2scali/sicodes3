import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('tbl_Usuarios')
export class Usuario {
  @PrimaryColumn()
  id: number;

  @Column({ unique: true })
  usuario: string;

  @Column()
  contraseña: string;

  @Column({ default: 1 })
  estado: number;
}
