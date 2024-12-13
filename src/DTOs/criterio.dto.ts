import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { IsUnique } from 'src/validators/isUnique-validator';

export class CreateCriterioDTO {
  @IsNotEmpty({ message: 'El criterio es requerido' })
  @IsString()
  @Validate(IsUnique, ['Criterio', 'codCriterio'])
  codCriterio: string;
  @IsNotEmpty({ message: 'El detalle es requerido' })
  @IsString()
  Detalle: string;
}
