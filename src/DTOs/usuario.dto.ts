import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUsuarioDTO {
  @IsNotEmpty({ message: 'El campo cedula es requerido' })
  @IsNumber()
  id: number;

  @IsNotEmpty({ message: 'El usuario es requerido' })
  @IsString()
  usuario: string;

  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @IsString()
  contraseña: string;

  @IsNotEmpty({ message: 'Es necesario especificar el rol' })
  @IsNumber()
  id_rol: number;
}
