import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolController } from 'src/controllers/rol.controller';
import { Roles } from 'src/entities/roles.entity';
import { RolService } from 'src/services/rol.service';

@Module({
  imports: [TypeOrmModule.forFeature([Roles])],
  controllers: [RolController],
  providers: [RolService],
  exports: [RolService, TypeOrmModule],
})
export class RolModule {}
