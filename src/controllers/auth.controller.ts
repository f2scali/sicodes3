import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { AllowAnon } from 'src/decorators/publicRoutes.decorators';
import { SignInDTO } from 'src/DTOs/auth.dto';
import { AuthService } from 'src/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @AllowAnon()
  @Post('login')
  signIn(@Body() signInDTO: SignInDTO) {
    return this.authService.signIn(signInDTO.usuario, signInDTO.contraseña);
  }

  @Post('logout')
  async logout(@Req() req: Request): Promise<{ message: string }> {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];

    await this.authService.logout(token);

    return { message: 'Sesión cerrada' };
  }
}
