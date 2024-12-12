import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosController } from 'src/controllers/usuario.controller';
import { Usuario } from 'src/entities/usuario.entity';
import { UsuariosServices } from 'src/services/usuario.service';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  controllers: [UsuariosController],
  providers: [UsuariosServices],
  exports: [UsuariosServices],
})
export class UsuarioModule {}
