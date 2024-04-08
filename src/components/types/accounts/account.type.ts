import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('accounts')
export class AccountsType {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;
  @Column({ type: 'varchar', length: 32, unique: true, default: '' })
  name: string;
  @Column({ type: 'text', default: '' })
  password: string;
  @Column({ type: 'varchar', length: 255, default: '' })
  email: string;
  @Column({ type: 'int', default: 0 })
  premdays: number;
  @Column({ type: 'int', default: 0 })
  premdays_purchased: number;
  @Column({ type: 'int', unsigned: true, default: 0 })
  lastday: number;
  @Column({ type: 'tinyint', unsigned: true, default: 1 })
  type: number;
  @Column({ type: 'int', unsigned: true, default: 0 })
  coins: number;
  @Column({ type: 'int', unsigned: true, default: 0 })
  coins_transferable: number;
  @Column({ type: 'int', unsigned: true, default: 0 })
  tournament_coins: number;
  @Column({ type: 'int', unsigned: true, default: 0 })
  creation: number;
  @Column({ type: 'int', default: 0 })
  recruiter: number;
}
