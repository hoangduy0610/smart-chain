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
import { DevelopModule } from './develop/develop.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['local.env', 'test.env', 'product.env'],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_HOST),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
        // Uncomment this to use custom user authentication for redis
        // username: process.env.REDIS_USERNAME,
        // password: process.env.REDIS_PASSWORD,
      },
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_SMTP_HOST,
        port: parseInt(process.env.MAIL_SMTP_PORT),
        auth: {
          user: process.env.MAIL_SMTP_USER,
          pass: process.env.MAIL_SMTP_PASS,
        },
      },
      template: {
        dir: join(__dirname, 'views'),
        adapter: new HandlebarsAdapter(),
      },
    }),
    AuthModule,
    UserModule,
    ProductModule,
    HistoryModule,
    BatchProductModule,
    TransporterBillModule,
    SellerStorageModule,
    AnalysisModule,

    ...(process.env.MODE !== 'test' ? [] : [
      // Test only module
      DevelopModule,
    ])
  ]
})
export class AppModule { }
