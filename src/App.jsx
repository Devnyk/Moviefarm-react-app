import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Trending from "./components/Trending"
import Popular from "./components/Popular"
import Movie from "./components/Movie"
import Tvshows from "./components/Tvshows"
import People from "./components/People"
import Moviedetails from "./components/Moviedetails"
import TvDetails from "./components/TvDetails"
import PersonDetails from "./components/PersonDetails"
import Trailer from "./components/partials/Trailer"
import Notfound from "./components/Notfound"


const App = () => {
  return (
    <div className="w-screen h-screen bg-[#1F1E24] flex">

<Routes>
  <Route path="/" element={<Home></Home>}></Route>
  <Route path="/trending" element={<Trending></Trending>}></Route>
  <Route path="/popular" element={<Popular></Popular>}></Route>
  <Route path="/movie" element={<Movie></Movie>}></Route>
  <Route path="/movie/details/:id" element={<Moviedetails></Moviedetails>}>
  <Route path="/movie/details/:id/trailer" element={<Trailer></Trailer>}></Route>
  </Route> {/* Fixed typo */}
  <Route path="/tvshow" element={<Tvshows></Tvshows>}></Route>
  <Route path="/tv/details/:id" element={<TvDetails></TvDetails>}>
  <Route path="/tv/details/:id/trailer" element={<Trailer></Trailer>}></Route>
  </Route> {/* Fixed typo */}
  <Route path="/people" element={<People></People>}></Route>
  <Route path="/person/details/:id" element={<PersonDetails></PersonDetails>}></Route> {/* Fixed typo */}
  <Route path="*" element={<Notfound></Notfound>}></Route>
  
  
</Routes>


    </div>
  )
}

export default App