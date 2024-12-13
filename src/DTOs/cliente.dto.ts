import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { IsUnique } from 'src/validators/isUnique-validator';

export class CreateClienteDTO {
  @IsNotEmpty({ message: 'El campo NIT es requerido' })
  @IsString()
  @Validate(IsUnique, ['Cliente', 'NIT'])
  NIT: string;

  @IsNotEmpty({ message: 'El campo Descripcion es requerido' })
  @IsString()
  Descripcion: string;

  @IsOptional()
  @IsNumber()
  id_Tipo_Cliente: number;

  @IsOptional()
  @IsNumber()
  id_Lista_Precio: number;

  @IsNotEmpty({ message: 'El campo vendedor es obligatorio' })
  @IsString()
  id_Vendedor: string;
}
