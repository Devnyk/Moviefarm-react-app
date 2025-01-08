import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import noimage from "/noimage.jpg"
 
const Topnav = () => {
  const [query, setQuery] = useState("");

  const [searches, setSearches] = useState([]);

  const getSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      console.log(data);
      setSearches(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    getSearches();
  }, [query]);

  return (
    //-------this is the topbar--------
    
    <div className=" w-[80%] h-[10vh] relative flex mx-auto items-center">
      <i className="text-3xl text-zinc-400 ri-search-line "></i>
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="w-[50%] text-white mx-10 p-5 text-xl outline-none border-none rounded-lg bg-zinc-800 shadow-xl"
        type="text"
        placeholder="Search your fav"
      />

      {query.length > 0 && (
        <i
          onClick={() => setQuery("")}
          className="right-0 text-3xl text-zinc-400 ri-close-fill"
        ></i>
      )}

      {/* ----------here is the code for box below search bar-------*/}

      <div className="z-[100] absolute w-[55%] max-h-[50vh] bg-zinc-200 top-[100%] left-[5%] overflow-auto">
        {searches.map((s, i) => (
          <Link 
            to={`/${s.media_type}/details/${s.id}`}
            key={i}
            className="font-semibold text-zinc-600 hover:text-black hover:bg-zinc-300 duration-300 inline-block w-full p-10 flex justify-start items-center border-b-2 border-zinc-100"
          >
            <img
              className="w-[10vh] h-[10vh] object-cover rounded mr-5 shadow-lg"
              src={s.backdrop_path || s.profile_path ? `https://image.tmdb.org/t/p/original/${
                s.backdrop_path || s.profile_path
              }` : noimage
            }
              alt=""
            />
            <span>
              {s.original_title || s.name || s.title || s.original_name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Topnav;
