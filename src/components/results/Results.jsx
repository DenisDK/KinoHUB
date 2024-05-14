import React from "react";
import Card from "../card/Card";

const Results = ({ movieData }) => {
  return (
    <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 max-w-screen-2xl mx-auto py-10">
      {movieData.map((movie) => (
        <Card key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default Results;
