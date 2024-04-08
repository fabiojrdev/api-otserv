import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DotEnv {
  constructor(private configService: ConfigService) {}

  dotenv(params: string): string {
    switch (params) {
      case 'SERVER_PORT':
        return this.configService.get<string>('SERVER_PORT', '');
      case 'MYSQL_IP':
        return this.configService.get<string>('MYSQL_IP', '');
      case 'MYSQL_PORT':
        return this.configService.get<string>('MYSQL_PORT', '');
      case 'MYSQL_DB':
        return this.configService.get<string>('MYSQL_DB', '');
      case 'MYSQL_USER':
        return this.configService.get<string>('MYSQL_USER', '');
      case 'MYSQL_PASSWORD':
        return this.configService.get<string>('MYSQL_PASSWORD', '');
      default:
        console.error('Not config data for:', params);
        return '';
    }
  }
}
