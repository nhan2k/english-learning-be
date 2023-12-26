import { Injectable } from '@nestjs/common';
import { MongooseError } from 'mongoose';

@Injectable()
export class ExceptionHandlerUtilService {
  handleException(error: unknown, context: string): void {
    if (error instanceof MongooseError) {
      console.error(
        `Caught a MongoDB in ${context}, message: ${error.message}`,
      );
    } else {
      console.error(
        `Caught a general in ${context}, message: ${error}`,
      );
    }
  }
}
