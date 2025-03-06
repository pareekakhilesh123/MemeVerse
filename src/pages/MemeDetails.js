import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { likeMeme, addComment } from "../redux/memeSlice";

export default function MemeDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { memes, likes, comments } = useSelector((state) => state.memes);

  const [meme, setMeme] = useState(null);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (memes.length > 0) {
      const memeData = memes.find((m) => m.id === id);
      if (memeData) setMeme(memeData);
    } else {
      axios.get("https://api.imgflip.com/get_memes").then((res) => {
        const memeData = res.data.data.memes.find((m) => m.id === id);
        if (memeData) setMeme(memeData);
      });
    }
  }, [id, memes]);

  if (!meme) return <h2 className="text-center">Meme not found!</h2>;

  return (
    <div className="max-w-xl text-black mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl text-black font-bold mb-4">{meme.name}</h1>
      <img src={meme.url} alt={meme.name} className="w-full rounded-md" />

      
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => dispatch(likeMeme(id))}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          ❤️ {likes[id] || 0} Likes
        </button>
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert("Meme link copied!");
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          📤 Share
        </button>
      </div>
 
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Comments</h2>
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
          <button
            onClick={() => {
              if (newComment.trim() === "") return;
              dispatch(addComment({ memeId: id, comment: newComment }));
              setNewComment("");
            }}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Add
          </button>
        </div>

   
        <ul className="mt-4">
          {(comments[id] || []).map((comment, index) => (
            <li key={index} className="p-2 border-b">{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
