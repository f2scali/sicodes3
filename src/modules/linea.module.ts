import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LineaController } from 'src/controllers/linea.controller';
import { Linea } from 'src/entities/linea.entity';
import { LineaServices } from 'src/services/linea.service';

@Module({
  imports: [TypeOrmModule.forFeature([Linea])],
  controllers: [LineaController],
  providers: [LineaServices],
})
export class LineaModule {}
