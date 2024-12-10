import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubLineaController } from 'src/controllers/subLinea.cotroller';
import { Sublinea } from 'src/entities/subLinea.entity';
import { SubLineaServices } from 'src/services/subLinea.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sublinea])],
  controllers: [SubLineaController],
  providers: [SubLineaServices],
})
export class SubLineaModule {}
