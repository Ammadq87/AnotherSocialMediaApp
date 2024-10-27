import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isAuthenticated } from "../../lib/utils"
import { uiConstants } from "../components/UIConstants"
import AboutMe from "../components/account/AboutMe";
import MyPosts from "../components/account/MyPosts";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Account() {

    if (!isAuthenticated()) {
        window.location.href = '/auth/login'
        return
    }

    const [section, setSection] = useState("my_stuff")

    const links: string[] = [
        "My Stuff", "Following", "Followers"
    ]

    function formatField(field: string) {
        return field.toLowerCase().split(" ").join("_");
    }

    function handleSectionChange(newSection: string) {
        debugger
        const currSection = formatField(section);

        const currSectionBtn = document.getElementById(currSection + "_sectionBtn")
        if (currSectionBtn) {
            currSectionBtn.style.backgroundColor = "";
        }

        const newSectionBtn = document.getElementById(formatField(newSection) + "_sectionBtn");
        if (newSectionBtn) {
            newSectionBtn.style.backgroundColor = "#2a5df7";
        }

        setSection(formatField(newSection))
    }

    return (
        <>
            <div id="container" className={uiConstants.div.centerFeed}>
                <div>
                    <div className="flex items-center">
                        <h1 className={uiConstants.header.h1}>About Me</h1>
                        {/* <FontAwesomeIcon className="ml-2 text-blue-500" size="lg" icon={faCircleInfo} /> */}
                    </div>
                    <hr />
                </div>
                <div className="my-4 flex items-center">
                    {
                        links.map((link, i) => {
                            return (
                                <button
                                    onClick={() => { handleSectionChange(link) }}
                                    id={`${formatField(link) + "_sectionBtn"}`}
                                    key={i} className={`py-2 px-4 w-24 text-sm mr-4  gap-4 rounded-md ${formatField(link) === section ? 'bg-primary' : 'bg-secondary-bg'}`}
                                >{link}</button>
                            )
                        })
                    }
                </div>
                {
                    section === "my_stuff" &&
                    <div className="my-4 grid grid-cols-1 gap-4 rounded-md">
                        <AboutMe />
                        <MyPosts />
                    </div>
                }
                {
                    section === "following" &&
                    <div className="my-4">
                    </div>
                }
                {
                    section === "followers" &&
                    <div className="my-4">
                    </div>
                }
            </div>
        </>
    )
}

