import express from "express";
import mongoose from "mongoose";
import {usermodel, ContentModel, Linkmodel} from "./db.js";
import Jwt from "jsonwebtoken";
const app = express();
app.use(express.json());
import {JWT_SECRET} from "./config.js"
import { Usermiddleware } from "./middleware.js";
import { random } from "./utilis.js";
import cors from "cors"
app.use(cors());
app.post("/api/v1/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        await usermodel.create({
            username,
            password

        });
        res.json({ messege: "signued up successfully" });


    } catch (e) {
        res.status(401).json({
            messege: "user already exit"
        })

    }



});
app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const response=await usermodel.findOne({
        username: username,
        password: password

    })
    if (!response) {
        res.status(421).json({
            messege: "user dont exist"
        })
        
    }
    const token=Jwt.sign({
        id: response?._id
    },JWT_SECRET)
    res.json({
        token
    })


});
app.post("/api/v1/content", Usermiddleware, async(req, res)=>{
    const title=req.body.title;
    const link=req.body.link;
    const type=req.body.type;
    await ContentModel.create({
        title,
        link,
        type,
        tage: [],
        //@ts-ignore
        userId: req.userId

    })
    return res.status(200).json({
        messege: "content added"
    })


});
app.get("/api/v1/content", Usermiddleware, async(req, res)=>{
    //@ts-ignore
    const userId=req.userId;
    const content=await ContentModel.find({
        userId: userId
    }).populate("userId", "username")
    res.status(200).json({
        content
    })
})
app.delete("/api/v1/content", Usermiddleware, async(req, res)=>{
    const contentId=req.body.contentId;
    await ContentModel.deleteMany({
        contentId,
        //@ts-ignore
        userId: req.userId
    })
    res.json({
        messege: "delete successfully "
    })
})
app.post("/api/v1/brain/share", Usermiddleware,  async (req, res)=>{
    const {share}= req.body;
    if(share){
        const existinglink=await Linkmodel.findOne({
            //@ts-ignore
            userId: req.userId
        })
        if (existinglink) {
            res.json({
            hash: existinglink.hash
        });

            return
            
        }
        const hash=random(10);
        await Linkmodel.create({
            //@ts-ignore
            userId: req.userId,
            hash: hash
        })
        res.json({
            hash
        })
    }
    else{
        await Linkmodel.deleteOne({
            //@ts-ignore
            userId: req.userId
        });
        res.json({
        messege: "delete share link"
    });
    }
    

});
app.get("/api/v1/brain/:shareLink", async (req, res)=>{
    const hash =req.params.shareLink;
    const links=await Linkmodel.findOne({
        hash

    })
    if(!links){
        res.status(401).json({
            messege: "wrong link "
        })
        return 
    }
    const content=await ContentModel.find({
        userId: links.userId

    });
    const user=await usermodel.findOne({
        _id: links.userId
    })
    if(!user){
        res.status(411).json({
            messege: "Sorry incoorect user"
        })
        return
    }
    return res.json({
        username: user.username,
        content: content
    })
});
app.listen(3000);
