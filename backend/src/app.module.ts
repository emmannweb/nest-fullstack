import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UploadModule } from './upload/upload.module';
import { EmailModule } from './email/email.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.getOrThrow<number>('JWT_SECRET_EXP_MS'),
        },
      }),
      global: true,
      inject: [ConfigService],
    }),
    MongooseModule.forRoot(
      // `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mongo-db:27017/${process.env.DB_NAME}?retryWrites=true&writeConcern=majority&authSource=admin`,
      'mongodb://localhost:27017/nest-ecommerce',
    ),
    ProductModule,
    CategoryModule,
    OrderModule,
    UploadModule,
    EmailModule,
    EventEmitterModule.forRoot(),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
