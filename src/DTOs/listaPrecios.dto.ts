import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { IsUnique } from 'src/validators/isUnique-validator';

export class CreateListaPreciosDTO {
  @IsNotEmpty({ message: 'El código es requerido' })
  @IsString()
  @Validate(IsUnique, ['ListaPrecios', 'codLista'])
  codLista: string;
  @IsNotEmpty({ message: 'El detalle es requerido' })
  @IsString()
  DETALLE: string;
}
