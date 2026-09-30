import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Check,
} from 'typeorm';
import { Brand } from '../brands/brand.entity';
import { Customer } from '../customer/customer.entity';

@Entity('brand_ratings')
@Check(`"rarting" >= 0 AND "rating" <= 5`)
export class BrandRating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 6, scale: 2 })
  rating: number;

  @ManyToOne(() => Brand, (brand) => brand.ratings)
  brand: Brand;

  @ManyToOne(() => Customer, (customer) => customer.brandRatings)
  customer: Customer;
}
