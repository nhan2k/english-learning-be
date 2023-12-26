import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';
import { CommonModule } from '@app/common';
import { VocabularyModule } from './vocabulary/vocabulary.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MAIN_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'english-learning',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    CommonModule,
    VocabularyModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'MAIN_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://localhost:5672'],
            queue: 'english-learning',
            queueOptions: {
              durable: false,
            },
          },
        });
      },
    },
  ],
})
export class AppModule {}
