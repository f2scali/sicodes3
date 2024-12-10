import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetLineaController } from 'src/controllers/detLinea.controller';
import { DetLineas } from 'src/entities/detLinea.entity';
import { DetLineaServices } from 'src/services/detLinea.service';

@Module({
  imports: [TypeOrmModule.forFeature([DetLineas])],
  controllers: [DetLineaController],
  providers: [DetLineaServices],
})
export class DetLineaModule {}
