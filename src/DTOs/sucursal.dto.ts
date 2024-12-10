import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UniqueSucursalName } from 'src/validators/unique-sucusal-name.validator';

export class CreateSucursalDTO {
  @IsNotEmpty({ message: 'El id del cliente es requerido' })
  @IsString()
  id_Cliente: string;

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
