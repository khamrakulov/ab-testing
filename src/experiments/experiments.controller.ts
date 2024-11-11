import {
  Controller,
  Get,
  Headers,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ExperimentsService } from './experiments.service';

@Controller('experiments')
export class ExperimentsController {
  constructor(private readonly experimentsService: ExperimentsService) {}

  @Get()
  async getExperiments(@Headers('device-token') deviceToken: string) {
    if (!deviceToken) {
      throw new HttpException(
        'Device-Token is missing',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.experimentsService.assignExperiment(deviceToken);
  }

  @Get('stats')
  async getStats() {
    return await this.experimentsService.getStats();
  }
}
