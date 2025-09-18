import { Logo } from "../icons/Logo";
import { Twitter } from "../icons/Twitter";
import { YouTubeIcon } from "../icons/YoutubeIcon";
import { Sidebaritems } from "./SidebarComponent";

export function Sidebar(){
    return <div className="fixed">
        <div className=" h-screen bg-white  border-r w-72 fixed  left-0 top-0 pl-6">
            <div className="flex text-2xl pt-8 items-center ">
                <div className="pr-2 text-purple-600">
                    <Logo/>
                </div>
               
                Brainly
            </div>
            <div className="pt-8 pl-4">
                <Sidebaritems text="Twitter" icon={<Twitter/>}/>
                <Sidebaritems text="Youtube" icon={<YouTubeIcon/>}/>
            </div>
        </div>
    </div>
}