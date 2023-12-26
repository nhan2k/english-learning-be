import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('MAIN_SERVICE') private client: ClientProxy,
  ) {}

  @Get()
  getHello(): string {
    this.client.emit('notifications', {});

    return this.appService.getHello();
  }
}
