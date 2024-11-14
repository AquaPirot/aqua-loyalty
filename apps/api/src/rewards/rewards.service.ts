import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RewardsService {
  constructor(private prisma: PrismaService) {}

  async getAllRewards() {
    return this.prisma.reward.findMany({
      where: { active: true },
      orderBy: { pointsRequired: 'asc' },
    });
  }

  async redeemReward(userId: number, rewardId: number) {
    const [user, reward] = await Promise.all([
      this.prisma.user.findUnique({ where: { id: userId } }),
      this.prisma.reward.findUnique({ where: { id: rewardId } }),
    ]);

    if (!reward) {
      throw new BadRequestException('Nagrada nije pronađena');
    }

    if (!reward.active) {
      throw new BadRequestException('Nagrada nije dostupna');
    }

    if (user.points < reward.pointsRequired) {
      throw new BadRequestException('Nedovoljno bodova');
    }

    // Generate unique reward code
    const rewardCode = this.generateRewardCode();

    // Create redemption record and update user points
    const [redemption, updatedUser] = await this.prisma.$transaction([
      this.prisma.rewardRedemption.create({
        data: {
          userId,
          rewardId,
          pointsSpent: reward.pointsRequired,
          rewardCode,
        },
      }),
      this.prisma.user.update({
        where: { id: userId },
        data: {
          points: {
            decrement: reward.pointsRequired,
          },
        },
      }),
    ]);

    return {
      redemption,
      rewardCode,
      remainingPoints: updatedUser.points,
    };
  }

  private generateRewardCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'AQ-';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }
}
