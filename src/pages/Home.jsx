import { useNavigate } from "react-router-dom"
import FeatureSection from "../components/FeatureSection"

function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-8">
        DMRC Lost & Found
      </h1>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row gap-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition"
          onClick={() => navigate("/report?type=lost")}
        >
          Report Lost Item
        </button>
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition"
          onClick={() => navigate("/report?type=found")}
        >
          Report Found Item
        </button>
      </div>

      {/* Reusable Feature Section */}
      <div className="mt-16 w-full">
        <FeatureSection />
      </div>
    </div>
  )
}

export default Home
