import { BLOG_VIEWS_QUERY } from "@/sanity/lib/query";
import Ping from "./Ping";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";
import {after} from "next/server"

export default async function View({id} : {id: string}) {
  const {views: totalViews} = await client.withConfig({useCdn: false}).fetch(BLOG_VIEWS_QUERY, {id})

  after(
    async ()=>
    await writeClient
      .patch(id)
      .set({views: totalViews + 1})
      .commit()
  )

  return (
    <div className=" view-container " >
      <div className=" absolute -top-2 -right-2 " >
        <Ping />
      </div>

      <p className=" view-text " >
        <span className=" font-black " >{totalViews} 
          <span className=" text-16-medium " > views</span>
        </span>
      </p>
      
    </div>
  )
}