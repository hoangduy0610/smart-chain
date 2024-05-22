import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/UserModule';
import { AuthModule } from './modules/AuthModule';
import { ProductModule } from './modules/ProductModule';
import { HistoryModule } from './modules/HistoryModule';
import { BatchProductModule } from './modules/BatchProductModule';
import { TransporterBillModule } from './modules/TransporterBillModule';
import { SellerStorageModule } from './modules/SellerStorageModule';
import { AnalysisModule } from './modules/AnalysisModule';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['local.env', 'test.env', 'product.env'],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_HOST),
    UserModule,
    AuthModule,
    ProductModule,
    HistoryModule,
    BatchProductModule,
    TransporterBillModule,
    SellerStorageModule,
    AnalysisModule,
  ]
})
export class AppModule { }
