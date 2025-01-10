import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { IsUnique } from 'src/validators/isUnique-validator';

export class CreateDetLineaDTO {
  @IsOptional()
  @IsString()
  @Validate(IsUnique, ['DetLineas', 'codDetLinea'])
  codDetLinea: string;

  @IsNotEmpty({ message: 'El detalle es requerido' })
  @IsString()
  detalle: string;

  @IsNotEmpty({ message: 'El id_linea es requerido' })
  @IsNumber()
  id_sublinea: number;
}
