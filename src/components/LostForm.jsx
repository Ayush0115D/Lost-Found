import React, { useState } from "react"
import Select from "react-select"
import { metroLines, getStationsForLine } from "./stations"
import { v4 as uuidv4 } from "uuid"

function LostForm() {
  const [selectedLine, setSelectedLine] = useState(null)
  const [selectedStation, setSelectedStation] = useState(null)
  const [image, setImage] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [reportId, setReportId] = useState("")

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith("image/")) {
      setImage(URL.createObjectURL(file))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const id = "LST-" + uuidv4().slice(0, 8).toUpperCase()
    setReportId(id)
    setSubmitted(true)
    console.log("Lost Item Submitted with ID:", id)
  }

  if (submitted) {
    return (
      <div className="text-center text-white bg-[#121212] p-10 rounded-2xl max-w-xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Report Submitted!</h2>
        <p className="mb-2">Thank you for reporting your lost item.</p>
        <p className="font-semibold mb-4">Your Report ID is: <span className="text-blue-400">{reportId}</span></p>
        <button
          onClick={() => window.print()}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Print Acknowledgment
        </button>
      </div>
    )
  }

  return (
    <div className="bg-black text-white rounded-2xl shadow-2xl p-8 max-w-3xl mx-auto mt-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">Report a Lost Item</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm mb-1">Your Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white"
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Your Contact Number</label>
          <input
            type="text"
            placeholder="Enter your number"
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white"
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Item Description</label>
          <textarea
            placeholder="Describe the item"
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-sm mb-1">At which Line</label>
          <Select
            options={metroLines}
            value={selectedLine}
            onChange={(line) => {
              setSelectedLine(line)
              setSelectedStation(null)
            }}
            className="text-black"
            placeholder="Select a metro line"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">At which Station</label>
          <Select
            options={getStationsForLine(selectedLine?.value)}
            value={selectedStation}
            onChange={setSelectedStation}
            className="text-black"
            placeholder="Select a station"
            isDisabled={!selectedLine}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded"
          />
          {image && (
            <img
              src={image}
              alt="Uploaded"
              className="mt-3 h-32 object-cover rounded"
            />
          )}
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded bg-blue-600 hover:bg-blue-700 transition"
        >
          Submit Lost Item
        </button>
      </form>
    </div>
  )
}

export default LostForm