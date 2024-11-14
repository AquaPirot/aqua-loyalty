import { HomeHero } from '@/components/home/hero'
import { PointsDisplay } from '@/components/home/points-display'
import { RewardsSection } from '@/components/home/rewards-section'
import { ScanButton } from '@/components/scan-button'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HomeHero />
      <PointsDisplay />
      <ScanButton />
      <RewardsSection />
    </div>
  )
}
