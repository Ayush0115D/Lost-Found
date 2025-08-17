import FeatureCard from "./FeatureCard"
import { Clock, ShieldCheck, MapPin, Users } from "lucide-react"

function FeatureSection() {
  return (
    <div className="flex flex-col items-center px-4 md:px-0">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
        Why Choose DMRC Lost & Found?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full">
        <FeatureCard
          icon={<Clock className="text-blue-500 w-8 h-8" />}
          title="24/7 Service"
          description="Report and search for items anytime, anywhere across all Delhi Metro lines"
        />
        <FeatureCard
          icon={<ShieldCheck className="text-green-500 w-8 h-8" />}
          title="Secure Verification"
          description="QR code and metro card verification ensures items reach rightful owners"
        />
        <FeatureCard
          icon={<MapPin className="text-red-500 w-8 h-8" />}
          title="All Metro Lines"
          description="Covers Red, Blue, Yellow, Green, Violet, Pink, Magenta & Airport Express lines"
        />
        <FeatureCard
          icon={<Users className="text-purple-500 w-8 h-8" />}
          title="Community Driven"
          description="Passengers helping passengers - building a trustworthy metro community"
        />
      </div>
    </div>
  )
}

export default FeatureSection
