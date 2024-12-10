import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUsuarioDTO {
  @IsNotEmpty({ message: 'El campo cedula es requerido' })
  @IsNumber()
  id_Cedula: number;

  @IsNotEmpty({ message: 'El usuario es requerido' })
  @IsString()
  usuario: string;

  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @IsString()
  contraseña: string;
}
