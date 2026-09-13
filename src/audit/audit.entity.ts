import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../users/user.entity';

export enum AuditAction {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export enum AuditEntityType {
  BRAND = 'BRAND',
  CATEGORY = 'CATEGORY',
  PRODUCT = 'PRODUCT',
  USER = 'USER',
  ORDER = 'ORDER',
}

@Entity('audit_logs')
export class AuditLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Column({ type: 'enum', enum: AuditAction })
  action: string;

  @Column({ type: 'enum', enum: AuditEntityType })
  entityType: string;

  @Column()
  entityId: number;

  @Column({ type: 'json', nullable: true })
  oldValues: Record<string, any> | null;

  @Column({ type: 'json', nullable: true })
  newValues: Record<string, any> | null;

  @CreateDateColumn()
  createdAt: Date;
}
