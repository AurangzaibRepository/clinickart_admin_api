import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  meta?: Record<string, any>;
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return {
          success: data?.success,
          message: data?.message,
          meta: data?.meta,
          data: data?.data ?? data,
        };
      }),
    );
  }
}
