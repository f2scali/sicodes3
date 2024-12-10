import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCriterioDTO {
  @IsNotEmpty({ message: 'El detalle es requerido' })
  @IsString()
  Detalle: string;
}
