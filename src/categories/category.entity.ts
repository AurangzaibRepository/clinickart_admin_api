import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Transform } from 'class-transformer';
import { Product } from '../products/product.entity';
import { getFileUrl } from 'src/common/helpers/file-path.helper';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column('text')
  description: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  @Transform(({ value }) => getFileUrl(value, process.env.APP_URL))
  image: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
