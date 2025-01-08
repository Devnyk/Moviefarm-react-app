import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTczOWJiNGEyOThjMjkyMzYwMDczYzQxM2U3OGYwMiIsIm5iZiI6MTczMzMyNjM2MS44MzUsInN1YiI6IjY3NTA3NjE5NDQ4NDdlOTdkZmY0MTAwOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0mMmSNDHdsLjG-hJRsmHUlY1Vdx26S5cJiezoUxpM5g",
  },
});

export default instance
