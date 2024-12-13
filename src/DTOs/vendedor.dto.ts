import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { IsUnique } from 'src/validators/isUnique-validator';

export class CreateVendedorDTO {
  @Validate(IsUnique, ['Vendedor', 'idUsuario'])
  @IsNotEmpty({ message: 'El campo cedula es requerido' })
  @IsNumber()
  idUsuario: number;

  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString()
  NOMBRE: string;

  @IsNotEmpty({ message: 'El apellido es requerido' })
  @IsString()
  APELLIDO: string;

  @IsOptional()
  @IsEmail()
  Correo: string;

  @IsNotEmpty({ message: 'El telefono es requerido' })
  @IsString()
  Telefono: string;
}
