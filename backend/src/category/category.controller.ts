import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import mongoose from 'mongoose';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get('/')
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Category not found', 404);
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Category not found', 404);
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Category not found', 404);
    return this.categoryService.remove(id);
  }

  @Get('/count/result')
  categoryCount() {
    return this.categoryService.countCategoryDocument();
  }
}
