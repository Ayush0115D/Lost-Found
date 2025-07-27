import React, { useState } from "react"
import { motion } from "framer-motion"
import { v4 as uuidv4 } from "uuid"

function VerifyClaim() {
  const [formData, setFormData] = useState({
    reportId: "",
    mobile: "",
    idProof: null,
    notes: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [claimId, setClaimId] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFormData((prev) => ({
      ...prev,
      idProof: file,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const uniqueId = "CLAIM-" + uuidv4().slice(0, 8).toUpperCase()
    setClaimId(uniqueId)
    setSubmitted(true)
    console.log("Claim submitted:", formData, "Generated Claim ID:", uniqueId)
  }

  const handlePrint = () => {
    window.print()
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl mx-auto bg-[#121212] text-white p-8 mt-8 rounded-2xl shadow-2xl text-center"
      >
        <h2 className="text-3xl font-bold mb-4 text-green-400">Claim Submitted Successfully!</h2>
        <p className="mb-4">Thank you for submitting your claim request.</p>
        <p className="text-lg">
          <span className="font-semibold text-blue-400">Claim ID:</span> {claimId}
        </p>
        <p className="text-sm text-gray-400 mt-2">Please keep this ID for reference.</p>
        <button
          onClick={handlePrint}
          className="mt-6 px-6 py-2 bg-green-700 hover:bg-green-600 text-white rounded"
        >
          Print / Save Acknowledgment
        </button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto bg-[#121212] text-white p-8 mt-8 rounded-2xl shadow-2xl"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-white">Verification & Claim Form</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          name="reportId"
          placeholder="Enter Report ID"
          value={formData.reportId}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400"
          required
        />
        <input
          type="text"
          name="mobile"
          placeholder="Registered Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400"
          required
        />
        <div>
          <label className="block mb-1 text-sm text-gray-300">Upload ID Proof</label>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
            className="w-full p-2 bg-gray-800 text-white border border-gray-600 rounded"
            required
          />
        </div>
        <textarea
          name="notes"
          placeholder="Any additional notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400"
          rows={3}
        />
        <button
          type="submit"
          className="w-full py-3 rounded bg-blue-600 hover:bg-blue-700 transition font-semibold"
        >
          Submit Claim
        </button>
      </form>
    </motion.div>
  )
}

export default VerifyClaim;
