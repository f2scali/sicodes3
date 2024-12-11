import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario.module';
import { AuthService } from 'src/services/auth.service';
import { AuthController } from 'src/controllers/auth.controller';

@Module({
  imports: [UsuarioModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
