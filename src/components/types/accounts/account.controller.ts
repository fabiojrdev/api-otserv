import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AppServiceAccount } from './account.service';
import { AccountDto } from './account.dto';
import { AccountLoginDto } from './accountLogin.dto';

@Controller()
export class AppControllerAccount {
  constructor(private readonly AppServiceAccount: AppServiceAccount) {}

  @Post('/account')
  accountCreate(@Body() AccountDto: AccountDto) {
    return this.AppServiceAccount.updateAccount(AccountDto);
  }

  @Post('/auth')
  accountLogin(
    @Body() AccountLoginDto: AccountLoginDto,
    @Query() stayLoggedinQuery?: string,
    @Body() hash?: string,
    @Query() loginInVerify?: boolean,
    @Body() id?: number,
  ) {
    if (loginInVerify !== false && typeof id !== null && hash !== '') {
      return this.AppServiceAccount.loginAccount(
        AccountLoginDto,
        stayLoggedinQuery,
        hash,
        loginInVerify,
        id,
      );
    }
    return this.AppServiceAccount.loginAccount(
      AccountLoginDto,
      stayLoggedinQuery,
    );
  }
}
