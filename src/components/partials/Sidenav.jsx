import axios from "../../utils/axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Sidenav = () => {


  return (
    <div className="sidebar w-[20%] h-full border-r-2 border-zinc-200 p-10">
      <h1 className="text-2xl text-white font-bold">
        <i className="text-[#6556CD] ri-tv-fill mr-2"></i>
        <span className="text-2xl ">Moviefarm</span>
      </h1>
      <nav className="flex flex-col text-zinc-400 text-xl gap-3">
        <h1 className="text-white text-xl mt-10 mb-5 font-semibold">
          News Feeds
        </h1>
        <Link to="/trending" className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5">
        <i className="mr-2 ri-fire-fill"></i> Trending
        </Link>
        <Link to="/popular" className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5">
        <i className="mr-2 ri-bard-fill"></i> Popular
        </Link>
        <Link to="/movie" className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5">
        <i className="mr-2 ri-movie-2-fill"></i> Movies
        </Link>
        <Link to="/tvshow" className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5">
        <i className="mr-2 ri-tv-fill"></i> Tv Shows
        </Link>
        <Link to="/people" className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5">
        <i className="mr-2 ri-team-fill"></i> People
        </Link>
      </nav>

      <hr className="border-none h-[1px] bg-zinc-400 mt-10" />

      <nav className="flex flex-col text-zinc-400 text-xl gap-2">
        <h1 className="text-white text-xl mt-10 mb-5 font-semibold">
          Website Info.
        </h1>
        <Link className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5">
        <i className="mr-2 ri-information-fill"></i> About Moviefarm.
        </Link>
        <Link className="hover:bg-[#6556CD] hover:text-white duration-300 rounded-lg p-5">
        <i className="mr-2 ri-phone-fill"></i> Contact Us
        </Link>
      </nav>
    </div>
  );
};

export default Sidenav;
