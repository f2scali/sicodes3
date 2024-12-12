import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
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
}
