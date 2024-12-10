import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDetLineaDTO {
  @IsNotEmpty({ message: 'El detalle es requerido' })
  @IsString()
  detalle: string;

  @IsNotEmpty({ message: 'El id_linea es requerido' })
  @IsNumber()
  id_sublinea: number;
}
