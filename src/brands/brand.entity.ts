import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Check,
} from 'typeorm';
import { Transform } from 'class-transformer';
import { Product } from '../products/product.entity';
import { getFileUrl } from '../common/helpers/file-path.helper';
import { BrandRating } from '../brand-ratings/brand-rating.entity';

@Entity('brands')
@Check(`"average_rating" >= 0 AND "average_rating" <= 5`)
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column('text')
  description: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  @Transform(({ value }) =>
    getFileUrl(
      value ? `uploads/${value}` : null,
      process.env.APP_URL || 'http://localhost:8000',
    ),
  )
  logo: string;

  @Column({
    type: 'decimal',
    precision: 6,
    scale: 2,
  })
  average_rating: number;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];

  @OneToMany(() => BrandRating, (rating) => rating.brand)
  ratings: BrandRating[];
}
