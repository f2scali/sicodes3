import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnidadMedController } from 'src/controllers/unidadMed.controller';
import { UnidadMed } from 'src/entities/unidadMed.entity';
import { UnidadMedServices } from 'src/services/unidadMed.service';

@Module({
  imports: [TypeOrmModule.forFeature([UnidadMed])],
  controllers: [UnidadMedController],
  providers: [UnidadMedServices],
})
export class UnidadMedModule {}
