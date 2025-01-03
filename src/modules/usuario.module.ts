import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosController } from 'src/controllers/usuario.controller';
import { Roles } from 'src/entities/roles.entity';
import { Usuario } from 'src/entities/usuario.entity';
import { UsuariosServices } from 'src/services/usuario.service';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Roles])],
  controllers: [UsuariosController],
  providers: [UsuariosServices],
  exports: [UsuariosServices, TypeOrmModule],
})
export class UsuarioModule {}
