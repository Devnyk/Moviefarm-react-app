import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Notfound from "../Notfound";

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);
  console.log(ytvideo);

  return (
    <div className="absolute z-[100] top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.8)] flex items-center justify-center">
      <Link
        onClick={() => navigate(-1)}
        className="absolute right-[6%] top-[6%] rounded-full ri-close-large-fill text-5xl text-zinc-100 hover:text-[#6556CD] font-semibold "
      ></Link>

      {ytvideo ? (
        <ReactPlayer
          controls
          height={600}
          width={1200}
          url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
        ></ReactPlayer>
      ) : (
        <Notfound></Notfound>
      )}
    </div>
  );
};

export default Trailer;
