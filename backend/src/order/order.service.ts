import {
  HttpException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from '../common/dto/create-order.dto';
import { UpdateOrderDto } from '../common/dto/update-order.dto';
import { Order } from './entities/order.entity';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from 'src/product/entities/product.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    this.logger.log('creating order...');
    //find all products in the array
    const products = await this.productModel.find({
      _id: { $in: [...createOrderDto.productIds] },
    });
    if (!products) {
      throw new NotFoundException(`Products not found`);
    }

    const totalPrice = await products.reduce((acc, val) => acc + val.price, 0);

    const order = await new this.orderModel({
      ...createOrderDto,
      productIds: createOrderDto.productIds,
      total: Number(totalPrice),
    });

    const result = await order.save();
    this.eventEmitter.emit('order.created', result);
    return result;
  }

  findAll() {
    return this.orderModel.find().populate('productIds');
  }

  findOne(id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Order not found', 404);
    return this.orderModel.findById(id);
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.orderModel.findByIdAndUpdate(id, updateOrderDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.orderModel.deleteOne({ _id: id });
  }

  async orderSummary() {
    try {
      const orders = await this.orderModel.aggregate([
        {
          $group: {
            _id: null,
            numberOrders: { $sum: 1 },
            totalSales: { $sum: '$total' },
          },
        },
      ]);

      const products = await this.productModel.aggregate([
        {
          $group: {
            _id: null,
            nbProducts: { $sum: 1 },
          },
        },
      ]);

      const daylyOrders = await this.orderModel.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: '%d-%m-%Y', date: '$date' } },
            orders: { $sum: 1 },
            sales: { $sum: '$total' },
          },
        },
      ]);

      const medianValuePerOrder = await this.orderModel.aggregate([
        {
          $lookup: {
            from: 'products',
            localField: 'productIds',
            foreignField: '_id',
            as: 'products',
          },
        },
        {
          $project: {
            total: 1,
          },
        },
        {
          $group: {
            _id: null,
            average: {
              $avg: '$total',
            },
          },
        },
      ]);

      return { orders, daylyOrders, products, medianValuePerOrder };
    } catch (error) {
      console.log(error);
      throw new Error('Error occured while creating the order summary!');
    }
  }

  async filterOrder(filter: string) {
    enum reportByDays {
      today = 'today',
      lastSeven = '7days',
      lastThirty = '30days',
    }
    const d = new Date();
    const today = d.toISOString().slice(0, 10); // format today date "****-**-**"

    //last 7 days
    const lastSevenDays = new Date();
    lastSevenDays.setDate(lastSevenDays.getDate() - 7);

    //last 30 days
    const lastThirtyDays = new Date();
    lastThirtyDays.setDate(lastThirtyDays.getDate() - 30);

    try {
      const filterOrders = await this.orderModel.aggregate([
        {
          $match: {
            date: {
              $gte:
                filter === reportByDays.today
                  ? new Date(today)
                  : filter === reportByDays.lastSeven
                    ? lastSevenDays
                    : lastThirtyDays, // put the formatted date to adapt it in the query.
            },
          },
        },
        {
          $project: {
            date: 1,
          },
        },
        {
          $group: {
            _id: '$date',
            total: {
              $sum: 1,
            },
          },
        },
        {
          $group: {
            _id: null,
            result: {
              $sum: '$total',
            },
          },
        },
      ]);

      return filterOrders;
    } catch (error) {
      throw new Error('Error occured while creating the  filter report order!');
    }
  }
}
