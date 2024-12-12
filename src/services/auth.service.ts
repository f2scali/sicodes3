import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosServices } from './usuario.service';
import { JwtService } from '@nestjs/jwt';

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
    if (user?.contraseña !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.usuario };

    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
