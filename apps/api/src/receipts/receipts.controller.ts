import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReceiptsService } from './receipts.service';
import { ScanReceiptDto } from './dto';
import { GetUser } from '../auth/decorators';

@Controller('receipts')
@UseGuards(JwtAuthGuard)
export class ReceiptsController {
  constructor(private receiptsService: ReceiptsService) {}

  @Post('scan')
  async scanReceipt(
    @GetUser('id') userId: number,
    @Body() dto: ScanReceiptDto,
  ) {
    return this.receiptsService.scanReceipt(userId, dto);
  }

  @Get('history')
  async getHistory(@GetUser('id') userId: number) {
    return this.receiptsService.getHistory(userId);
  }
}
