import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateVendedorDTO {
  @IsNotEmpty({ message: 'El campo cedula es requerido' })
  @IsNumber()
  id: number;

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
