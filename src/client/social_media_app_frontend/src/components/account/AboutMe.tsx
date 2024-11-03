import { useEffect, useState } from "react"
import { uiConstants } from "../UIConstants"
import { User } from "../../../service/AccountService";
import AccountService from "../../../service/AccountService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronCircleDown, faChevronCircleRight, faAddressCard } from "@fortawesome/free-solid-svg-icons"
import toast from 'react-hot-toast';
import { getAttributeFromToken } from "../../../lib/utils";

export default function AboutMe() {

    const [profile, setProfile] = useState<User>({
        userID: "",
        username: "",
        email: "",
        password: "",
        firstName: "",
        lastName: null,
        phoneNumber: null,
        dob: null,
    });

    const [oldProfile, setOldProfile] = useState<User>({
        userID: "",
        username: "",
        email: "",
        password: "",
        firstName: "",
        lastName: null,
        phoneNumber: null,
        dob: null,
    });

    const [viewProfileSection, setViewProfileSection] = useState(true);
    const [isProfileChanged, setIsProfileChanged] = useState(false);

    async function submitChanges() {
        const response = await AccountService.updateAccount(profile)
        if (response == "") {
            setOldProfile(profile)
            toast.success("Saved!")
        } else {
            toast.error(response)
        }
    }

    function updateInformation(newValue: any, field: keyof User) {
        if (oldProfile[field] != newValue) {
            setIsProfileChanged(true)
        } else {
            setIsProfileChanged(false)
        }

        const newInfo: User = profile;
        newInfo[field] = newValue;
        setProfile(newInfo);
    }

    useEffect(() => {
        const fetchProfile = async () => {
            const response = await AccountService.getAccountById(getAttributeFromToken("userID"));

            if (response !== null) {
                setProfile(response as User)
                setOldProfile(structuredClone(response as User))
            }
        }

        fetchProfile();
    }, [])

    function SectionInfo(lbl: string, value: any) {
        if (lbl === "dob") {
            const dateValue = value ? new Date(value) : null;
            const formattedDob = dateValue && !isNaN(dateValue.getTime()) ? dateValue.toISOString().split('T')[0] : "";
            value = formattedDob;
        }

        return (
            <div className="my-2">
                <p className="font-bold">{lbl}</p>
                <input
                    name={convertAttributeNames(lbl)}
                    onChange={(e) => { updateInformation(e.target.value, convertAttributeNames(lbl)) }}
                    type={lbl === "dob" ? "date" : "text"}
                    className="w-full bg-secondary-bg p-0 mb-2 border border-gray-400"
                    defaultValue={value}
                />
            </div>
        );

    }

    function convertAttributeNames(name: string): keyof User {
        switch (name.toLowerCase()) {
            case "username":
                return "username";
            case "email":
                return "email";
            case "password":
                return "password";
            case "first name":
                return "firstName";
            case "last name":
                return "lastName";
            case "phone number":
                return "phoneNumber";
            case "dob":
                return "dob";
            default:
                throw new Error(`Invalid attribute name: ${name}`);
        }
    }

    return (
        <section className="bg-secondary-bg p-4 rounded-md">
            <div className="flex justify-between">
                <div className="flex justify-between items-center">
                    <h2 className={uiConstants.header.h2}>Personal</h2>
                    <FontAwesomeIcon icon={faAddressCard} className="ml-2 text-pink-500" size="lg" />
                </div>
                <button onClick={() => { setViewProfileSection(!viewProfileSection) }}>
                    <FontAwesomeIcon size="lg" icon={viewProfileSection ? faChevronCircleDown : faChevronCircleRight} />
                </button>
            </div>

            {
                viewProfileSection &&
                <div>
                    <form action="http://localhost:8080/api/v1/">
                        <div className={`${uiConstants.grid.root} grid-cols-2`}>
                            <div className={`${uiConstants.grid.section} border-r border-r-white rounded-none`}>
                                {SectionInfo("Email", profile?.email)}
                                {SectionInfo("Password", profile?.password)}
                                {SectionInfo("First Name", profile?.firstName)}
                                {SectionInfo("Last Name", profile?.lastName)}
                            </div>
                            <div className={`${uiConstants.grid.section}`}>
                                {SectionInfo("Username", profile?.username)}
                                {SectionInfo("Phone Number", profile?.phoneNumber)}
                                {SectionInfo("dob", profile?.dob)}
                            </div>
                        </div>
                    </form>
                    <div className="flex justify-end mt-4">
                        {/* ToDo: add update functionality */}
                        <button
                            onClick={() => { submitChanges() }}
                            className={isProfileChanged ? uiConstants.btn.primaryBtn : uiConstants.btn.disabledBtn}>Save</button>
                    </div>
                </div>
            }

        </section>
    )
}