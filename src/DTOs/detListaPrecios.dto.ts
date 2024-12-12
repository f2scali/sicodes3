import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Double } from 'typeorm';

export class CreateDetListaPrecioDTO {
  @IsNotEmpty({ message: 'El id del producto es requerido' })
  @IsNumber()
  ID_Producto: string;

  @IsNotEmpty({ message: 'El id de la lista de precios es requerido' })
  @IsNumber()
  id_Lista_Precios: string;

  @IsNotEmpty({ message: 'El precio es requerido' })
  PRECIO: Double;
}
