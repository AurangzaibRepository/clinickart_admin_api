import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  DeleteDateColumn,
} from 'typeorm';
import { Transform } from 'class-transformer';
import { Category } from '../categories/category.entity';
import { Brand } from '../brands/brand.entity';
import { getFileUrl } from 'src/common/helpers/file-path.helper';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column('text')
  description: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  @Transform(({ value }) => getFileUrl(value, process.env.APP_URL))
  image: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Brand;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;
}
