import express from "express";
import mongoose from "mongoose";
import {usermodel, ContentModel, Linkmodel} from "./db.js";
import Jwt from "jsonwebtoken";
import {JWT_SECRET} from "./config.js"
import { Usermiddleware } from "./middleware.js";
import { random } from "./utilis.js";
import cors from "cors";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.post("/api/v1/signup", async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({
                message: "Username and password are required"
            });
        }

        await usermodel.create({
            username,
            password
        });
        res.json({ message: "signed up successfully" });

    } catch (e: any) {
        if (e.code === 11000) {
            return res.status(401).json({
                message: "user already exists"
            });
        }
        res.status(500).json({
            message: "Internal server error"
        });
    }
});
app.post("/api/v1/signin", async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({
                message: "Username and password are required"
            });
        }

        const response = await usermodel.findOne({
            username: username,
            password: password
        });
        
        if (!response) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }
        
        const token = Jwt.sign({
            id: response._id
        }, JWT_SECRET);
        
        res.json({
            token
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
});
app.post("/api/v1/content", Usermiddleware, async(req, res)=>{
    try {
        const { title, link, type } = req.body;
        
        if (!title || !link || !type) {
            return res.status(400).json({
                message: "Title, link, and type are required"
            });
        }

        await ContentModel.create({
            title,
            link,
            type,
            tags: [],
            //@ts-ignore
            userId: req.userId
        });
        
        return res.status(200).json({
            message: "content added"
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
});
app.get("/api/v1/content", Usermiddleware, async(req, res)=>{
    try {
        //@ts-ignore
        const userId=req.userId;
        const content=await ContentModel.find({
            userId: userId
        }).populate("userId", "username");
        
        res.status(200).json({
            content
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
})
app.delete("/api/v1/content", Usermiddleware, async(req, res)=>{
    try {
        const { contentId } = req.body;
        
        if (!contentId) {
            return res.status(400).json({
                message: "Content ID is required"
            });
        }

        const result = await ContentModel.deleteOne({
            _id: contentId,
            //@ts-ignore
            userId: req.userId
        });
        
        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: "Content not found"
            });
        }
        
        res.json({
            message: "deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
})
app.post("/api/v1/brain/share", Usermiddleware,  async (req, res)=>{
    try {
        const {share}= req.body;
        if(share){
            const existinglink=await Linkmodel.findOne({
                //@ts-ignore
                userId: req.userId
            });
            
            if (existinglink) {
                return res.json({
                    hash: existinglink.hash
                });
            }
            
            const hash=random(10);
            await Linkmodel.create({
                //@ts-ignore
                userId: req.userId,
                hash: hash
            });
            
            res.json({
                hash
            });
        }
        else{
            await Linkmodel.deleteOne({
                //@ts-ignore
                userId: req.userId
            });
            res.json({
                message: "share link deleted"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
});
app.get("/api/v1/brain/:shareLink", async (req, res)=>{
    try {
        const hash = req.params.shareLink;
        const links = await Linkmodel.findOne({
            hash
        });
        
        if(!links){
            return res.status(401).json({
                message: "invalid link"
            });
        }
        
        const content = await ContentModel.find({
            userId: links.userId
        });
        
        const user = await usermodel.findOne({
            _id: links.userId
        });
        
        if(!user){
            return res.status(411).json({
                message: "Sorry, incorrect user"
            });
        }
        
        return res.json({
            username: user.username,
            content: content
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
});
app.listen(3000);
