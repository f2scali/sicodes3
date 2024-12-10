import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLineaDTO {
  @IsNotEmpty({ message: 'El detalle es requerido' })
  @IsString()
  detalle: string;
}
