import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateSubRutaDTO } from './subruta.dto';

export class CreateRutaDTO {
  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsString()
  path: string;

  @IsArray()
  @IsInt({ each: true })
  rolesIds: number[];

  @IsOptional()
  @IsArray()
  subrutas?: CreateSubRutaDTO[];
}
