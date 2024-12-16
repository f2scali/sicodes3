import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSubRutaDTO {
  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsString()
  path: string;

  @IsNumber()
  @IsNotEmpty()
  rutaPadreId: number;
}
