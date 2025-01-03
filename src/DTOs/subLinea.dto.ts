import { IsNotEmpty, IsNumber, IsString, Validate } from 'class-validator';
import { IsUnique } from 'src/validators/isUnique-validator';

export class CreateSubLineaDTO {
  @IsNotEmpty({ message: 'El ID es requerido' })
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
