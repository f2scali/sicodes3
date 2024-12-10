import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUnidadMedDTO {
  @IsNotEmpty({ message: 'El detalle es requerido' })
  @IsString()
  Detalle: string;
}
