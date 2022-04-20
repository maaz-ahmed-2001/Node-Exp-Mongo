const express = require("express")
const app = express()
const router = express.Router()
const User = require("./model/user")
const bodyParser = require("body-parser")
const encodedUrl = bodyParser.urlencoded()
const jsonParser = bodyParser.json()
const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://maaz:<password>0@cluster0.biaxw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("connected");
})


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

// app.get("/users",(req,res)=>{
//     User.find().select("email").then((data)=>{
//         res.status(201).json(data)
//     })
// })

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

app.get("/search/:name",(req,res)=>{
    var regex = new RegExp(req.params.name,"i")
    User.find({name:regex}).then((resl)=>{
        res.status(200).json(resl)
    }).catch((err)=>console.log(err))
})


app.listen(4500,()=>{
    console.log("server started at localhost:4500");
})
