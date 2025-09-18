import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
export function Signup(){
    const usernameref=useRef<HTMLInputElement>(null);
    const passwordref=useRef<HTMLInputElement>(null);
    const navigate=useNavigate();
     async function signup(){
        const username=usernameref.current?.value;
        const password=passwordref.current?.value;
        await axios.post(`${BACKEND_URL}/api/v1/signup`,{
            
                username,
                password
            
        })
        alert("you have signed up")
        navigate("/signin")
    }
    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center ">
        <div className="bg-white rounded-xl border min-w-48 p-8 "> 
                <Input ref={usernameref} placeholder="Username"/>
                <Input ref={passwordref} placeholder="password"/>
                <div className="flex justify-center pt-4">
                    <Button onclick={signup} varient="primary" text="signup" fullwidth={true}/>

                </div>
                
        </div>

    </div>
}