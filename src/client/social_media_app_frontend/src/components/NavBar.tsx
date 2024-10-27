import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell } from "@fortawesome/free-solid-svg-icons"
import { isAuthenticated } from "../../lib/utils"
import ProfileImage from "./ProfileImage"

export default function NavBar() {
    if (!isAuthenticated()) {
        return <></>
    }

    return (
        <>
            <div id="NavBar" className="w-full h-16 flex flex-row gap-4 px-4 justify-end items-center border-custom-gray border-b-2 border-y-0">
                <input type="text" placeholder="Search" className="h-8 bg-custom-black border-custom-gray border text-custom-light-gray" />
                <a href="/alerts"><FontAwesomeIcon icon={faBell} className="text-white px-2" /></a>
                <a href="/account">
                    <ProfileImage size={"sm"} />
                </a>
            </div>
        </>
    )
}