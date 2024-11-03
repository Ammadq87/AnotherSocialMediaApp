import { isAuthenticated } from "../../lib/utils"
import { uiConstants } from "../components/UIConstants"
import Following from "../components/account/Following";
import Me from "../components/account/Me";
import { useState } from "react";

interface AccountProp {
    accountSection: "me" | "followers" | "following"
}

export default function Account({ accountSection = "me" }: AccountProp) {

    if (!isAuthenticated()) {
        window.location.href = '/auth/login'
        return
    }

    const [section, setSection] = useState(accountSection)

    const links: string[] = ["me", "following", "followers"]

    function handleSectionChange(newSection: string) {
        const currSection = section;
        const currSectionBtn = document.getElementById(currSection + "_sectionBtn")

        if (currSectionBtn) {
            currSectionBtn.style.backgroundColor = "";
        }

        const newSectionBtn = document.getElementById(newSection + "_sectionBtn");

        if (newSectionBtn) {
            newSectionBtn.style.backgroundColor = "#2a5df7";
        }

        setSection(newSection as "me" | "followers" | "following");
    }

    return (
        <>
            <div id="container" className={uiConstants.div.centerFeed}>
                <div>
                    <div className="flex items-center">
                        <h1 className={uiConstants.header.h1}>About Me</h1>
                    </div>
                    <hr />
                </div>
                <div className="my-4 flex items-center">
                    {
                        links.map((link, i) => {
                            return (
                                <button
                                    onClick={() => { handleSectionChange(link) }}
                                    id={`${link + "_sectionBtn"}`}
                                    key={i}
                                    className={`py-2 px-4 w-24 text-sm mr-4 font-medium gap-4 rounded-md ${link === section ? 'bg-primary' : 'bg-secondary-bg'}`}
                                >
                                    {link.charAt(0).toUpperCase() + link.substring(1, link.length)}
                                </button>
                            )
                        })
                    }
                </div>
                {
                    section === "me" && <Me />
                }
                {
                    section === "following" &&
                    <div className="my-4 w-full">
                        <Following />
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