import { Body, ConflictException, Injectable, Query } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AccountsType } from './account.type';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountLoginDto } from './accountLogin.dto';
import { AccountDto } from './account.dto';
import * as functions from '../../systems/functions.system';

@Injectable()
export class AppServiceAccount {
  constructor(
    @InjectRepository(AccountsType)
    private AccountRepository: Repository<AccountsType>,
  ) {}

  async updateAccount(@Body() AccountDto: AccountDto): Promise<AccountsType> {
    functions.hashPassword(AccountDto.password);
    const existingAccountName = await this.AccountRepository.findOne({
      where: { name: AccountDto.name },
    });

    const existingAccountEmail = await this.AccountRepository.findOne({
      where: { email: AccountDto.email },
    });

    if (existingAccountName) {
      throw new ConflictException('A conta com este nome já está em uso.');
    } else if (existingAccountEmail) {
      throw new ConflictException('A conta com este e-mail já está em uso.');
    }
    AccountDto.password = functions.hashPassword(AccountDto.password);
    const newAccount = this.AccountRepository.create(AccountDto);
    await this.AccountRepository.save(newAccount);
    console.log('Conta Criada: ', newAccount);
    return newAccount;
  }

  async loginAccount(
    @Body() AccountLoginDto: AccountLoginDto,
    @Query() stayLoggedinQuery: string,
    @Body() hash?: string,
    @Query() loginInVerify?: boolean,
    @Body() id?: number,
  ) {
    // Check loginInVerify
    let loginVerify: boolean = null;
    let idAccount: number = null;
    let hashAccount = '';

    // Re-Login
    if (loginVerify === true && hashAccount && idAccount) {
      const existingAccount = await this.AccountRepository.find({
        where: {
          id: idAccount,
        },
      });
      console.log(
        'Olá bem vindo de volta ',
        existingAccount.map((obj) => obj.name).toString(),
      );
      return;
    }
    console.log('Login Verifiy status: ', loginVerify);

    // LoginIn Base
    const existingAccount = await this.AccountRepository.findOne({
      where: {
        name: AccountLoginDto.name,
        email: AccountLoginDto.email,
        password: functions.hashPassword(AccountLoginDto.password),
      },
    });

    // Check Name | Check Email | Check Password
    if (
      AccountLoginDto.name != existingAccount.name &&
      AccountLoginDto.email != existingAccount.email &&
      AccountLoginDto.password != existingAccount.password
    ) {
      if (AccountLoginDto.name != existingAccount.name) {
        throw new ConflictException('Name does not exist.');
      }
      if (AccountLoginDto.email != existingAccount.email) {
        throw new ConflictException('Email does not exist.');
      }
      if (AccountLoginDto.password != existingAccount.password) {
        throw new ConflictException('This is not the account password.');
      }
      return;
    }
    //Login is Name
    if (existingAccount.name) {
      console.log('login by name successfully!');
      console.log('ID: ', existingAccount.id);
      console.log('Login: ', existingAccount.name);
      console.log('Senha: ', existingAccount.password);

      //Check stayLoggedin
      if (stayLoggedinQuery === 'true') {
        loginVerify = true;
        idAccount = existingAccount.id;
        const stringLength = 128;
        hashAccount = functions.generateRandomString(stringLength);
        console.log('Hash: ', hashAccount);
      }
      console.log('Logou: ', loginVerify);
      const data = {
        name: existingAccount.name,
        email: existingAccount.email,
        coins: existingAccount.coins,
        premdays: existingAccount.premdays,
      };
      return data;
    }

    //Login is Email
    if (existingAccount.email) {
      console.log('login by email successfully!');
      console.log('ID: ', existingAccount.id);
      console.log('Login: ', existingAccount.email);
      console.log('Senha: ', existingAccount.password);

      //Check stayLoggedin
      if (stayLoggedinQuery === 'true') {
        loginVerify = true;
        idAccount = existingAccount.id;
        const stringLength = 128;
        hashAccount = functions.generateRandomString(stringLength);
        console.log('Hash: ', hashAccount);
      }
      console.log('Logou: ', loginVerify);
      const data = {
        name: existingAccount.name,
        email: existingAccount.email,
        coins: existingAccount.coins,
        premdays: existingAccount.premdays,
      };
      return data;
    }
  }
}
