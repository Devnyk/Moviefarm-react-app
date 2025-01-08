import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson, removeperson } from "../store/actions/personActions";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "./partials/HorizontalCards";

const PersonDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.person);
  console.log(info);

  useEffect(() => {
    dispatch(asyncloadperson(id));

    return () => {
      dispatch(removeperson());
    };
  }, [id]);

  return info ? (
    <div className="px-[5%] w-screen bg-[#1F1E24]">
      {/* Part 1 navigation */}
      <nav className="w-full h-[10vh] text-zinc-100 flex items-center gap-10 text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="ri-arrow-left-line text-2xl text-zinc-100 hover:text-[#6556CD] font-semibold mr-14 "
        ></Link>
      </nav>

      <div className="w-full flex">
        {/* Part 2 left poster and details */}
        <div className="w-[20%]">
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] w-[40vh] object-cover"
            src={`https://image.tmdb.org/t/p/original/${
              info.detail.profile_path || info.detail.backdrop_path
            }`}
            alt=""
          />
          <hr className="mt-10 mb-5 border-none h-[1.5px] bg-zinc-500" />

          {/* Social Media Links */}
          <div className="text-2xl text-white flex gap-5">
            {/* anchor links */}
            <a
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              <i className="ri-earth-fill"></i>
            </a>

            <a
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
            >
              <i className="ri-facebook-circle-fill"></i>
            </a>

            <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
            >
              <i className="ri-instagram-line"></i>
            </a>

            <a
              target="_blank"
              href={`https://www.twitter.com/${info.externalid.twitter_id}`}
            >
              <i className="ri-twitter-x-fill"></i>
            </a>
          </div>

          {/* Personal Info. */}
          <h1 className="text-2xl text-white font-semibold my-8">
            Personal Info.
          </h1>

          <h1 className="text-lg text-zinc-400 font-semibold">Known For</h1>
          <h1 className="text-zinc-400">{info.detail.known_for_department}</h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Gender</h1>
          <h1 className="text-zinc-400">
            {info.detail.gender === 2 ? "Male" : "Female"}
          </h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Birthday</h1>
          <h1 className="text-zinc-400">{info.detail.birthday}</h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">
            Place of Birth
          </h1>
          <h1 className="text-zinc-400">{info.detail.place_of_birth}</h1>
        </div>

        {/* Part 3 right Details & Informations */}
        <div className="w-[80%] ml-[5%]">
          <h1 className="text-6xl text-[#6556CD] font-black my-5" style={{ textShadow: "2px 2px 6px rgba(0, 0, 0, 0.5)" }}>
            {info.detail.name}
          </h1>

          <h1 className="text-xl text-zinc-400 font-semibold mt-10">
            Biography
          </h1>
          <p className="text-zinc-400  mt-3">
            {info.detail.biography.slice(0, 1600)}...
            <span className="text-zinc-500"> more</span>
          </p>

          <h1 className="text-xl text-zinc-400 font-semibold mt-8">
            Famous For
          </h1>
          {/* <HorizontalCards></HorizontalCards> */}
          <HorizontalCards data={info.combinedCredits.cast} />
        </div>
      </div>
    </div>
  ) : (
    <Loading></Loading>
  );
};

export default PersonDetails;
