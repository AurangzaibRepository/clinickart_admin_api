import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Transform } from 'class-transformer';
import { getFileUrl } from '../common/helpers/file-path.helper';
import { DealTag } from '../deal-tags/deal-tag.entity';

@Entity('deals')
export class Deal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column('text')
  description: string;

  @Column({ type: 'varchar', length: 300 })
  @Transform(({ value }) =>
    getFileUrl(value, process.env.APP_URL || 'http://localhost:8000/api'),
  )
  image: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => DealTag, (dealTag) => dealTag.deal)
  dealTags: DealTag[];
}
