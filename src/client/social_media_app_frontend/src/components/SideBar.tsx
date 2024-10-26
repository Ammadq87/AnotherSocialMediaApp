import { NavLinkElement, isAuthenticated} from "../../lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFile, faListCheck, faComments, faUser, faSitemap } from "@fortawesome/free-solid-svg-icons"
import { useLocation } from "react-router-dom";

export default function SideBar() {

    const location = useLocation()
    const hideSideBar: boolean = location.pathname === "/auth/login" || location.pathname === "/auth/register";

    if (!isAuthenticated() || hideSideBar)
        return <></>

    const linkHoverStyle = "hover:underline hover:text-xl";

    const sideBarLinks: NavLinkElement[] = [
        {
            name: "Feed",
            path: "/feed",
            icon: faComments
        }, 
        {
            name: "Tasks",
            path: "/tasks",
            icon: faListCheck
        },
        {
            name: "Documents",
            path: "/documents",
            icon: faFile
        },
        {
            name: "Your Hives",
            path: "/hives",
            icon: faSitemap
        },
        {
            name: "Profile",
            path: "/profile",
            icon: faUser
        }
    ]

    return (
        <>
            <div className="h-full flex flex-col justify-between border-r-[1px] border-x-custom-gray">
                <div id="Logo" className="h-1/5 flex flex-row items-center p-4">
                    <h1 className="w-28 text-custom-yellow text-4xl font-extrabold ">The Hive</h1>
                    <img src="../../public/bee2.png" className="w-16 h-16 p-2 bg-custom-light-gray rounded-full " alt="" />
                </div>
                <div className="h-3/5 flex flex-col items-start justify-start mx-2 bg-custom-black">
                    <ul className="w-full flex flex-col items-start rounded-sm bg-custom-black">
                        {
                            sideBarLinks.map((link, i) => {
                                return (
                                    <li key={i} className={`bg-custom-black text-custom-light-gray text-lg font-bold ${linkHoverStyle}`}>
                                        <a href={link?.path || '/'} className="flex flex-row gap-2 items-center">
                                            <FontAwesomeIcon icon={link.icon}/>
                                            <p>{link.name}</p>
                                        </a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="h-1/5 my-8 mx-2 flex flex-col justify-end items-center">
                    <button className="w-full py-2 bg-custom-yellow rounded-sm text-md text-white font-black">Logout</button>
                </div>
            </div>
        </>
    )
}
