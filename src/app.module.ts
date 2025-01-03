import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteModule } from './modules/cliente.module';
import { UsuarioModule } from './modules/usuario.module';
import { VendedorModule } from './modules/vendedor.module';
import { TipoClienteModule } from './modules/tipoCliente.module';
import { ListaPreciosModule } from './modules/listaPrecios.module';
import { SucursalModule } from './modules/sucursal.module';
import { UnidadMedModule } from './modules/unidadMed.module';
import { LineaModule } from './modules/linea.module';
import { DetLineaModule } from './modules/detLinea.module';
import { TipoInventarioModule } from './modules/tipoInventario.module';
import { ProductoModule } from './modules/producto.module';
import { DetListaPrecioModule } from './modules/detListaPrecios.module';
import { IsUnique } from './validators/isUnique-validator';
import { CriterioModule } from './modules/criterio.module';
import { PptoModule } from './modules/ppto.module';
import { AuthModule } from './modules/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RolModule } from './modules/rol.module';
import { RutaModule } from './modules/ruta.module';
import { SubLineaModule } from './modules/subLinea.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'TOPEDB',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // set to false in production
    }),
    ClienteModule,
    UsuarioModule,
    VendedorModule,
    TipoClienteModule,
    ListaPreciosModule,
    SucursalModule,
    UnidadMedModule,
    CriterioModule,
    LineaModule,
    SubLineaModule,
    DetLineaModule,
    TipoInventarioModule,
    ProductoModule,
    DetListaPrecioModule,
    PptoModule,
    AuthModule,
    RolModule,
    RutaModule,
  ],
  providers: [IsUnique],
})
export class AppModule {}
