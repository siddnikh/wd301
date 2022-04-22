import React, { useState, useEffect } from "react";
import { login } from "../utils/apiUtils";
import { navigate } from "raviger";
import { checkLogin } from "../utils/loginUtils";

export default function Login(){

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try{
            const data = await login(username, password);
            localStorage.setItem("authToken", data.token);
            navigate(`/`);
            window.location.reload();
        } catch(error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if(checkLogin()) navigate('/');
    });

    return(
        <div>
            <div>
                <p className='text-3xl m-2'>Login</p>
            </div>
            <hr />
            <form onSubmit={handleSubmit}>
                <input
                    name="username"
                    className="border-2 border-gray-200 rounded-lg p-2 mt-4 w-full"
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    name="password"
                    className="border-2 border-gray-200 rounded-lg p-2 mt-4 w-full"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => {setPassword(e.target.value)}}
                />
                <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded" type="submit" value="Login"/>
            </form>
        </div>
    )
}