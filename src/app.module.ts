// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppControllerAccount } from './components/types/accounts/account.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DotEnvModule } from './dotenv.module';
import { DotEnv } from './dotenv.service';
import { AccountsType } from './components/types/accounts/account.type';
import { AppServiceAccount } from './components/types/accounts/account.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([AccountsType]),
    TypeOrmModule.forRootAsync({
      imports: [DotEnvModule],
      useFactory: async (config: DotEnv) => ({
        type: 'mysql',
        host: config.dotenv('MYSQL_IP'),
        port: +config.dotenv('MYSQL_PORT'),
        username: config.dotenv('MYSQL_USER'),
        password: config.dotenv('MYSQL_PASSWORD'),
        database: config.dotenv('MYSQL_DB'),
        entities: [AccountsType],
        synchronize: false,
      }),
      inject: [DotEnv],
    }),
  ],
  controllers: [AppControllerAccount, AppController],
  providers: [AppService, AppServiceAccount],
})
export class AppModule {}
