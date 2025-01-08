import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  console.log(data);

  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundSize: "cover",
        backgroundPosition: {
          "custom-center": "60% 20%",
        },
      }}
      className="w-full h-[60vh] flex flex-col justify-end items-start p-[4%]"
    >
      <h1 className="w-[60%] text-5xl font-black text-white">
        {data.original_title || data.name || data.title || data.original_name}
      </h1>

      <p className="w-[40%] text-white mt-3 mb-3">
        {data.overview.slice(0, 200)}...
        <Link
          to={`/${data.media_type}/details/${data.id}`}
          className="text-blue-300"
        >
          {" "}
          more
        </Link>
      </p>

      <p className="text-white">
        <i className="text-yellow-500 ri-megaphone-fill"></i>{" "}
        {data.release_date || "No Info."}
        <i className="text-yellow-500 ml-5 ri-album-fill"></i>{" "}
        {data.media_type.toUpperCase()}
      </p>
      <Link
        to={`/${data.media_type}/details/${data.id}/trailer`}
        className="bg-[#6556CD] p-3 mt-5 rounded-full text-white hover:bg-white hover:text-black"
      >
        {" "}
        <i className="text-xl ri-play-fill"></i>Watch Trailer
      </Link>
    </div>
  );
};

export default Header;
