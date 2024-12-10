import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { IsUnique } from 'src/validators/isUnique-validator';

export class CreateProductoDTO {
  @Validate(IsUnique, ['Producto', 'ID_Producto'])
  ID_Producto: string;

  @IsNotEmpty({ message: 'El id del producto es requerido' })
  @IsString()
  ID_ITEM: string;

  @IsOptional()
  ID_EXT_ITM: string;

  @IsOptional()
  ID_TIPO_INVENTARIO: string;

  @IsOptional()
  ID_REFERENCIA: string;

  @IsNotEmpty({ message: 'La descripción del producto es requerida' })
  DESCRIPCION: string;

  @IsOptional()
  UNIMED_INV_1: string;

  @IsOptional()
  ID_LINEA: string;

  @IsOptional()
  ID_CRICLA1: string;

  @IsNotEmpty({ message: 'El costo del producto es requerido' })
  @IsNumber()
  COSTO: number;
}
