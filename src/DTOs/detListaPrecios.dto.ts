import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { IsUnique } from 'src/validators/isUnique-validator';

export class CreateDetListaPrecioDTO {
  @IsNotEmpty({ message: 'Este campo es requerido' })
  @IsString()
  @Validate(IsUnique, ['DetalleListaPrecios', 'cod_ListaPrecio'])
  cod_ListaPrecio: string;

  @IsNotEmpty({ message: 'El id del producto es requerido' })
  @IsNumber()
  id_producto: number;

  @IsNotEmpty({ message: 'El id de la lista de precios es requerido' })
  @IsNumber()
  idListaPrecio: number;

  @IsNotEmpty({ message: 'El precio es requerido' })
  PRECIO: number;
}
