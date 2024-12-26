import { IsNotEmpty, IsOptional, IsString, Validate } from 'class-validator';
import { IsUnique } from 'src/validators/isUnique-validator';

export class CreateTipoClienteDTO {
  @IsOptional()
  @IsString()
  @Validate(IsUnique, ['TipoCliente', 'codTipoCliente'])
  codTipoCliente: string;

  @IsNotEmpty({ message: 'El detalle es requerido' })
  @IsString()
  Detalle: string;
}
