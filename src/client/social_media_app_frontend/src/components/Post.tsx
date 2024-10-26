import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment, faShareSquare } from '@fortawesome/free-regular-svg-icons'
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface Post {
    postID?: string,
    postedBy?: string,
    caption?: string,
    uploadedDate: Date,
    imageUrl?: string,
    likeCount?: number,
    commentCount?: number,
    shareCount?: number
}

interface PostLink {
    name: string,
    icon: IconDefinition,
    color?: string,
    info: number
}

export default function Post(post: Post) {

    const actionItems: PostLink[] = [
        { name: "Like", icon: faHeart, info: post?.likeCount || 0 },
        { name: "Comment", icon: faComment, info: post?.commentCount || 0 },
        { name: "Share", icon: faShareSquare, info: post?.shareCount || 0 }
    ];

    return (
        <>
            <div
                id="post_container"
                className="w-full border p-4 rounded-md"
            >
                <div id="image_container" className="">
                    {
                        post.imageUrl
                    }
                </div>

                <div id="header" className="flex flex-row justify-between items-center">
                    <div id="account_info" className="flex flex-row gap-2 items-center">
                        <img
                            className="border border-black w-8 h-8 rounded-full"
                            src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                            alt="" />
                        <span className="font-semibold flex items-center text-md text-gray-500"><a href={`/user/${post.postedBy}`}>@{post.postedBy}</a></span>
                    </div>

                    <p className="font-semibold text-sm text-gray-500">{formatDate(post.uploadedDate)}</p>
                </div>

                <div className="my-2">
                    {post.caption}
                </div>

                <div className="py-2 border-t-2 border-gray-100 text-gray-500 font-semibold text-sm">
                    <ul id="action_center" className='flex flex-row gap-4 items-center'>
                        {
                            actionItems.map((item, i) => {
                                return (
                                    <li key={i} className='m-0 flex flex-row items-center gap-2'>
                                        <span>{formatInfo(item.info)}</span>
                                        <FontAwesomeIcon className={`${item.color}`} icon={item.icon} />
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}



const formatDate = (date: Date): string => {
    const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    const month_index = date.getMonth();
    return months[month_index] + " " + date.getDay() + ", " + date.getFullYear();
}

const formatInfo = (info: number): string => {
    const _info = String(info);

    if (_info.length < 4)
        return _info.toLocaleString();
    else if (_info.length <= 6)
        return (String((info / 1000).toFixed(1)) + "K").toLocaleString();
    else if (_info.length <= 9)
        return String((info / 1000000).toFixed(1)) + "M".toLocaleString();

    return _info

}