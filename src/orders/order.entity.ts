import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Customer } from 'src/customer/customer.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  orderNumber: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0.0 })
  totalPrice: number;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;
}
