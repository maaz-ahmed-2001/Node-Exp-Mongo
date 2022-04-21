import express from "express"
import User from "./model/user.js"
import bodyParser from "body-parser"
import cors from "cors"
import mongoose from "mongoose"


const app = express()
const router = express.Router()
const encodedUrl = bodyParser.urlencoded()
const jsonParser = bodyParser.json()
const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://maaz:<password>0@cluster0.biaxw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("connected");
})


app.use(cors())
// const data = new User({
//     _id: new mongoose.Types.ObjectId(),
//     name: "Rez Bhai",
//     email: "rez@gmail.com",
//     password: "rez123"
// })

// data.save().then(res=>console.log(res)).catch(err=> console.log(err))

// User.find({},(err,user)=>{
//     if (err) console.log(err);
//     console.log(user);
// })

// app.get("/", (req,res)=>{
//     res.sendFile(__dirname+"/home.html")
// });
// router.get("/login",(req,res)=>{
//     res.sendFile(__dirname+"/login.html")
// })
// router.get("/about",(req,res)=>{
//     res.sendFile(__dirname+"/about.html")
// })
// app.use("/",router)

// app.set("view engine","ejs")
// app.use("/assets",express.static("assets"))
// app.get("/profile/:name",(req,res)=>{
//     data = {email:"maaz@abc.com",age : "21" , gender : "Male", skills : ["React","Vue","Node","Express"]}
//     res.render("Profile",{name:req.params.name,data})
//     // console.log(req.params.name);
// });
// app.get("/about",(req,res)=>{
//     res.render("About")
// })
// app.get("/login",(req,res)=>{
//     res.render("Login")
//     console.log(req.query);
// })
// app.get("/",(req,res)=>{
//     res.render("Home")
// })
// app.post("/login",encodedUrl,(req,res)=>{
//     res.render("Home")
//     console.log(req.body);
// })

app.get("/users/:page/:perPage",(req,res)=>{
    let {page , perPage } = req.params
    console.log(page,perPage);
    
    // page = the current pagination no. and perPage = items per page or limit
    // skip() skips the no. of entries in the db for e.g skip(2) will skip the starting 2 entries in db
    // if page = 1 and perPage = 3 then we subtract 1 from page so that it will become zero and it zeros the perPage also and no entries will be skipped.
    // if page is 2 and perPage 3 then (2-1)*3 = 3 then 3 entries will be skipped on page 2 the way as it should work.

    let skipCount = (Number(page) - 1) * perPage
    console.log(skipCount);
    User.find().limit(perPage).skip(skipCount).then((data)=>{
        res.status(201).json(data)
    })
})

app.post("/users",jsonParser,(req,res)=>{
    const data = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    data.save().then((rest)=>res.json(rest)).catch((e)=>console.log(e))
})

// app.delete("/delusers/:id",(req,res)=>{
//     // res.json(req.params)
//         User.deleteOne({_id:req.params.id}).then((result)=>{
//             res.status(200).json(result)
//         }).catch((err)=>console.log(err))
// })

// app.put("/putuser/:id",jsonParser,(req,res)=>{
//     User.findOneAndUpdate(
//         {_id:req.params.id},
//         {$set:{name:req.body.name}}
        
//         ).then((result)=>{
//         res.status(200).json(result)
//     }).catch((err)=>console.log(err))
// })

app.get("/search/:email",(req,res)=>{
    var regex = new RegExp(req.params.email,"i")
    console.log(req.params)
    User.find({email:regex}).limit(2).then((resl)=>{
        res.status(200).json(resl)
    }).catch((err)=>console.log(err))
})

app.listen(4500,()=>{
    console.log("server started at localhost:4500");
})
