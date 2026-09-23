import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { Customer } from '../customer/customer.entity';
import { OrderItem } from '../order-items/order-item.entity';
import { OrderStatus } from '../enums/order-status.enum';
import { BaseEntity as CustomBaseEntity } from '../common/entities/base-entity';

@Entity('orders')
export class Order extends CustomBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  orderNumber: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0.0 })
  totalPrice: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PAYMENT_PENDING,
  })
  status: OrderStatus;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];
}
