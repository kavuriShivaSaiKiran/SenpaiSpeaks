import { auth, signIn, signOut } from "@/auth"
import { BadgePlus, LogOut } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {Avatar, AvatarFallback, AvatarImage} from "./ui/avatar"

const Navbar = async() => {
    const session = await auth()
    return (
        <header className=" pl-2 pr-5 py-2 bg-white shadow-sm font-work-sans " >
            <nav className=" flex justify-between items-center " >
                <Link href={"/"}>
                    <Image src={"/logo.png"} alt="logo" width={112} height={30} />
                </Link>

                <div className=" flex gap-5 items-center text-black" >
                    {session && session?.user ?
                        <>
                            <Link href={'/startup/create'} >
                                <span className=" max-sm:hidden ">Create</span>
                                <BadgePlus className=" sm:hidden text-yellow-600 size-6 " />
                            </Link>
                            <form action={
                                async() => {
                                    "use server"
                                    await signOut({redirectTo: '/'})
                                }}
                                className=" flex items-center gap-2 "
                            >
                                <button type="submit"  >
                                    <span className=" max-sm:hidden ">Logout</span>
                                    <LogOut className=" sm:hidden text-red-500 size-6 " />
                                </button>
                            </form>
                            <Link href={`/user/${session?.id}`} >
                                <Avatar className=" size-8 " >
                                    <AvatarImage src={session?.user?.image || "https://placehold.co/48x48"} 
                                       alt={session?.user?.name || " "} width={48} height={48} />
                                    <AvatarFallback >AV</AvatarFallback>
                                </Avatar>
                            </Link>
                        </>
                        :
                        <form action={async() => {
                            "use server"

                            await signIn('google')
                        }} >
                            <button type="submit">Login</button>
                        </form>
                    }
                </div>
            </nav>
        </header>
    )
}

export default Navbar