import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEmailDto {
  @IsString()
  @IsNotEmpty()
  date: Date;

  @IsNumber()
  @IsNotEmpty()
  total: number;

  @IsMongoId({ each: true })
  productIds: [];
}
