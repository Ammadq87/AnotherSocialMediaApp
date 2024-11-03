import { Link } from "react-router-dom";
import { useSearch } from "../contexts/SearchContext";
import ProfileImage from "../components/ProfileImage";
import AccountService, { User } from "../../service/AccountService";
import { uiConstants } from "../components/UIConstants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { getAttributeFromToken, isAuthenticated } from "../../lib/utils";

export default function Results() {
    const { results } = useSearch();

    if (!isAuthenticated()) {
        window.location.href = '/auth/login'
        return
    }

    async function followUser(userID: string | undefined) {
        if (userID === undefined) {
            return;
        }

        await AccountService.followUser(userID);
    }

    function Result(data: User) {
        return (
            <>
                <div className="flex my-8 items-center justify-between">
                    <div className="flex gap-4 items-center">
                        <ProfileImage size="md" />
                        <Link to={`/user/${data.id}`} className="hover:text-blue-400">
                            <p className="text-xl font-bold">@{data.username}</p>
                            <p className="text-lg text-gray-500">{data.name}</p>
                        </Link>
                    </div>
                    <div>
                        {
                            data.id !== getAttributeFromToken("userID") &&
                            <button
                                onClick={() => { followUser(data.id) }}
                                className="hover:scale-110 cursor-pointer">
                                <span>Follow</span>
                                <FontAwesomeIcon icon={faUserPlus} size={"lg"} className="mx-2" />
                            </button>
                        }
                    </div>
                </div >
            </>
        );
    }

    return (
        <>
            <div id="container" className={uiConstants.div.centerFeed}>
                <div className="flex items-center border-b border-b-white py-2">
                    <h1 className={uiConstants.header.h2}>Results ({results.length}):</h1>
                </div>
                <div className="flex-col">
                    {
                        results.map((data, i) => (
                            <div key={i}>
                                {Result(data)}
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
}
