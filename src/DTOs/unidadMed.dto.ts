import { IsNotEmpty, IsNumber, IsString, Validate } from 'class-validator';
import { IsUnique } from 'src/validators/isUnique-validator';

export class CreateUnidadMedDTO {
  @IsNotEmpty({ message: 'El ID es requerido' })
  @IsString()
  @Validate(IsUnique, ['UnidadMed', 'codUnidadMed'])
  codUnidadMed: string;

  @IsNotEmpty({ message: 'El detalle es requerido' })
  @IsString()
  Detalle: string;
}
