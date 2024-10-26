import { useEffect, useState } from "react"
import { uiConstants } from "../UIConstants"
import { PersonalProfile } from "../../../service/AccountService";
import AccountService from "../../../service/AccountService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronCircleDown, faChevronCircleRight, faAddressCard } from "@fortawesome/free-solid-svg-icons"


export default function AboutMe() {

    const [profile, setProfile] = useState<PersonalProfile | null>({
        username: "",
        email: "",
        password: "",
        firstName: "",
        lastName: null,
        phoneNumber: null,
        dob: null,
    });

    const [viewProfileSection, setViewProfileSection] = useState(true)

    useEffect(() => {
        const fetchProfile = async () => {
            const response = await AccountService.getBasicProfileInformation();
            setProfile(response)
        }

        fetchProfile();
    }, [])

    return (
        <section className="my-4">
            <div className="flex justify-between">
                <div className="flex justify-between items-center">
                    <h2 className={uiConstants.header.h2}>Personal</h2>
                    <FontAwesomeIcon icon={faAddressCard} className="ml-2 text-pink-500" size="lg" />
                </div>
                <button onClick={() => { setViewProfileSection(!viewProfileSection) }}>
                    <FontAwesomeIcon icon={viewProfileSection ? faChevronCircleDown : faChevronCircleRight} />
                </button>
            </div>

            {
                viewProfileSection &&
                <div>
                    <div className={`${uiConstants.grid.root} grid-cols-2`}>
                        <div className={uiConstants.grid.section}>
                            {SectionInfo("E-mail", profile?.email)}
                            {SectionInfo("Password", profile?.password)}
                            {SectionInfo("First Name", profile?.firstName)}
                            {SectionInfo("Last Name", profile?.lastName)}
                        </div>
                        <div className={uiConstants.grid.section}>
                            {SectionInfo("Username", profile?.username)}
                            {SectionInfo("Phone-Number", profile?.phoneNumber)}
                            {SectionInfo("Birth Day", profile?.dob?.toLocaleDateString())}
                        </div>
                    </div>
                    <div className="flex justify-end">
                        {/* ToDo: add update functionality */}
                        {/* <button className={uiConstants.btn.primaryBtn}>Save</button> */}
                    </div>
                </div>
            }

        </section>
    )
}

function SectionInfo(lbl: string, value: string | undefined | null) {
    return (
        <div className="my-2">
            <p className="font-bold">{lbl}</p>
            <input
                className="w-full bg-secondary-bg p-0 mb-2 border border-gray-400"
                type="text"
                defaultValue={value || ""} />
        </div>
    )
}