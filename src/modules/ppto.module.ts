import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PptoController } from 'src/controllers/ppto.controller';
import { Ppto } from 'src/entities/ppto.entity';
import { PptoServices } from 'src/services/ppto.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ppto])],
  controllers: [PptoController],
  providers: [PptoServices],
})
export class PptoModule {}
