import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from 'src/orders/order.entity';

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

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}
