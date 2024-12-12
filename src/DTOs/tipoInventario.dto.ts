import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { IsUnique } from 'src/validators/isUnique-validator';

export class CreateTipoInventarioDTO {
  @IsNotEmpty({ message: 'El código es requerido' })
  @IsString()
  @Validate(IsUnique, ['TipoInventario', 'codInventario'])
  codInventario: string;

  @IsNotEmpty({ message: 'El detalle es requerido' })
  @IsString()
  Detalle: string;
}
