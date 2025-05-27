import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      const category = await new this.categoryModel(createCategoryDto);
      return category.save();
    } catch (error) {
      throw new Error('An error occured while creating category');
    }
  }

  findAll() {
    return this.categoryModel.find().populate('productIds', 'name');
  }

  findOne(id: string) {
    return this.categoryModel.findById(id).populate('productIds', 'name');
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, {
      new: true,
    });
  }

  async remove(id: string) {
    try {
      const category = await this.categoryModel.findOneAndDelete({ _id: id });
      await this.productModel.updateMany(
        { _id: category?.productIds },
        { $pull: { productIds: category?._id } },
      );
      return category;
    } catch (error) {
      throw new Error('Operation failed!');
    }
  }

  countCategoryDocument() {
    return this.categoryModel.estimatedDocumentCount();
  }
}
