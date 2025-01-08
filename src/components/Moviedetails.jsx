import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie, removemovie } from "../store/actions/movieActions";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loading from "./Loading";
import HorizonatalCards from "./partials/HorizontalCards";

const Moviedetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.movie);
  console.log(info);

  useEffect(() => {
    dispatch(asyncloadmovie(id));

    return () => {
      dispatch(removemovie());
    };
  }, [id]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: {
          "custom-center": "50% 40%",
        },
      }}
      className="relative w-screen h-[155vh] px-[5%]"
    >
      {/* Part 1 navigation */}
      <nav className="w-full h-[10vh] text-zinc-100 flex items-center gap-10 text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="ri-arrow-left-line text-2xl text-zinc-100 hover:text-[#6556CD] font-semibold mr-14 "
        ></Link>

        {/*anchor tag for external id */}

        <a target="_blank" href={info.detail.homepage}>
          <i className="ri-external-link-line"></i>
        </a>

        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="ri-earth-fill"></i>
        </a>

        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
        >
          imdb
        </a>
      </nav>

      {/* Part 2 poster & details */}
      <div className="w-full flex">
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] w-[40vh] object-cover"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt=""
        />

        <div className="content ml-[5%] text-white">
          {/* heading */}
          <h1 className="text-5xl font-black text-white flex items-end gap-2" style={{ textShadow: "2px 2px 6px rgba(0, 0, 0, 0.5)" }}>
            {info.detail.original_title ||
              info.detail.name ||
              info.detail.title ||
              info.detail.original_name}

            {/*  Release Date */}
            <small className="text-2xl font-bold text-white bg-yellow-500 px-3 py-1 rounded-md">
              {info.detail.release_date.split("-")[0]}
            </small>
          </h1>

          {/* Rating */}
          <div className="flex items-center text-white text-lg mt-5 mb-10">
            <span className=" rounded-l-full bg-[#6556CD] text-xl font-semibold text-white w-[6vh] h-[5vh] flex justify-center items-center mr-2">
              {(info.detail.vote_average * 10).toFixed()}
              <sup>%</sup>
            </span>
            <h1 className="w-[60px] leading-5 font-semibold text-2xl mr-8">
              User Score.
            </h1>
            <h1 className="mr-8">{info.detail.release_date}</h1>
            <h1 className="mr-8">
              {info.detail.genres.map((g) => g.name).join(", ")}
            </h1>
            <h1>{info.detail.runtime}min</h1>
          </div>

          {/* tagline */}
          <h1 className="text-2xl font-semibold italic text-white">
            {info.detail.tagline}
          </h1>

          {/* overview */}
          <h1 className="text-2xl mt-5 mb-2 font-semibold">Overview</h1>
          <p className="w-[60%] mb-10">{info.detail.overview}</p>

          {/* translations */}
          <h1 className="text-2xl mt-5 mb-2 font-semibold">Movie Translated</h1>
          <p className="w-[75%] mb-12">{info.translations.join(", ")}</p>

          {/* trailer button */}
          <Link
            className="p-5 bg-[#6556CD] rounded-full hover:bg-white hover:text-black hover:border-[#6556CD]"
            to={`${pathname}/trailer`}
          >
            <i className="text-xl ri-play-fill"></i> Play Trailer
          </Link>
        </div>
      </div>

      {/* Part 3 Availbale on platforms*/}
      <div className="w-[80%] flex flex-col gap-y-5 mt-10">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex items-center gap-x-10">
            <h1 className="text-white">Available on Platform :</h1>
            {info.watchproviders.flatrate.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-fit rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex items-center gap-x-10">
            <h1 className="text-white">Available on Rent :</h1>
            {info.watchproviders.rent.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-fit rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex items-center gap-x-10">
            <h1 className="text-white">Available to Buy :</h1>
            {info.watchproviders.buy.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-fit rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}
      </div>

      {/* Part 4 Recommendations and Similar Stuff */}
      <hr className="mt-16 border-none h-[1.5px] bg-zinc-500" />
      <h1 className="text-3xl font-bold text-white mt-8 mb-3">
        You may also like
      </h1>
      <HorizonatalCards
        data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        }
      ></HorizonatalCards>
      <Outlet></Outlet>
    </div>
  ) : (
    <Loading></Loading>
  );
};

export default Moviedetails;
