import { Injectable } from '@nestjs/common';
import { ClientSession, startSession } from 'mongoose';

@Injectable()
export class DatabaseService {

  constructor() {}

  async startTransaction(): Promise<ClientSession> {
    const session = await startSession();
    session.startTransaction();

    return session;
  }
}
