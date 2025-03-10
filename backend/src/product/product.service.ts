import { CategoryService } from './../category/category.service';
import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    private categoryService: CategoryService,
    private readonly logger: Logger,
  ) {}
  async create(createProductDto: CreateProductDto) {
    // this.logger.log(createProductDto);
    const product = await new this.productModel(createProductDto);
    await this.categoryModel.updateMany(
      { _id: product.categoryIds },
      { $addToSet: { productIds: product._id } },
    );

    return product.save();
  }

  findAll() {
    return this.productModel.find().populate('categoryIds', 'name');
  }

  findOne(id: string) {
    return this.productModel.findById(id).populate('categoryIds', 'name');
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const set_fields = {
      name: updateProductDto.name,
      description: updateProductDto.description,
      price: updateProductDto.price,
      imageUrl: updateProductDto.imageUrl,
    };

    const product = await this.productModel.updateOne(
      { _id: id },
      {
        $set: set_fields,
        $addToSet: {
          categoryIds: { $each: updateProductDto.categoryIds },
        },
      },
    );

    await this.categoryModel.updateMany(
      { _id: updateProductDto.categoryIds },
      { $addToSet: { productIds: id } },
    );

    return product;
  }

  async remove(id: string) {
    try {
      const product = await this.productModel.findOneAndDelete({ _id: id });
      await this.categoryModel.updateMany(
        { _id: product?.categoryIds },
        { $pull: { productIds: product?._id } },
      );
      return product;
    } catch (error) {
      console.log(error);
    }
  }

  async populateProductAndCategory() {
    try {
      const cat1 = await this.categoryModel.create({ name: 'Electronics' });
      const cat2 = await this.categoryModel.create({ name: 'Cellphone' });
      const cat3 = await this.categoryModel.create({ name: 'Laptop' });

      const product1 = await this.productModel.create({
        name: 'Iphone',
        description: 'lorem ipsu lorem lorem ip us lor lorem ipsu',
        price: 250,
        imageUrl:
          'https://aws-s3-upload-emmann.s3.us-east-2.amazonaws.com/iphone.jpeg',
        categoryIds: [cat1._id, cat2._id],
      });
      await this.categoryModel.updateMany(
        { _id: product1.categoryIds },
        { $addToSet: { productIds: product1._id } },
      );

      const product2 = await this.productModel.create({
        name: 'Laptop Dell',
        description: 'lorem ipsu lorem lorem ip us lor lorem ipsu',
        price: 2500,
        imageUrl:
          'https://aws-s3-upload-emmann.s3.us-east-2.amazonaws.com/dell.jpeg',
        categoryIds: [cat3._id, cat1._id],
      });
      await this.categoryModel.updateMany(
        { _id: product2.categoryIds },
        { $addToSet: { productIds: product2._id } },
      );

      const product3 = await this.productModel.create({
        name: 'Refrigerator',
        description: 'lorem ipsu lorem lorem ip us lor lorem ipsu',
        price: 3500,
        imageUrl:
          'https://aws-s3-upload-emmann.s3.us-east-2.amazonaws.com/refrigerator.jpeg',
        categoryIds: [cat1._id],
      });
      await this.categoryModel.updateMany(
        { _id: product3.categoryIds },
        { $addToSet: { productIds: product3._id } },
      );
    } catch (error) {
      console.log(error);
    }
  }
}
