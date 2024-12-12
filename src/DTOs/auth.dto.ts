import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDTO {
  @IsNotEmpty({ message: 'El usuario es requerido' })
  @IsString()
  usuario: string;

  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @IsString()
  contraseña: string;
}
