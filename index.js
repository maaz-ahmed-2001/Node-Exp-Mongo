const express = require("express")
const app = express()
const router = express.Router()

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

app.set("view engine","ejs")
app.use("/assets",express.static("assets"))
app.get("/profile/:name",(req,res)=>{
    data = {email:"maaz@abc.com",age : "21" , gender : "Male", skills : ["React","Vue","Node","Express"]}
    res.render("Profile",{name:req.params.name,data})
    // console.log(req.params.name);
});
app.get("/about",(req,res)=>{
    res.render("About")
})
app.get("/",(req,res)=>{
    res.render("Home")
})

app.listen(4500,()=>{
    console.log("server started at localhost:4500");
})