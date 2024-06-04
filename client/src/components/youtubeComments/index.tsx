import { useEffect, useState } from 'react'
import axios from 'axios'
import './comments.css'



function YoutubeComments({ videoId }: { videoId: string }) {
    const [comments, setComments] = useState([{}])


    useEffect(() => {
        const fetchComments = async () => {
            try {
                await axios.get('https://www.googleapis.com/youtube/v3/commentThreads', {
                    params: {
                        part: 'snippet',
                        videoId,
                        order: 'time',
                        key: import.meta.env.VITE_YOUTUBE_KEY,
                        maxResults: 10
                    }
                }).then(res => {

                    setComments(res.data.items)
                })

            } catch (error) {
                console.error(error)
            }
        }

        fetchComments();
    }, [videoId]
    )
    return (
        <section className='comments p-[2em]'>
            <h2 className='text-2xl border-solid border-t-0 border-x-0'>Comments</h2>
            <ul role="list" className="divide-y divide-gray-100">
                {comments.length !== 0 && comments.map((comment: any, index: number) =>
                (
                    <li className="flex justify-between gap-x-6 py-5" key={`comment-${index}`}>
                        <div className="flex min-w-0 gap-x-4">
                            <img className="h-12 w-12 flex-none rounded-full" src={comment.snippet?.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6">
                                    <a href={comment.snippet?.topLevelComment.snippet.authorChannelUrl}>
                                        {comment.snippet?.topLevelComment.snippet.authorDisplayName}
                                    </a>
                                </p>
                                <p className="mt-1 truncate text-xs leading-5">{comment.snippet?.topLevelComment.snippet.textDisplay}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </section >)
}

export default YoutubeComments
