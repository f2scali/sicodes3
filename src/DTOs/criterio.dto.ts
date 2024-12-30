import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { IsUnique } from 'src/validators/isUnique-validator';
import { IsNull } from 'typeorm';

export class CreateCriterioDTO {
  @IsString()
  @IsOptional()
  @Validate(IsUnique, ['Criterio', 'codCriterio'])
  codCriterio: string;
  @IsNotEmpty({ message: 'El detalle es requerido' })
  @IsString()
  Detalle: string;

  @IsNotEmpty({ message: 'El inventario es requerido' })
  @IsNumber()
  id_tipo_inv: number;
}
