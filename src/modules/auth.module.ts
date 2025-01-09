import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario.module';
import { AuthService } from 'src/services/auth.service';
import { AuthController } from 'src/controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlacklistedToken } from 'src/entities/blackListToken.entity';
import { TokenBlacklistService } from 'src/services/token-blacklist.service';
dotenv.config();
@Module({
  imports: [
    UsuarioModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '3h' },
    }),
    TypeOrmModule.forFeature([BlacklistedToken]),
  ],
  providers: [
    AuthService,
    { provide: APP_GUARD, useClass: AuthGuard },
    TokenBlacklistService,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
