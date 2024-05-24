"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const MoviePage = async ({ params }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=uk-UK`
      );
      const movieData = await res.json();
      setMovie(movieData);

      // Check if movie is already saved in localStorage
      const storedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];
      const alreadyAdded = storedMovies.some((item) => item.id === movieData.id);
      setIsAdded(alreadyAdded);
    };

    fetchData();
  }, [params.id]);

  const handleAddToLocalStorage = () => {
    let storedMovies = localStorage.getItem("savedMovies");
    const updatedMovies = storedMovies ? JSON.parse(storedMovies) : [];

    if (!updatedMovies.find((item) => item.id === movie.id)) {
      updatedMovies.push(movie);
      localStorage.setItem("savedMovies", JSON.stringify(updatedMovies));
      setIsAdded(true);
    }
  };

  const handleRemoveFromLocalStorage = () => {
    let storedMovies = localStorage.getItem("savedMovies");
    if (storedMovies) {
      const updatedMovies = JSON.parse(storedMovies).filter((item) => item.id !== movie.id);
      localStorage.setItem("savedMovies", JSON.stringify(updatedMovies));
      setIsAdded(false);
    }
  };

  if (!movie) return null;

  return (
    <div className="w-full">
      <div className="p-4 md:pt-8 flex flex-col lg:flex-row items-center max-w-screen-2xl mx-auto gap-8">
        <div className="lg:w-1/3">
          <Image
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                : "/placeholder-image.jpg"
            }
            width={600}
            height={900}
            className="rounded-lg shadow-lg"
            alt="Movie poster"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
        <div className="lg:w-2/3">
          <h2 className="text-3xl mb-4 font-bold text-yellow-500">
            {movie.title || movie.name}
          </h2>
          <p className="text-xl mb-6">{movie.overview}</p>
          <div className="mb-6">
            <span className="font-semibold text-lg">Дата випуску: </span>
            <span className="text-lg">{movie.release_date || movie.first_air_date}</span>
          </div>
          <div className="flex items-center gap-3 text-lg">
            <span className="font-semibold">Рейтинг: </span>
            <span>{movie.vote_average}</span>
          </div>
          {isAdded ? (
            <button
              onClick={handleRemoveFromLocalStorage}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Вилучити з обраного
            </button>
          ) : (
            <button
              onClick={handleAddToLocalStorage}
              className={`mt-4 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400`}
            >
              Додати до обраного
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
