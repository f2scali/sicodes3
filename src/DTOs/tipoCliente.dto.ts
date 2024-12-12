import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { IsUnique } from 'src/validators/isUnique-validator';

export class CreateTipoClienteDTO {
  @IsNotEmpty({ message: 'El ID es requerido' })
  @IsString()
  @Validate(IsUnique, ['TipoCliente', 'codTipoCliente'])
  codTipoCliente: string;

  @IsNotEmpty({ message: 'El detalle es requerido' })
  @IsString()
  Detalle: string;
}
