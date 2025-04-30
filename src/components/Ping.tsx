import { client } from "@/sanity/lib/client"
import { BLOG_VIEWS_QUERY } from "@/sanity/lib/query"

async function Ping() {
    return (
        <div className=" relative " >
            <div className="absolute -left-4 top-1" >
                <span className=" flex size-[11px] " >
                    <span className=" absolute inline-flex h-full w-full animate-ping 
                    rounded-full bg-violet-900 opacity-75" ></span>
                    <span className=" relative inline-flex size-[11px] rounded-full bg-violet-700" ></span>
                </span>
            </div>
        </div>
    )
}

export default Ping