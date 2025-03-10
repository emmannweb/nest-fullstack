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

  create(createCategoryDto: CreateCategoryDto) {
    const category = new this.categoryModel(createCategoryDto);
    return category.save();
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
      console.log(error);
    }
  }

  countCategoryDocument() {
    return this.categoryModel.estimatedDocumentCount();
  }
}
