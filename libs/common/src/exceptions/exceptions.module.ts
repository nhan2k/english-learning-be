import { Module } from '@nestjs/common';
import { ExceptionHandlerUtilService } from './exceptions.service';

@Module({
  imports: [],
  providers: [ExceptionHandlerUtilService],
  exports: [ExceptionModule],
})
export class ExceptionModule {}
