function FoundForm() {
  return (
    <form className="space-y-4">
      <input
        type="text"
        placeholder="Your Name"
        className="w-full px-4 py-2 border rounded-md"
      />
      <input
        type="text"
        placeholder="Contact Info (Phone or Email)"
        className="w-full px-4 py-2 border rounded-md"
      />
      <textarea
        placeholder="Describe the found item..."
        className="w-full px-4 py-2 border rounded-md"
      ></textarea>
      <select className="w-full px-4 py-2 border rounded-md">
        <option value="">Where was it found?</option>
        <option value="train">In Metro Train</option>
        <option value="platform">At Platform</option>
        <option value="premises">At Station Premises</option>
      </select>
      <input
        type="date"
        className="w-full px-4 py-2 border rounded-md"
      />
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
      >
        Submit Found Report
      </button>
    </form>
  )
}

export default FoundForm
