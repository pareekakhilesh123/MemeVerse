import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";  

export default function MemeExplorer() {
  const [memes, setMemes] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const { likes } = useSelector((state) => state.memes); 

  const fetchMemes = async () => {
    try {
      const res = await axios.get("https://api.imgflip.com/get_memes");
      const newMemes = res.data.data.memes.slice((page - 1) * 20, page * 20);

      if (newMemes.length === 0) {
        setHasMore(false);
      } else {
        setMemes((prev) => [...prev, ...newMemes]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error fetching memes:", error);
    }
  };

  useEffect(() => {
    fetchMemes();
  }, []);

  const filteredMemes = memes.filter((meme) =>
    meme.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4  min-h-screen">
      
      <div className="flex justify-center mb-4">
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="Search memes..."
            className="p-2 pl-10 border rounded-md w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
        </div>
      </div>

      <h1 className="text-3xl font-bold text-center mb-4">Meme Explorer</h1>

    
      {search ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredMemes.length > 0 ? (
            filteredMemes.map((meme) => (
              <div
                key={meme.id}
                className="border p-2 rounded shadow bg-white flex flex-col items-center"
                style={{ height: "350px" }}
              >
                <img
                  src={meme.url}
                  alt={meme.name}
                  className="w-full h-48 object-cover rounded"
                />
                <h2 className="text-lg font-semibold mt-2 text-center text-black">{meme.name}</h2>
                
              
                <p className="mt-1 text-gray-600">❤️ {likes[meme.id] || 0} Likes</p>

                <button
                  onClick={() => navigate(`/meme/${meme.id}`)}
                  className="mt-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                  View Meme
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No memes found.</p>
          )}
        </div>
      ) : (
        <InfiniteScroll
          dataLength={memes.length}
          next={fetchMemes}
          hasMore={hasMore}
          loader={<h4 className="text-center">Loading more memes...</h4>}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {memes.map((meme) => (
              <div
                key={meme.id}
                className="border p-2 rounded shadow bg-white flex flex-col items-center"
                style={{ height: "350px" }}
              >
                <img
                  src={meme.url}
                  alt={meme.name}
                  className="w-full h-48 object-cover rounded"
                />
                <h2 className="text-lg font-semibold mt-2 text-center">{meme.name}</h2>

            
                <p className="mt-1 text-gray-600">❤️ {likes[meme.id] || 0} Likes</p>

                <button
                  onClick={() => navigate(`/meme/${meme.id}`)}
                  className="mt-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                  View Meme
                </button>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
}
