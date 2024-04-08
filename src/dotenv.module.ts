// src/dotenv.module.ts
import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DotEnv } from './dotenv.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [DotEnv],
  exports: [DotEnv],
})
export class DotEnvModule {}
