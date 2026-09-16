import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from '../orders/order.entity';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  firstName: string;

  @Column({ type: 'varchar', length: 100 })
  lastName: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 500 })
  password: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}
