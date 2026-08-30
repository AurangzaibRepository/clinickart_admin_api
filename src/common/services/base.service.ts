import { NotFoundException } from '@nestjs/common';
import {
  DeepPartial,
  FindOptionsWhere,
  FindOptionsRelations,
  Repository,
} from 'typeorm';
import { AuditEntityType } from 'src/audit/audit.entity';
import { AuditAction } from 'src/audit/audit.entity';
import { AuditService } from 'src/audit/audit.service';
import { JwtPayload } from 'src/auth/jwt.strategy';

interface BaseEntity {
  id: number;
}

interface AuditOptions {
  data?: Record<string, any>;
  fieldMap?: Record<string, string>;
}

export abstract class BaseService<T extends BaseEntity> {
  constructor(
    protected readonly repository: Repository<T>,
    protected readonly auditEntityType: AuditEntityType,
    protected readonly auditService: AuditService,
  ) {}

  async getDetails(id: number): Promise<T> {
    const entity = await this.repository.findOneBy({
      id,
    } as FindOptionsWhere<T>);

    if (!entity) {
      throw new NotFoundException('Record not found');
    }

    return entity;
  }

  async create(data: DeepPartial<T>, user: JwtPayload): Promise<T> {
    const entity = this.repository.create(data);
    const savedEntity = await this.repository.save(entity);

    await this.auditService.log(
      user.sub,
      AuditAction.CREATE,
      this.auditEntityType,
      savedEntity.id,
      null,
      data as Record<string, any>,
    );

    return savedEntity;
  }

  async update(
    id: number,
    data: DeepPartial<T>,
    user: JwtPayload,
    relations?: FindOptionsRelations<T>,
    audit?: AuditOptions,
  ): Promise<T | null> {
    const entity = await this.repository.findOne({
      where: { id } as FindOptionsWhere<T>,
      relations,
    });

    if (!entity) {
      throw new NotFoundException('Record not found');
    }

    // Calculate old and new values if changed
    const oldValues: Record<string, any> = {};
    const newValues: Record<string, any> = {};
    const dataForAudit = auditData ?? data;

    for (const key of Object.keys(dataForAudit)) {
      /*if (entity[key] != data[key]) {
                newValues[key] = data[key];
                oldValues[key] = entity[key];
            }*/

      // For relation object comparison
      const newValue = dataForAudit[key];
      const oldValue = entity[key];

      const newId =
        newValue && typeof newValue === 'object' ? newValue.id : newValue;

      const oldId =
        oldValue && typeof oldValue === 'object' ? oldValue.id : oldValue;

      if (oldId != newId) {
        oldValues[key] = oldId;
        newValue[key] = newId;
      }
    }

    Object.assign(entity, data);
    const savedEntity = await this.repository.save(entity);

    if (Object.keys(oldValues).length > 0) {
      await this.auditService.log(
        user.sub,
        AuditAction.UPDATE,
        this.auditEntityType,
        savedEntity.id,
        oldValues,
        newValues,
      );
    }

    return savedEntity;
  }
}
