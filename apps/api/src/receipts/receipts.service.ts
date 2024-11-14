import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ScanReceiptDto } from './dto';

@Injectable()
export class ReceiptsService {
  constructor(private prisma: PrismaService) {}

  async scanReceipt(userId: number, dto: ScanReceiptDto) {
    // Validate receipt
    const validationResult = await this.validateReceipt(dto);
    if (!validationResult.isValid) {
      throw new BadRequestException(validationResult.error);
    }

    // Calculate points
    const points = Math.floor(dto.amount / 200);

    // Save receipt and update points
    const [receipt, _] = await this.prisma.$transaction([
      this.prisma.receipt.create({
        data: {
          userId,
          amount: dto.amount,
          points,
          receiptNumber: dto.receiptNumber,
          qrData: dto.qrData,
        },
      }),
      this.prisma.user.update({
        where: { id: userId },
        data: {
          points: {
            increment: points,
          },
        },
      }),
    ]);

    return {
      points,
      receipt,
    };
  }

  async getHistory(userId: number) {
    return this.prisma.receipt.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  private async validateReceipt(dto: ScanReceiptDto) {
    // Implement receipt validation logic
    return { isValid: true };
  }
}
