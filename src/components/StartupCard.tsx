import { formatDate } from "@/lib/utils"
import { EyeIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { Author, Startup } from "@/sanity/types"
import { author } from "@/sanity/schemaTypes/author"

export type StartupTypeCard = Omit<Startup, "author"> & {author:Author}

const StartupCard = ({post} :{ post: StartupTypeCard }) => {
    const { _createdAt, views, author:{_id: authorId, name, image: img}, _id, description, image, title, category } = post
    const createdAt = new Date(_createdAt)
    return (
        <li className="startup-card hover:shadow-none  hover:bg-red-50 group " >
            <div className=" flex-between " >
                <p className=" startup_card_date " >
                    {formatDate(createdAt)}
                </p>
                <div className=" flex gap-1.5 " >
                    <EyeIcon className=" size-6 text-red-500 " />
                    <span className=" text-16-medium " >{views}</span>
                </div>
            </div>

            <div className=" flex-between mt-5 gap-5 " >
                <div className=" flex-1 " >
                    <Link href={`/user/${authorId}`} >
                        <p className=" text-16-medium line-clamp-1 " >
                            {name}
                        </p>
                    </Link>
                    <Link href={`/startup/${_id}`} >
                        <h3 className=" text-26-semibold line-clamp-1 " >{title}</h3>
                    </Link>

                </div>
                <Link href={`/user/${authorId}`} >
                    <Image src={ img || "https://placehold.co/48x48"} alt={name || "avatar"} width={48} height={48} className=" rounded-full " />
                </Link>
            </div>

            <Link href={`/startup/${_id}`} >
                <p className=" startup-card-desc " >
                    {description}
                </p>

                <img src={image} alt="placeholder"  className=" startup-card_img " />
            </Link>

            <div className=" flex-between gap-3 mt-5 " >
                <Link href={`/query=${category?.toLowerCase()}`} >
                    <p className=" text-16-medium " >{category}</p>
                </Link>

                <Button className=" startup-card_btn " asChild >
                    <Link href={`/startup/${_id}`} >
                        Details
                    </Link>
                </Button>
            </div>

        </li>
    )
}

export default StartupCard