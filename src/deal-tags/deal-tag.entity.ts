import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Deal } from '../deals/deal.entity';

@Entity('deal_tags')
export class DealTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ManyToOne(() => Deal, (deal) => deal.dealTags)
  deal: Deal;
}
