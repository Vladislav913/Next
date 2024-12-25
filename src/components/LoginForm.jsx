"use client";

import SocialLogins from "./SocialLogins";

import { doCredentialLogin } from "@/app/actions";

import { useState } from "react";
import { useRouter } from "next/navigation";


const LoginForm = () => {
    const router = useRouter();
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    async function onSubmit(event) {
        event.preventDefault();
        try {

            console.log({formData})
            const response = await doCredentialLogin(formData);

            console.log(response)


            if (!!response.error) {
                console.error(response.error);
                setError(response.error.message);
            } else {
                router.push("/products");
            }
        } catch (e) {
            console.error(e);
            setError("Check your Credentials");
        }
    }


    return (
        <>
            <div className="text-xl text-red-500">{error}</div>
            <form 
                className="my-5 flex flex-col items-center border p-3 border-gray-200 rounded-md"
                onSubmit={onSubmit}>
                <div className="my-2">
                    <label htmlFor="email">Email Address</label>
                    <input onChange={handleChange} className="border mx-2 border-gray-500 rounded" type="email" name="email" id="email" />
                </div>

                <div className="my-2">
                    <label htmlFor="password">Password</label>
                    <input onChange={handleChange} className="border mx-2 border-gray-500 rounded" type="password" name="password" id="password" />
                </div>

                <button type="submit" className="bg-orange-300 mt-4 rounded flex justify-center items-center w-36">
                    Ceredential Login
                </button>
            </form>
            <SocialLogins />
        </>
    );
};

export default LoginForm;
