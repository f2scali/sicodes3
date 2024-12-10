import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTipoInventarioDTO {
  @IsNotEmpty({ message: 'El detalle es requerido' })
  @IsString()
  Detalle: string;
}
