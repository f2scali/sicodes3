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
  @Validate(IsUnique, ['Vendedor', 'codVendedor'])
  @IsNotEmpty({ message: 'El campo cedula es requerido' })
  @IsString()
  codVendedor: string;

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
