import { IsNotEmpty, IsEmail } from 'class-validator';
export class AccountDto {
  id: number;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  password: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  premdays: number;
  premdays_purchased: number;
  lastday: number;
  type: number;
  coins: number;
  coins_transferable: number;
  tournament_coins: number;
  creation: number;
  recruiter: number;
}
