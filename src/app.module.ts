import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { BrandsModule } from './brands/brands.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { OrderItemsModule } from './order-items/order-items.module';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AppService } from './app.service';
import { AuditModule } from './audit/audit.module';
import { CustomerModule } from './customer/customer.module';
import { DealsModule } from './deals/deals.module';
import { DealtagsModule } from './deal-tags/deal-tags.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.user'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
    BrandsModule,
    CategoriesModule,
    ProductsModule,
    OrdersModule,
    UsersModule,
    OrderItemsModule,
    AuthModule,
    AuditModule,
    CustomerModule,
    DealsModule,
    DealtagsModule,
  ],
  controllers: [AppController],
  providers: [
    /*{
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },*/
    AppService,
  ],
})
export class AppModule {}
