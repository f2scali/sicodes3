import { Controller, Get, Param } from '@nestjs/common';
import { RolService } from 'src/services/rol.service';

@Controller('roles')
export class RolController {
  constructor(private readonly rolService: RolService) {}

  @Get(':id/rutas')
  async findRutasByRol(@Param('id') id: number) {
    return this.rolService.findRutasByRol(id);
  }
}
