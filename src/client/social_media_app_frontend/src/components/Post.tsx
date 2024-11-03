import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment, faShareSquare } from '@fortawesome/free-regular-svg-icons'
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Content } from '../../service/ContentService';
import { uiConstants } from './UIConstants';

interface PostLink {
    name: string,
    icon: IconDefinition,
    color?: string,
    info: number
}

export default function Post(post: Content) {

    const actionItems: PostLink[] = [
        { name: "Like", icon: faHeart, info: post?.likeCount || 0 },
        { name: "Comment", icon: faComment, info: post?.commentCount || 0 },
        { name: "Share", icon: faShareSquare, info: post?.shareCount || 0 }
    ];

    return (
        <>
            <div id="post_container" className={uiConstants.div.contentPost}>
                <div id="image_container" className="">{post.imageUrl}</div>
                <div id="header" className="flex flex-row justify-between items-center">
                    <div id="account_info" className="flex flex-row gap-2 items-center">
                        <img
                            className="border border-black w-10 h-10 rounded-full"
                            src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                            alt=""
                        />
                        <div className='flex-col'>
                            <span className="font-semibold flex items-center text-lg text-white"><a href={`/user/${post.userId}`}>@{post.userId}</a></span>
                            <p className="font-semibold text-sm text-gray-500">{formatDate(post.createdOn)}</p>
                        </div>
                    </div>
                </div>
                <div className="my-2">
                    {post.title}
                </div>
                <div className="py-2 border-t-2 border-gray-500 text-gray-500 font-semibold text-md">
                    <ul id="action_center" className='flex flex-row gap-4 items-center bg-secondary-bg'>
                        {
                            actionItems.map((item, i) => {
                                return (
                                    <li key={i} className='text-lg m-0 flex flex-row items-center gap-2 bg-secondary-bg'>
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
    return "" + date || date.toLocaleDateString();
    // return date?.toLocaleDateString()
    // const month_index = date.getMonth();
    // return months[month_index] + " " + date.getDay() + ", " + date.getFullYear();
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