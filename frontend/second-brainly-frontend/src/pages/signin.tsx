import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
export function Signin(){
    const usernameref=useRef<HTMLInputElement>(null)
    const passwordref=useRef<HTMLInputElement>(null)
    const navigate=useNavigate()
    async function signin(){
        const username=usernameref.current?.value;
        const password=passwordref.current?.value;
        
        const response=await axios.post(`${BACKEND_URL}/api/v1/signin`,{
            username,
            password
        })
        const jwt=response.data.token;
        localStorage.setItem("token", jwt);
        navigate("/Dashboard")
    }
    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center ">
        <div className="bg-white rounded-xl border min-w-48 p-8 "> 
                <Input ref={usernameref} placeholder="Username"/>
                <Input ref={passwordref} placeholder="password"/>
                <div className="flex justify-center pt-4">
                    <Button onclick={signin} varient="primary" text="signin" fullwidth={true}/>

                </div>
                
        </div> 

    </div>
}