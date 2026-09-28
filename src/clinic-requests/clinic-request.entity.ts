import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Transform } from 'class-transformer';

@Entity('clinic-requests')
export class ClinicRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  clinicName: string;

  @Column({ type: 'varchar', length: 100 })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 100 })
  city: string;

  @Column({ type: 'varchar', length: 100 })
  package: string;

  @Column({ type: 'text' })
  description: string;
}
