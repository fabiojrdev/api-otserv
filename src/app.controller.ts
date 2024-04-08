import { Controller, Get, Post, Body, Query } from '@nestjs/common';
@Controller()
export class AppController {
  constructor() {}

  @Post('/')
  accountCreate() {
    return;
  }
}
