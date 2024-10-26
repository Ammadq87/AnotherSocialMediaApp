import { Link } from "react-router-dom";
import { FormEvent } from "react";
import AuthService from "../../service/AuthService"
import { AxiosError } from "axios";
import { LoginBody } from "../../service/AuthService";

export default function Login() {

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formObj = new FormData(e.target as HTMLFormElement)

        const data: LoginBody = {
            email: formObj.get("email") as string, password: formObj.get("password") as string
        }

        const response = await AuthService.Login(data)

        if (response instanceof AxiosError)
            alert(response.response?.data)
        else
            window.location.href = '/feed'
    }

    return (
        <>
            <div className="border border-custom-gray w-1/4 rounded-md shadow-md m-auto bg-custom-black text-custom-light-gray p-8">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-4xl font-extrabold">Login</h1>
                        <h5>Login with your email here.</h5>
                    </div>

                    <div id="formInput">
                        <label htmlFor="email_or_username" id="formLbl">Email</label>
                        <input type="email" name="email" className="bg-custom-black text-custom-light-gray" required />
                    </div>
                    <div id="formInput">
                        <label htmlFor="password" id="formLbl">Password</label>
                        <input type="password" name="password" className="bg-custom-black text-custom-light-gray" required />
                    </div>

                    <button
                        type="submit"
                        className="bg-primary text-white font-extrabold w-full p-2 rounded-md"
                    >
                        Login
                    </button>

                    <p className="text-center text-sm flex flex-col">
                        <span>By continuing, you agree to our <span className="font-medium">Terms of Service</span>.</span>
                        <span>Read our <span className="font-medium">Privacy Policy</span>.</span>
                    </p>

                    <hr />

                    <div className="flex flex-row justify-between text-link font-medium">
                        <Link to={'/passwordReset'}>Reset password</Link>
                        <Link to={'/auth/register'}>Register</Link>
                    </div>
                </form>
            </div>
        </>
    )
}