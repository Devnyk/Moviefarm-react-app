import {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Loading from "./Loading";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import Cards from "./partials/Cards";
import InfiniteScroll from "react-infinite-scroll-component";

const Popular = () => {
  document.title = "Moviefarm | Popular";
  const navigate = useNavigate();
  const [category, setcategory] = useState("movie");
  const [popular, setpopular] = useState([]);
  const [page, setpage] = useState(1)
  const [hasMore, setHasMore] = useState(true); 




  const GetPopular = async () => {
    try {
      const { data } = await axios.get(`${category}/popular?page=${page}`);

      // settrending(data.results);
      setpopular((prevState)=>[...prevState, ...data.results])
      setpage((prePage)=> prePage + 1)

      // Check if there's more data to load
      if (data.results.length === 0) {
      setHasMore(false);
      }

    } catch (error) {
      console.log("Error: ", error);
    }
  };

  console.log(popular);

  useEffect(() => {
    setpopular([])
    setpage(1)
    GetPopular();
  }, [category]);

  return popular.length > 0 ? (
    <div className="w-screen h-screen bg-[#1F1E24]">
      <div className="w-full flex items-center justify-between px-[5%] mt-[2%]">
        <h1 className="text-2xl text-zinc-400 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line text-2xl text-zinc-400 hover:text-[#6556CD] font-semibold mr-3"
          ></i>
          Popular
        </h1>

        <div className="flex items-center w-[80%]">
          <Topnav></Topnav>
          <Dropdown
            title="category"
            options={["tv", "movie"]}
            func={(e) => setcategory(e.target.value)}
          ></Dropdown>
          {/* for gap btw both dropdown using div*/}
          <div className="w-[2%]"></div>
        </div>
      </div>

      <InfiniteScroll dataLength={popular.length} next={GetPopular} hasMore={hasMore} loader={<h1>Loading...</h1>}>
        <Cards data={popular} title={category}></Cards>
      </InfiniteScroll>
    </div>
  ) : (
    <Loading></Loading>
  );
}

export default Popular