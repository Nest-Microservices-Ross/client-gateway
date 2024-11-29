import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, PRODUCT_SERVICES } from 'src/config';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: PRODUCT_SERVICES,
        transport: Transport.TCP,
        options: {
          host: envs.productsMicroservicesHost,
          port: envs.productsMicroservicesPort,
        },
      },
    ]),
  ],
})
export class ProductsModule {}
