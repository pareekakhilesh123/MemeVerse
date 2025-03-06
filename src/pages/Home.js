import { useEffect } from "react";  
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setMemes } from "../redux/memeSlice";
import { Link } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const { memes, likes } = useSelector((state) => state.memes);

  useEffect(() => {
    if (memes.length === 0) {
      axios.get("https://api.imgflip.com/get_memes").then((res) => {
        dispatch(setMemes(res.data.data.memes));
      });
    }
  }, [dispatch, memes.length]);

  return (
    <div className="  mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6"> Trending Memes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {memes.map((meme) => (
          <div 
            key={meme.id} 
            className="h-[400px] flex flex-col justify-between p-4 rounded-lg shadow-md bg-white"
          >
            <Link to={`/meme/${meme.id}`} className="flex-grow flex items-center justify-center">
              <img 
                src={meme.url} 
                alt={meme.name} 
                className="w-full h-64 object-cover rounded-md"
              />
            </Link>
            <h2 className="text-lg font-semibold mt-2 text-center text-black">{meme.name}</h2>
            <p className="mt-1 text-black text-center">❤️ {likes[meme.id] || 0} Likes</p>
          </div>
        ))}
      </div>
    </div>
  );
}
