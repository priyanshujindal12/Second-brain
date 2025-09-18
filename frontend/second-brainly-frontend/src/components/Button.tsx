import type { ReactElement } from "react"

interface Buttonprops{
    varient: "primary" | "secondary"
    text: string
    starticon?: ReactElement;
    onclick?:()=>void;
    fullwidth?:Boolean ;
    loading?: boolean

}
const Vareintclasses={
    "primary": " bg-midnight text-white ",
    "secondary": "bg-light text-dark"
}
const defaultstyled=" flex items-center px-4 py-2 rounded-md font-light "
export  function  Button({varient,text,  starticon, onclick, fullwidth, loading}: Buttonprops){
    return <button onClick={onclick} className={`${Vareintclasses[varient]} ${defaultstyled} ${fullwidth ? "w-full flex justify-center items-center ": ""} ${loading? "disabled": ""}` } disabled={loading}> 
    <div className="pr-2">
    {starticon}
    </div>
    {text}
    </button>
}