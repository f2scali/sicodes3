import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { EntityManager } from 'typeorm';

const fieldName: Record<string, string> = {
  ID_ITEM: 'El ID del producto',
  NIT: 'El NIT',
  usuario: 'El usuario',
  codVendedor: 'El código del vendedor',
  cod_ListaPrecio: 'El código',
};
@ValidatorConstraint({ name: 'IsUniqueConstraint', async: true })
@Injectable()
export class IsUnique implements ValidatorConstraintInterface {
  constructor(private readonly entityManager: EntityManager) {}

  async validate(value: any, args?: ValidationArguments): Promise<boolean> {
    const [tableName, column] = args.constraints as string[];
    const dataExist = await this.entityManager
      .getRepository(tableName)
      .createQueryBuilder(tableName)
      .where({ [column]: value })
      .getExists();

    return !dataExist;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    const field = validationArguments.property;
    const friendlyFieldName = fieldName[field] || field;
    return `${friendlyFieldName} ya existe`;
  }
}
