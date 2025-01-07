import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { IsUnique } from 'src/validators/isUnique-validator';
import { UniqueSucursalName } from 'src/validators/unique-sucusal-name.validator';

export class CreateSucursalDTO {
  @IsOptional()
  @IsString()
  @Validate(IsUnique, ['Sucursal', 'codSucursal'])
  codSucursal: string;

  @IsNotEmpty({ message: 'El id del cliente es requerido' })
  @IsNumber()
  id_Cliente: number;

  @IsNotEmpty({ message: 'El detalle de la sucursal es requerida' })
  @IsString()
  @UniqueSucursalName({ message: 'La sucursal ya existe' })
  Detalle: string;

  @IsNotEmpty({ message: 'La dirección es requerida' })
  @IsString()
  Direccion: string;

  @IsOptional()
  @IsString()
  Telefono: string;
}
