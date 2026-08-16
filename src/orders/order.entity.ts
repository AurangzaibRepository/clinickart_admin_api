import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  orderNumber: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0.0 })
  totalPrice: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;
}
