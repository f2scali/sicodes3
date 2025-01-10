import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { IsUnique } from 'src/validators/isUnique-validator';

export class CreateUnidadMedDTO {
  @IsOptional()
  @IsString()
  @Validate(IsUnique, ['UnidadMed', 'codUnidadMed'])
  codUnidadMed: string;

  @IsNotEmpty({ message: 'El detalle es requerido' })
  @IsString()
  Detalle: string;

  @IsNotEmpty({ message: 'El inventario es requerido' })
  @IsNumber()
  id_tipo_inv: number;
}
