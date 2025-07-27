import React, { useState } from "react"
import { motion } from "framer-motion"
import Select from "react-select"
import { metroLines, getStationsForLine } from "./stations"
import PhotoUploadSection from "./PhotoUploadSection"
import { v4 as uuidv4 } from "uuid"

const placeOptions = [
  { value: "Concourse", label: "Station Concourse" },
  { value: "Train", label: "Inside Train" },
  { value: "EntryExit", label: "Station Entry/Exit" },
  { value: "Platform", label: "Platform" },
  { value: "Security", label: "Security Check Area" },
]

function FoundForm() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    item: "",
    line: null,
    station: null,
    place: null,
  })
  const [submitted, setSubmitted] = useState(false)
  const [reportId, setReportId] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleLineChange = (selectedLine) => {
    setFormData((prev) => ({
      ...prev,
      line: selectedLine,
      station: null,
    }))
  }

  const handleStationChange = (selectedStation) => {
    setFormData((prev) => ({
      ...prev,
      station: selectedStation,
    }))
  }

  const handlePlaceChange = (selectedPlace) => {
    setFormData((prev) => ({
      ...prev,
      place: selectedPlace,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const id = "FND-" + uuidv4().slice(0, 8).toUpperCase()
    setReportId(id)
    setSubmitted(true)
    console.log("Found Item Form Submitted:", { ...formData, id })
  }

  const stationsOptions = formData.line ? getStationsForLine(formData.line.value) : []

  if (submitted) {
    return (
      <div className="text-center text-white bg-[#121212] p-10 rounded-2xl max-w-xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Report Submitted!</h2>
        <p className="mb-2">Thank you for reporting a found item.</p>
        <p className="font-semibold mb-4">Your Report ID is: <span className="text-green-400">{reportId}</span></p>
        <button
          onClick={() => window.print()}
          className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
        >
          Print Acknowledgment
        </button>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto bg-[#121212] p-8 rounded-2xl shadow-2xl text-blue-100"
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Report Found Item</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400"
          required
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={formData.contact}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400"
          required
        />
        <input
          type="text"
          name="item"
          placeholder="Found Item Description"
          value={formData.item}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400"
          required
        />
        <div>
          <label className="block mb-2 text-sm">At which line (of Delhi Metro)</label>
          <Select
            options={metroLines}
            value={formData.line}
            onChange={handleLineChange}
            placeholder="Select Metro Line"
            className="text-black"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm">At which station?</label>
          <Select
            options={stationsOptions}
            value={formData.station}
            onChange={handleStationChange}
            placeholder="Select Station"
            className="text-black"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm">At which place?</label>
          <Select
            options={placeOptions}
            value={formData.place}
            onChange={handlePlaceChange}
            placeholder="Select Place"
            className="text-black"
          />
        </div>
        <PhotoUploadSection />
        <button
          type="submit"
          className="bg-green-700 hover:bg-green-700 text-white py-3 px-6 rounded w-full font-semibold transition-all"
        >
          Submit Found Report
        </button>
      </form>
    </motion.div>
  )
}

export default FoundForm
