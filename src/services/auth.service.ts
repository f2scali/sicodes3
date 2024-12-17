import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosServices } from './usuario.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuariosServices,
    private jwtService: JwtService,
  ) {}

  async signIn(
    usuario: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usuarioService.findByUsername(usuario);

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const isPasswordValid = await this.validatePassword(pass, user?.contraseña);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    const payload = { username: user.usuario };

    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async validatePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
