import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell } from "@fortawesome/free-solid-svg-icons"
import { isAuthenticated } from "../../lib/utils"
import ProfileImage from "./ProfileImage"
import Search from "./navbar/Search"
import { uiConstants } from "./UIConstants"

export default function NavBar() {
    if (!isAuthenticated()) {
        return <></>
    }

    return (
        <>
            <div>
                <div id="NavBar"
                    className={uiConstants.nav.navbar}
                // className=" h-16 flex flex-row gap-4 px-4 justify-end items-center border-custom-gray border-b-2 border-y-0"
                >
                    <Search />
                    <a href="/alerts"><FontAwesomeIcon icon={faBell} className="text-white px-2" /></a>
                    <a href="/account">
                        <ProfileImage size={"sm"} />
                    </a>
                </div>
                {/* 
                <div id="results" className="w-[250px] h-[250px] border">

                </div> */}

            </div>
        </>
    )
}