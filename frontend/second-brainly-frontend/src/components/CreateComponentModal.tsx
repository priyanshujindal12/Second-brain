import axios from "axios";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { useRef, useState } from "react";
import { BACKEND_URL } from "../config";
enum ContentType{
    Youtube="Youtube",
    Twitter="Twitter"
}
export function CreateContentModal({open , onclose}){
    const titleref=useRef<HTMLInputElement>(null)
    const linkref=useRef<HTMLInputElement>(null)
    const [type, settype]=useState(ContentType.Youtube);

    async function addContent(){
        const title=titleref.current?.value;
        const link=linkref.current?.value;
        await axios.post(`${BACKEND_URL}/api/v1/content`,{
            title,
            link,
            type
        },{
            headers:{
                'Authorization': localStorage.getItem("token")
        
            }
        })
        onclose();
        

    }
    return  <div>   
      {open && <div> 
        
        <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center">
            
    </div>
    <div className="w-screen h-screen  fixed top-0 left-0  flex justify-center">
            <div className="flex flex-col justify-center">
            <span className="bg-white opacity-100 p-4 rounded">
                <div className="flex justify-end">
                    <div onClick={onclose} className="cursor-pointer">
                    <CrossIcon/>
                    </div>
                </div>
                <div>
                    <Input ref={titleref} placeholder={"Title"}/>
                    <Input ref={linkref} placeholder={"Link"}/>
                </div>
                <div>
                    <h1>Type</h1>
                    <div className="flex gap-1 p-4">
                    <Button onclick={()=>{
                        settype(ContentType.Youtube)
                    }} text="Youtube" varient={type===ContentType.Youtube ? "primary": "secondary"}/>
                    <Button  text="Twitter" varient={type===ContentType.Twitter ? "primary": "secondary"} onclick={()=>{
                        settype(ContentType.Twitter)
                    }}/>
                    </div>
                </div>
                <div className="flex  justify-center">
                <Button onclick={addContent} varient="primary" text="submit"/>
                </div>
            </span>
            </div>
    </div>
    
    </div>}
    </div>
 

}
