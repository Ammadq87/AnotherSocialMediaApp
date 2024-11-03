import { FormEvent } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../service/AuthService";
import { User } from "../../service/AccountService";

export default function Register() {

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formObj = new FormData(e.target as HTMLFormElement)
        const data: User = {
            email: formObj.get("email") as string,
            password: formObj.get("password") as string,
            name: formObj.get("name") as string,
            dateOfBirth: (formObj.get("dob") as unknown) as Date,
            username: formObj.get("username") as string
        }

        await AuthService.Register(data)
    }

    return (
        <>
            <div className="border border-custom-gray w-1/4 rounded-md shadow-md m-auto bg-custom-black text-white p-8">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-4xl font-extrabold">Register</h1>
                        {/* <h5>Login with your email here.</h5> */}
                    </div>
                    {/* Hidden fields and inputs */}
                    <input type="hidden" name="phoneNumber" value={''} />
                    <div className="">
                        <div className="flex flex-row justify-between">
                            <div id="formInput" className="w-1/2 pr-2">
                                <label htmlFor="firstName" id="formLbl">First Name</label>
                                <input type="text" name="firstName" required />
                            </div>
                            <div id="formInput" className="w-1/2 pl-2">
                                <label htmlFor="lastName" id="formLbl">Last Name</label>
                                <input type="text" name="lastName" required />
                            </div>
                        </div>
                    </div>
                    <div id="formInput">
                        <label htmlFor="email" id="formLbl">Email</label>
                        <input type="email" name="email" required />
                    </div>
                    <div id="formInput">
                        <label htmlFor="username" id="formLbl">Username</label>
                        <input type="text" name="username" required />
                    </div>
                    <div id="formInput">
                        <label htmlFor="password" id="formLbl">Password</label>
                        <input type="password" name="password" required />
                    </div>
                    <div id="formInput">
                        <label htmlFor="dob" id="formLbl">Birth Date</label>
                        <input type="date" name="dob" required />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white w-full p-2 rounded-md font-semibold"
                    >
                        Register
                    </button>
                    <p className="text-center text-sm flex flex-col">
                        <span>By continuing, you agree to our <span className="font-medium">Terms of Service</span>.</span>
                        <span>Read our <span className="font-medium">Privacy Policy</span>.</span>
                    </p>
                    <hr />
                    <div className="flex flex-row justify-center text-center">
                        <p className="text-center">Already have an account? <Link to={'/auth/login'} className=" text-link font-medium">Login</Link></p>
                    </div>
                </form>
            </div>
        </>
    )
}