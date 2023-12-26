import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/database.service';
import { ExceptionModule } from './exceptions/exceptions.module';
import { ExceptionHandlerUtilService } from './exceptions/exceptions.service';

@Module({
  imports: [DatabaseModule, ExceptionModule],
  providers: [CommonService, DatabaseService, ExceptionHandlerUtilService],
  exports: [CommonService, DatabaseService, ExceptionHandlerUtilService],
})
export class CommonModule {}
