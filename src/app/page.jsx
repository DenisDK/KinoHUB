import Results from "@/components/results/Results";
import Search from "@/components/search/Search";

export default async function Home({ searchParams }) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&language=uk-UK&page=1`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  const movieData = data.results;

  return (
    <div className="text-center">
      <Search />
      <Results movieData={movieData} />
    </div>
  );
}
