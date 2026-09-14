import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from '../orders/order.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 60 })
  firstName: string;

  @Column({ type: 'varchar', length: 60 })
  lastName: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 80, nullable: true })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 500, select: false })
  password: string;
}
