import { STARTUPS_QUERY } from "@/sanity/lib/query";
import SearchForm from "../../components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({searchParams} : {searchParams: Promise<{ query: string }>}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const session = await auth();

  console.log(session?.id)

  const {data: posts} = await sanityFetch({query: STARTUPS_QUERY, params})

  return (
    <>
      <section className=" pink_container pattern " >
        <h1 className=" heading font-work-sans  " >
          Be a pirate ☠︎ and comment with freedom 𐦍.
        </h1>
        <SearchForm query={query} />
      </section>

      <section className="section_container font-work-sans " >
        <p className=" text-30-semibold " >
          {query ? `Search results for "${query}"` : "All Anime"}
        </p>

        <ul className=" mt-7 card_grid" >
          {
            posts?.length > 0 ? 
              posts.map((post: StartupTypeCard) => 
              (
                <StartupCard key={post._id} post={post} />
              )) : 
              (
                <p className=" no-results " >No Startups Found</p>
              )
          }
        </ul>
      </section>
      <SanityLive/>
    </>
  );
}
