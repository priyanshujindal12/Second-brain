import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
export  function useContent(){
    const [content, setContent] = useState([]);
    function refresh(){
        axios.get(`${BACKEND_URL}/api/v1/content`, {
            headers:{
                'Authorization': localStorage.getItem("token")
            }
        })
        .then((response)=>{
            setContent(response.data.content);
        })
    }
    useEffect(()=>{
        refresh();
        const interval=setInterval(()=>{
            refresh();
        },10000)
        return ()=>{
            clearInterval(interval);
        }
    },[])
    return {content, refresh};
}