import Image from "next/image";
import Link from "next/link";
import React from "react";

// Icons
import { FiThumbsUp } from "react-icons/fi";

const Card = ({ movie }) => {
  return (
    <div className="group cursor-pointer sm:hover:shadow-gray-00 dark:sm:hover:shadow-gray-600 sm:shadow-md rounded-2xl sm:m-2 transition-shadow duration-200">
      <Link href={`/movie/${movie.id}`}>
        <div className="relative">
          <Image
            src={`https://image.tmdb.org/t/p/original/${
              movie.backdrop_path || movie.poster_path
            }`}
            width={500}
            height={300}
            className="sm:rounded-t-lg rounded-2xl group-hover:opacity-75 transition-opacity duration-300"
            alt="Movie poster"
            title={`${movie.title || movie.name}\n${movie.overview}`}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black rounded-b-2xl rounded-t-xl bg-opacity-50 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h2 className="text-lg font-bold truncate">
              {movie.title || movie.name}
            </h2>
            <p className="line-clamp-2 text-md">{movie.overview}</p>
            <p className="flex items-center justify-center">
              {movie.release_date || movie.first_air_date}
              <FiThumbsUp className="h-5 mr-1 ml-3" />
              {movie.vote_count}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
