import AccountService from "../../../service/AccountService";
import { Content } from "../../../service/ContentService";
import { useEffect, useState } from "react"
import { uiConstants } from "../UIConstants";
import Post from "../Post";
import { getAttributeFromToken } from "../../../lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleDown, faChevronCircleRight, faSnowboarding } from "@fortawesome/free-solid-svg-icons";

export default function MyPosts() {

    const [myPosts, setMyPosts] = useState<Content[] | null>([])
    const [viewSection, setViewSection] = useState(true)


    const username = getAttributeFromToken("username")

    useEffect(() => {
        const fetchPosts = async () => {
            const posts = await AccountService.getMyPosts();
            setMyPosts(posts)
        }

        fetchPosts();
    }, [])

    return (
        <>
            <div className="flex justify-between">
                <div className="flex justify-between items-center">
                    <h2 className={uiConstants.header.h2}>My Activites</h2>
                    <FontAwesomeIcon icon={faSnowboarding} className="ml-2 text-green-500" size="lg" />
                </div>
                <button onClick={() => { setViewSection(!viewSection) }}>
                    <FontAwesomeIcon icon={viewSection ? faChevronCircleDown : faChevronCircleRight} />
                </button>
            </div>
            {
                viewSection &&
                <div className="h-[750px] overflow-y-scroll my-2">
                    {
                        myPosts?.map((post, i) => {
                            return (
                                <Post
                                    caption={post.caption}
                                    createdOn={post?.createdOn}
                                    postID={post.postID}
                                    postedBy={username}
                                    imageUrl={post.imageUrl}
                                    likeCount={post.likeCount}
                                    commentCount={post.commentCount}
                                    shareCount={post.shareCount}
                                    key={i}
                                />
                            )
                        })
                    }
                </div>
            }
        </>
    )
}