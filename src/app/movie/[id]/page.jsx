import Image from "next/image";
import React from "react";

// Icons
import { FiThumbsUp } from "react-icons/fi";

const MoviePage = async ({ params }) => {
  const movieId = params.id;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}&language=uk-UK`
  );
  const movie = await res.json();
  return (
    <div className="w-full">
      <div className="p-4 md:pt-8 flex flex-col lg:flex-row content-center max-w-screen-2xl mx-auto gap-4">
        <Image
          src={`https://image.tmdb.org/t/p/original/${
            movie.backdrop_path || movie.poster_path
          }`}
          width={600}
          height={300}
          className="rounded-lg md:w-full"
          alt="Movir poster"
          style={{ maxWidth: "100%", height: "100%" }}
        />
        <div className="py-2">
          <h2 className="text-lg mb-3 font-bold">
            {movie.title || movie.name}
          </h2>
          <p className="text-lg mb-3">{movie.overview}</p>
          <p className="mb-3">
            <span className="font-semibold mr-1">Date Released:</span>
            {movie.release_date || movie.first_air_date}
          </p>
          <p className="mb-3">
            <span className="font-semibold mr-1 flex items-center gap-3">
              Rating:
              <span>{movie.vote_count}</span>
              <FiThumbsUp />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
