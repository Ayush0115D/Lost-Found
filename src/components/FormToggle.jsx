function FormToggle({ selectedForm, onChange }) {
  return (
    <div className="flex justify-center mb-6 space-x-4">
      <button
        onClick={() => onChange('lost')}
        className={`px-4 py-2 rounded-lg font-medium transition ${
          selectedForm === 'lost'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-800'
        }`}
      >
        Lost Item
      </button>
      <button
        onClick={() => onChange('found')}
        className={`px-4 py-2 rounded-lg font-medium transition ${
          selectedForm === 'found'
            ? 'bg-green-600 text-white'
            : 'bg-gray-200 text-gray-800'
        }`}
      >
        Found Item
      </button>
    </div>
  )
}

export default FormToggle
