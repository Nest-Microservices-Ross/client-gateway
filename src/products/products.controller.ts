import {
  Body,
  Controller,
  Delete,
  Logger,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PRODUCT_SERVICES } from 'src/config';

import { firstValueFrom } from 'rxjs';

@Controller('products')
export class ProductsController {

  private readonly logger = new Logger(ProductsController.name);
  constructor(
    @Inject(PRODUCT_SERVICES) private readonly produsClient: ClientProxy,
  ) {}

  @Post()
  createProduct() {
    return this.produsClient.send({ cmd: 'create_product' }, {});
  }

  @Get()
  findAllsProduct() {
    return this.produsClient.send({ cmd: 'find_all_products' }, {});
  }

  @Get(':id')
  async findOneProduct(@Param('id') id: number) {
    try {
      const product = await firstValueFrom(
      this.produsClient.send({   cmd:'find_one_product' },
          { id }
      ));

    return product;

  } catch (error) {
      this.logger.error(`Error fetching products: ${error}`);
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.produsClient.send({ cmd: 'delete_one_product' }, { id });
  }

  @Patch(':id')
  update(@Body() body: any, @Param('id') id: string) {
    return this.produsClient.send({ cmd: 'update_product' }, { id, body });
  }
}
