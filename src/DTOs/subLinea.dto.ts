import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSubLineaDTO {
  @IsNotEmpty({ message: 'El detalle es requerido' })
  @IsString()
  detalle: string;

  @IsNotEmpty({ message: 'La linea es requerida' })
  @IsString()
  id_linea: string;
}
