import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Transform } from 'class-transformer';
import { Product } from '../products/product.entity';
import { getFileUrl } from '../common/helpers/file-path.helper';

@Entity('brands')
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

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}
