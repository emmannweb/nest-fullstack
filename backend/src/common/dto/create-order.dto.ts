import { Transform } from 'class-transformer';
import { IsMongoId } from 'class-validator';

export class CreateOrderDto {
  date: Date;

  @Transform(({ value }) => Number(value))
  total: number;

  @IsMongoId({ each: true })
  productIds: [];
}
