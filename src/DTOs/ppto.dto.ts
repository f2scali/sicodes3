import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePptoDTO {
  @IsNotEmpty({ message: 'El id del presupuesto es requerido' })
  @IsString()
  id: number;

  @IsNotEmpty({ message: 'El vendedor es requerido' })
  @IsNumber()
  id_Vendedor: number;

  @IsNotEmpty({ message: 'El AÑO es requerido' })
  @IsString()
  AÑO: string;

  @IsNotEmpty({ message: 'El mes es requerido' })
  @IsString()
  MES: string;

  @IsNotEmpty({ message: 'La cuota es requerida' })
  @IsString()
  CUOTA: string;

  @IsOptional()
  @IsString()
  VENTAS: string;
}
