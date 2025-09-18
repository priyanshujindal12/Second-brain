import { Button } from "../components/Button"
import { PlusIcon } from "../icons/Plusicon"
import { ShareIcon } from "../icons/Shareicon"
import { Card } from "../components/Card"
import { CreateContentModal } from "../components/CreateComponentModal"
import { useState, useEffect } from "react"
import { Sidebar } from "../components/sidebar"
import { useContent } from "../hooks/useContent"
export function Dashboard() {
  const [modelOpen, setModelOpen]=useState(false);
  const {content, refresh}=useContent();
  useEffect(()=>{
    refresh();
  },[modelOpen])
  return (
    <>
    <div>
      <Sidebar/>
    <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2" >
      <CreateContentModal open={modelOpen} onclose={()=>{
        setModelOpen(false)
      }}/>
      <div className="flex justify-end gap-4">
        <Button onclick={()=>{
          setModelOpen(true)
        }} varient="primary" text="Add content" starticon={<PlusIcon/>}/>
        <Button varient="secondary" text="Share Brain" starticon={<ShareIcon/>}/>
        <br />
        <br />
      </div>
      <br />
      <div className="flex  gap-4">
        {content.map(({type,link, title})=><Card title={title} link={link} type={type}/>)}
        </div>
      </div>
      </div>
    </>
  )
}


