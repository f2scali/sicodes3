import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario.module';
import { AuthService } from 'src/services/auth.service';
import { AuthController } from 'src/controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
    UsuarioModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, { provide: APP_GUARD, useClass: AuthGuard }],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
