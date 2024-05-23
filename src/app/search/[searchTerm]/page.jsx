import Results from "@/components/results/Results";
import Search from "@/components/search/Search";
import React from "react";

const SearchPage = async ({ params }) => {
  const seachTerm = params.searchTerm;
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${seachTerm}&language=uk-UK&page=1&include_adult=false`
  );
  const data = await res.json();
  const movieData = data.results;
  return (
    <div>
      <Search />
      {movieData &&
        movieData.length ===
        <h1 className="text-center pt-6">No results found</h1>}
      {movieData && <Results movieData={movieData} />}
    </div>
  );
};

export default SearchPage;
