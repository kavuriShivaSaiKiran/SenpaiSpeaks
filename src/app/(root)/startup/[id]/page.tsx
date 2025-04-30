import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { BLOG_QUERY_BY_ID } from '@/sanity/lib/query';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'
import markdownit from 'markdown-it';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';

export const experimental_ppr = true;
const page = async({params}: {params: Promise<{id: string}>}) => {
    const id = (await params).id;
    const post = await client.fetch(BLOG_QUERY_BY_ID, {id})
    
    if(!post) return notFound();

    const md = new markdownit();  

    const parserdContent = md.render(post.pitch || "");
    return (
        <>
            <section className=' pink_container !min-h-[230px] ' >
                <p className='tag' >{formatDate(new Date(post._createdAt))}</p>
                <h1 className=' heading ' >{post.title}</h1>
                <p className=' sub-heading !max-w-5xl ' >{post.description}</p>
            </section>

            <section className='section_container  ' >
                <img src={post.image || ""} alt="thumbnail" 
                className='w-full h-auto rounded-xl'  />

                <div className=' space-y-5 mt-10 max-w-4xl mx-auto ' >
                    <div className=' flex-between gap-5 ' >
                        <Link href={`/user/${post.author?._id}`}  
                            className=' flex gap-2 items-center mb-3 ' >
                            <Image src={post.author?.image || ""} alt="avatar" 
                                width={64} height={64} 
                                className=' rounded-full drop-shadow-lg'
                            />
                            <div>
                                <p className=' text-20-medium ' >{post.author?.name}</p>
                                <p className=' text-16-medium !text-black/40 ' >
                                    @{post.author?.username}
                                </p>    
                            </div>
                        </Link>

                        <p className=' category-tag ' >{post.category}</p>
                    </div>

                    <h3 className=' text-30-bold ' >Blog Details</h3>
                    {parserdContent ? (
                        <article 
                            className=' prose max-w-4xl break-all '
                            dangerouslySetInnerHTML={{__html: parserdContent}} />
                    ) : (
                        <p className=' text-16-medium ' >
                            No content available for this post.
                        </p>
                    )}

                </div>

                <hr  className=' divider mt-5 ' />

                <Suspense fallback={<Skeleton className=' view_skeleton ' />} >
                    <View id={id} />
                </Suspense>
            </section>
        </>
    )
}

export default page