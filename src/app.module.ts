import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExperimentsController } from './experiments/experiments.controller';
import { ExperimentsService } from './experiments/experiments.service';

@Module({
  imports: [],
  controllers: [AppController, ExperimentsController],
  providers: [AppService, ExperimentsService],
})
export class AppModule {}
