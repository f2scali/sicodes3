import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductoDTO {
  @IsNotEmpty({ message: 'El id del producto es requerido' })
  @IsString()
  id_item: string;

  @IsOptional()
  id_ext_item: string;

  @IsOptional()
  codInventario: number;

  @IsOptional()
  id_referencia: string;

  @IsNotEmpty({ message: 'La descripción del producto es requerida' })
  descripcion: string;

  @IsOptional()
  unimed_inv_1: number;

  @IsOptional()
  id_linea: number;

  @IsOptional()
  id_cricla1: number;

  @IsNotEmpty({ message: 'El costo del producto es requerido' })
  @IsNumber()
  COSTO: number;
}
