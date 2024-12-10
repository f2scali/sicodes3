import { IsNotEmpty, IsString } from 'class-validator';

export class CreateListaPreciosDTO {
  @IsNotEmpty({ message: 'El detalle es requerido' })
  @IsString()
  DETALLE: string;
}
