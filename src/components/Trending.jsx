import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import axios from "../utils/axios";
import Cards from "./partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";


const Trending = () => {
  document.title = "Moviefarm | Trending";
  const navigate = useNavigate();
  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [trending, settrending] = useState([]);
  const [page, setpage] = useState(1)
  const [hasMore, setHasMore] = useState(true);


  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);

      // settrending(data.results);
      settrending((prevState)=>[...prevState, ...data.results])
      setpage((prePage)=> prePage + 1)

      // Check if there's more data to load
      if (data.results.length === 0) {
      setHasMore(false);
      }

    } catch (error) {
      console.log("Error: ", error);
    }
  };

  console.log(trending);

  useEffect(() => {
    settrending([])
    setpage(1)
    GetTrending();
  }, [category, duration]);

  return trending.length > 0 ? (
    <div className="w-screen h-screen bg-[#1F1E24]">
      <div className="w-full flex items-center justify-between px-[5%] mt-[2%]">
        <h1 className="text-2xl text-zinc-400 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line text-2xl text-zinc-400 hover:text-[#6556CD] font-semibold mr-3"
          ></i>
          Trending
        </h1>

        <div className="flex items-center w-[80%]">
          <Topnav></Topnav>
          <Dropdown
            title="category"
            options={["movie", "tv", "all"]}
            func={(e) => setcategory(e.target.value)}
          ></Dropdown>
          {/* for gap btw both dropdown using div*/}
          <div className="w-[2%]"></div>
          <Dropdown
            title="duration"
            options={["week", "day"]}
            func={(e) => setduration(e.target.value)}
          ></Dropdown>
        </div>
      </div>

      <InfiniteScroll dataLength={trending.length} next={GetTrending} hasMore={hasMore} loader={<h1>Loading...</h1>}>
        <Cards data={trending} title={category}></Cards>
      </InfiniteScroll>
    </div>
  ) : (
    <Loading></Loading>
  );
};

export default Trending;
