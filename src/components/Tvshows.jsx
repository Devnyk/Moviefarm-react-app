import {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Loading from "./Loading";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import Cards from "./partials/Cards";
import InfiniteScroll from "react-infinite-scroll-component";

const Tvshows = () => {


  document.title = "Moviefarm | Tv Shows";
  const navigate = useNavigate();
  const [category, setcategory] = useState("airing_today");
  const [tv, settv] = useState([]);
  const [page, setpage] = useState(1)
  const [hasMore, setHasMore] = useState(true); 


  const GetTv = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);

      // settrending(data.results);
      settv((prevState)=>[...prevState, ...data.results])
      setpage((prePage)=> prePage + 1)

      // Check if there's more data to load
      if (data.results.length === 0) {
      setHasMore(false);
      }

    } catch (error) {
      console.log("Error: ", error);
    }
  };

  console.log(tv);

  useEffect(() => {
    settv([])
    setpage(1)
    GetTv();
  }, [category]);

  return tv.length > 0 ? (
    <div className="w-screen h-screen bg-[#1F1E24]">
      <div className="w-full flex items-center justify-between px-[5%] mt-[2%]">
        <h1 className="text-2xl text-zinc-400 font-semibold flex items-center">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line text-2xl text-zinc-400 hover:text-[#6556CD] font-semibold mr-3 "
          ></i>
          Tv Shows <small className="text-lg ml-4 text-[#6556CD]">({category})</small>
        </h1>

        <div className="flex items-center w-[80%]">
          <Topnav></Topnav>
          <Dropdown
            title="category"
            options={["on_the_air", "popular", "upcoming", "airing_today"]}
            func={(e) => setcategory(e.target.value)}
          ></Dropdown>

          <div className="w-[2%]"></div>
        </div>
      </div>

      <InfiniteScroll dataLength={tv.length} next={GetTv} hasMore={hasMore} loader={<h1>Loading...</h1>}>
        <Cards data={tv} title="tv"></Cards>
      </InfiniteScroll>
    </div>
  ) : (
    <Loading></Loading>
  );
}

export default Tvshows