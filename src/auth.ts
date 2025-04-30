
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { client } from "./sanity/lib/client"
import { AUTHOR_BY_GOOGLE_ID } from "./sanity/lib/query"
import { writeClient } from "./sanity/lib/write-client"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: 
  {
    async signIn({ user: { name, email, image }, profile }) {
      const id = profile?.sub
      const existingUser = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GOOGLE_ID, { id })
    
      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id: id,
          name,
          username: email?.split('@')[0],
          email,
          image,
          bio: ""
        })
      }
    
      return true
    },
    

    async jwt({token, account, profile}){
      if(account && profile){
        const user = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_GOOGLE_ID, {id: profile?.sub})
        token.id = user?._id
      }

      return token

    },

    async session({session, token}){
      Object.assign(session, {
        id: token.id,})

      return session
    }

  }
})
