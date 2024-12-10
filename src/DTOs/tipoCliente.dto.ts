import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTipoClienteDTO {
  @IsNotEmpty({ message: 'El detalle es requerido' })
  @IsString()
  Detalle: string;
}
