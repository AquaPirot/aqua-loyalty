import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RewardsService } from './rewards.service';
import { GetUser } from '../auth/decorators';

@Controller('rewards')
@UseGuards(JwtAuthGuard)
export class RewardsController {
 constructor(private rewardsService: RewardsService) {}

 @Get()
 async getAllRewards() {
   return this.rewardsService.getAllRewards();
 }

 @Post(':id/redeem')
 async redeemReward(
   @GetUser('id') userId: number,
   @Param('id') rewardId: string,
 ) {
   return this.rewardsService.redeemReward(userId, parseInt(rewardId));
 }
}
