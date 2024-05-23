import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bull';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { UserModule } from './modules/UserModule';
import { AuthModule } from './modules/AuthModule';
import { ProductModule } from './modules/ProductModule';
import { HistoryModule } from './modules/HistoryModule';
import { BatchProductModule } from './modules/BatchProductModule';
import { TransporterBillModule } from './modules/TransporterBillModule';
import { SellerStorageModule } from './modules/SellerStorageModule';
import { AnalysisModule } from './modules/AnalysisModule';
import { join } from 'path';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'redis-14762.c15.us-east-1-4.ec2.redns.redis-cloud.com',
        port: 14762,
        username: 'default',
        password: 'NGLpoW9zLcSnsHsVdoP9Qj2lbsSBmmX2'
      },
    }),
    MailerModule.forRoot({
      transport: {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "hoangduy06104@gmail.com",
          pass: "ffgjiykuyumfvyqg",
        },
      },
      template: {
        dir: join(__dirname, 'views'),
        adapter: new HandlebarsAdapter(),
      },
    }),
    ConfigModule.forRoot({
      envFilePath: ['local.env', 'test.env', 'product.env'],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_HOST),
    AuthModule,
    UserModule,
    ProductModule,
    HistoryModule,
    BatchProductModule,
    TransporterBillModule,
    SellerStorageModule,
    AnalysisModule,
  ]
})
export class AppModule { }
