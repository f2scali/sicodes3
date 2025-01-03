import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePptoDTO {
  @IsNotEmpty({ message: 'El vendedor es requerido' })
  @IsNumber()
  id_Vendedor: number;

  @IsNotEmpty({ message: 'El AÑO es requerido' })
  @IsString()
  Año: string;

  @IsNotEmpty({ message: 'El mes es requerido' })
  @IsString()
  Mes: string;

  @IsNotEmpty({ message: 'La cuota es requerida' })
  @IsString()
  Cuota: string;

  @IsOptional()
  @IsString()
  Ventas: string;
}
