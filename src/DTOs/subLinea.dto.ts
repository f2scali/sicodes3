import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { IsUnique } from 'src/validators/isUnique-validator';

export class CreateSubLineaDTO {
  @IsOptional()
  @IsString()
  @Validate(IsUnique, ['Sublinea', 'codSublinea'])
  codSublinea: string;

  @IsNotEmpty({ message: 'El detalle es requerido' })
  @IsString()
  detalle: string;

  @IsNotEmpty({ message: 'La linea es requerida' })
  @IsNumber()
  id_linea: number;
}
