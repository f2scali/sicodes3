import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { IsUnique } from 'src/validators/isUnique-validator';

export class CreateLineaDTO {
  @IsNotEmpty({ message: 'Este campo es requerido' })
  @IsString()
  @Validate(IsUnique, ['Linea', 'codLinea'])
  codLinea: string;

  @IsNotEmpty({ message: 'El detalle es requerido' })
  @IsString()
  detalle: string;
}
