import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SucursalController } from 'src/controllers/sucursal.controller';
import { Sucursal } from 'src/entities/sucursal.entity';
import { SucursalServices } from 'src/services/sucursal.service';
import { UniqueSucursalNameConstraint } from 'src/validators/unique-sucusal-name.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Sucursal])],
  controllers: [SucursalController],
  providers: [SucursalServices, UniqueSucursalNameConstraint],
})
export class SucursalModule {}
