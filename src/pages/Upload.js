import { useState } from "react";
import axios from "axios";

export default function  Upload() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");

  const API_KEY = "477f2c7155abeb6c11f1e50dbc2a387f";

   
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

 
  const handleUpload = async () => {
    if (!image) {
      alert("Please upload an image!");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${API_KEY}`,
        formData
      );
      setUploadedUrl(response.data.data.url);
      alert("Meme Uploaded Successfully!");
    } catch (error) {
      console.error("Upload Failed:", error);
      alert("Upload Failed!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-black">Upload Your Meme</h2>
 
      <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4 text-black" />

    
      {preview && (
        <div className="mb-4">
          <img src={preview} alt="Meme Preview" className="w-full h-auto rounded-md " />
        </div>
      )}

      {/* Caption Input */}
      <textarea
        className="w-full p-2 border rounded-md"
        placeholder="Add a funny caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      ></textarea>

    
      <button
        onClick={handleUpload}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload Meme"}
      </button>
 
      {uploadedUrl && (
        <div className="mt-4 p-2 bg-green-100 rounded-md">
          <p>✅ Meme Uploaded Successfully!</p>
          <a href={uploadedUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">
            View Meme
          </a>
        </div>
      )}
    </div>
  );
}
