"use client";
import React, { useState, useEffect } from "react";
import Results from "../results/Results";
import Loading from "@/app/loading";

const FetchMovie = () => {
  const [movieData, setMovieData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (page) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=uk-UK&page=${page}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setTimeout(() => {
        setMovieData((prevData) => {
          const newMovies = data.results.filter(
            (newMovie) => !prevData.some((movie) => movie.id === newMovie.id)
          );
          return [...prevData, ...newMovies];
        });
        setLoading(false);
      }, 500); // задержка в 500 миллисекунд
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 250 &&
        !loading
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <div className="text-center">
      <Results movieData={movieData} />
      {loading && <Loading />}
    </div>
  );
};

export default FetchMovie;
