import { IsNotEmpty, IsNumber, IsString, Validate } from 'class-validator';
import { IsUnique } from 'src/validators/isUnique-validator';

export class CreateUsuarioDTO {
  @IsNotEmpty({ message: 'El campo cedula es requerido' })
  @IsString()
  @Validate(IsUnique, ['Usuario', 'codUsuario'])
  codUsuario: string;

  @IsNotEmpty({ message: 'El usuario es requerido' })
  @IsString()
  @Validate(IsUnique, ['Usuario', 'usuario'])
  usuario: string;

  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @IsString()
  contraseña: string;

  @IsNotEmpty({ message: 'Es necesario especificar el rol' })
  @IsNumber()
  id_rol: number;
}
