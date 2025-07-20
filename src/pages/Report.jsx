import { useSearchParams, useNavigate } from 'react-router-dom'
import LostForm from '../components/LostForm'
import FoundForm from '../components/FoundForm'

function Report() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const formType = searchParams.get('type')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          {formType === 'found' ? 'Report Found Item' : 'Report Lost Item'}
        </h2>

        {formType === 'found' ? <FoundForm /> : <LostForm />}

        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:underline font-medium"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default Report
