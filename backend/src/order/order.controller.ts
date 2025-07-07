import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from '../common/dto/create-order.dto';
import { UpdateOrderDto } from '../common/dto/update-order.dto';
import { AuthGuard } from 'src/common/guard/auth.guard';

@Controller('order')
export class OrderController {
  private logger = new Logger(OrderController.name);
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    try {
      const order = this.orderService.create(createOrderDto);
      return order;
    } catch (error) {
      this.logger.warn(error);
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll() {
    try {
      const orders = this.orderService.findAll();
      return orders;
    } catch (error) {
      this.logger.warn(error);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      const order = this.orderService.findOne(id);
    } catch (error) {
      this.logger.warn(error);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    try {
      const orderUpdate = this.orderService.update(id, updateOrderDto);
      return orderUpdate;
    } catch (error) {
      this.logger.warn(error);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }

  @Get('summary/total')
  getSummaryStat() {
    return this.orderService.orderSummary();
  }

  @Get('filter/:value')
  getOrderFilterStat(@Param('value') value: string) {
    return this.orderService.filterOrder(value);
  }
}
