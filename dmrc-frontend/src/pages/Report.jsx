
import { useSearchParams } from "react-router-dom"
import LostForm from "../components/LostForm"
import FoundForm from "../components/FoundForm"
import FeatureSection from "../components/FeatureSection" // Reusing FeatureSection component

function Report() {
  const [searchParams] = useSearchParams()      
  const type = searchParams.get("type")

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 md:px-8">
      {type === "lost" && <LostForm />}
      {type === "found" && <FoundForm />}

      {/* Reusable Feature Section */}
      <div className="mt-20">
            <FeatureSection />
      </div>
    </div>
  )
}

export default Report
