import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Product } from 'src/product/entities/product.entity';

export type ProductDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop({ default: Date.now() })
  date: Date;

  @Prop()
  total: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
  productIds: Product[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
