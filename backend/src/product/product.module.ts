import { Logger, Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { UploadModule } from 'src/upload/upload.module';
import { CategoryModule } from 'src/category/category.module';
import {
  Category,
  CategorySchema,
} from 'src/category/entities/category.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    UploadModule,
    CategoryModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, Logger],
})
export class ProductModule {}
