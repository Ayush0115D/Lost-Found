import React, { useState } from "react";
import Select from "react-select";
import { metroLines, getStationsForLine } from "./stations";
import { v4 as uuidv4 } from "uuid";
import PhotoUploadSection from "./PhotoUploadSection";

function LostForm() {
  const [selectedLine, setSelectedLine] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [reportId, setReportId] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    description: "",
    metroCardOrQR: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const id = "LOST-" + uuidv4().slice(0, 8).toUpperCase();
    setReportId(id);

    const data = new FormData();
    data.append("itemDescription", formData.description);
    data.append("station", selectedStation?.label || "");
    data.append("metroLine", selectedLine?.label || "");
    data.append("metroCardOrQR", formData.metroCardOrQR);
    data.append("reportId", id);
    data.append("fullName", formData.fullName);
    data.append("contactNumber", formData.contactNumber);
    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      const res = await fetch("http://localhost:5000/api/lost-items", {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("Submission failed: " + result.error);
      }
    } catch (err) {
      console.error("Submission Error:", err);
      alert("Something went wrong.");
    }
  };

  if (submitted) {
    return (
      <div className="text-center text-white bg-[#121212] p-10 rounded-2xl max-w-xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Report Submitted!</h2>
        <p className="mb-2">Thank you for reporting your lost item.</p>
        <p className="font-semibold mb-4">
          Your Report ID is: <span className="text-blue-400">{reportId}</span>
        </p>
        <button
          onClick={() => window.print()}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Print Acknowledgment
        </button>
      </div>
    );
  }

  return (
    <div className="bg-black text-white rounded-2xl shadow-2xl p-8 max-w-3xl mx-auto mt-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">
        Report a Lost Item
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm mb-1">Your Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Enter a valid phone number"
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">
            Metro Card Number or QR Code
          </label>
          <input
            type="text"
            name="metroCardOrQR"
            value={formData.metroCardOrQR}
            onChange={handleChange}
            placeholder="Enter Metro Card or QR Code number"
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Item Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the lost item..."
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-sm mb-1">Metro Line</label>
          <Select
            options={metroLines}
            value={selectedLine}
            onChange={(line) => {
              setSelectedLine(line);
              setSelectedStation(null);
            }}
            className="text-black"
            placeholder="Select a metro line"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Station</label>
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
          <PhotoUploadSection onUpload={setImageFile} />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded bg-blue-600 hover:bg-blue-700 transition"
        >
          Submit Lost Item
        </button>
      </form>
    </div>
  );
}

export default LostForm;
