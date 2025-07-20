import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      <h1 className="text-4xl font-bold text-blue-900 mb-6 text-center">Lost & Found - DMRC</h1>
      <div className="space-x-4">
        <Link to="/report">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition">
            Report Lost Item
          </button>
        </Link>
        <Link to="/report?type=found">
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition">
            Report Found Item
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home
