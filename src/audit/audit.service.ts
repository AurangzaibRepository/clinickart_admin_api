import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './audit.entity';
import { AuditAction, AuditEntityType } from './audit.entity';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditLog)
    private readonly auditRepository: Repository<AuditLog>,
  ) {}

  async log(
    userId: number,
    action: AuditAction,
    entityType: AuditEntityType,
    entityId: number,
    oldValues: Record<string, any> | null = null,
    newValues: Record<string, any> | null = null,
  ): Promise<AuditLog> {
    const auditLog = await this.auditRepository.create({
      user: { id: userId },
      action,
      entityType,
      entityId,
      oldValues,
      newValues,
    });

    return this.auditRepository.save(auditLog);
  }
}
