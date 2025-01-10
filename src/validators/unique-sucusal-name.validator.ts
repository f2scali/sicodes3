import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Sucursal } from 'src/entities/sucursal.entity';
import { Repository } from 'typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueSucursalNameConstraint
  implements ValidatorConstraintInterface
{
  constructor(
    @InjectRepository(Sucursal)
    private readonly sucursalRepository: Repository<Sucursal>,
  ) {}

  async validate(Detalle: string, args: ValidationArguments): Promise<boolean> {
    const id_Cliente = (args.object as any).id_Cliente;
    if (!id_Cliente) {
      return false;
    }
    const existingSucursal = await this.sucursalRepository.findOne({
      where: { Detalle, id_Cliente },
    });
    return !existingSucursal;
  }
  defaultMessage(args: ValidationArguments): string {
    return `La sucursal '${args.value} ya existe `;
  }
}

export function UniqueSucursalName(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: UniqueSucursalNameConstraint,
    });
  };
}
