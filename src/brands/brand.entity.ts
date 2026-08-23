import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Transform } from 'class-transformer';
import { Product } from '../products/product.entity';
import { getFileUrl } from 'src/common/helpers/file-path.helper';

@Entity('brands')
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column('text')
  description: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  @Transform(({ value }) => getFileUrl(value, process.env.APP_URL))
  logo: string;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}
