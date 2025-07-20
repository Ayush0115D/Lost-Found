import { useState } from 'react'

function PhotoUploadSection({ onUpload }) {
  const [fileName, setFileName] = useState(null)

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      setFileName(file.name)
      onUpload(file)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      setFileName(file.name)
      onUpload(file)
    }
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed border-gray-400 rounded-md p-4 text-center"
    >
      <p className="text-gray-600 mb-2">Drag & drop an image here</p>
      <p className="text-gray-500 text-sm mb-2">or</p>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {fileName && <p className="mt-2 text-sm text-green-700">✔ Uploaded: {fileName}</p>}
    </div>
  )
}

export default PhotoUploadSection
