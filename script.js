// const fetch = require("node-fetch")
import fetch from "node-fetch"
fetch("http://localhost:4500/users/2/4")
.then(res => res.json())
.then(data => console.log(data))