import React, { useEffect, useState } from "react";
import Sidenav from "./partials/Sidenav";
import Topnav from "./partials/Topnav";
import axios from "../utils/axios";
import Header from "./partials/Header";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";
import Loading from "./Loading";

const Home = () => {
  document.title = "Moviefarm | Homepage";

  const [wallpaper, setwallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [catalog, setcatalog] = useState("all");

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      console.log(data);
      let randomdata =
        data.results[(Math.random() * data.results.length).toFixed()];
      setwallpaper(randomdata);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${catalog}/day`);

      setTrending(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    GetTrending();
    !wallpaper && GetHeaderWallpaper();
  }, [catalog]);

  return wallpaper && trending ? (
    <>
      <Sidenav></Sidenav>
      <div className="w-[80%] h-full overflow-auto overflow-x-hidden">
        <Topnav></Topnav>
        <Header data={wallpaper}></Header>

        <div className="mb-2 mt-6 flex justify-between items-center px-5">
          <h1 className="text-3xl text-zinc-400 font-semibold">Trending</h1>

          {/* Dropdown menu */}
          <Dropdown
            title="Filter"
            options={["tv", "movie", "all"]}
            func={(e) => setcatalog(e.target.value)}
          ></Dropdown>
        </div>

        <HorizontalCards data={trending}></HorizontalCards>
      </div>
    </>
  ) : (
    <Loading></Loading>
  );
};

export default Home;
