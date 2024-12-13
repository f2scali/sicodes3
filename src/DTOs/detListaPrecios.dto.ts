import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Double } from 'typeorm';

export class CreateDetListaPrecioDTO {
  @IsNotEmpty({ message: 'El id del producto es requerido' })
  @IsNumber()
  id_producto: number;

  @IsNotEmpty({ message: 'El id de la lista de precios es requerido' })
  @IsNumber()
  idListaPrecio: number;

  @IsNotEmpty({ message: 'El precio es requerido' })
  PRECIO: number;
}
