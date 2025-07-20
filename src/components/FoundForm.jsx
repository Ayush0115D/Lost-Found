function LostForm() {
  return (
    <form className="space-y-4">
      <input
        type="text"
        placeholder="Your Name"
        className="w-full px-4 py-2 border rounded-md"
      />
      <input
        type="tel"
        placeholder="Mobile Number"
        className="w-full px-4 py-2 border rounded-md"
      />
      <textarea
        placeholder="Describe the lost item..."
        className="w-full px-4 py-2 border rounded-md"
      ></textarea>
      <input
        type="text"
        placeholder="Lost Location / Station Name"
        className="w-full px-4 py-2 border rounded-md"
      />
      <input
        type="date"
        className="w-full px-4 py-2 border rounded-md"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Submit Lost Report
      </button>
    </form>
  )
}

export default LostForm
