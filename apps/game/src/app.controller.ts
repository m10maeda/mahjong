import { Controller, Get } from '@nestjs/common';

import { AppService } from '@/app.service';

@Controller()
export class AppController {
  private readonly appService: AppService;

  @Get()
  public getHello(): string {
    return this.appService.getHello();
  }

  public constructor(appService: AppService) {
    this.appService = appService;
  }
}
