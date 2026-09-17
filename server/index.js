const dns = require("node:dns");
require("dotenv").config();
const express = require("express");
var cors = require('cors')
const authController = require("./controller/authController.js");
const dbConfig = require("./config/dbConfig.js");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

// const bankMiddlewear = require("./middlewear/bankmiddlewear.js")

const app = express();
app.use(express.json());
app.use(cors())
// const port = 8000;
const port = process.env.PORT || 8000;
const db_url = process.env.DB_URL;

dbConfig();

app.get("/", (req, res) => {
  const data = [
    {
      userId: 1,
      id: 1,
      title:
        "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    },
    {
      userId: 1,
      id: 2,
      title: "qui est esse",
      body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
    },
    {
      userId: 1,
      id: 3,
      title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
      body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
    },
  ];

  res.send(data);
  console.log(data);
});

// -------------------------1 start (singale data dhorte hole) ------------------

// app.post("/registration", (req, res)=>{
//     console.log(req.body.userName)
// })
// -------------------------1 end ------------------

// -------------------------2 start (D strauctior) ------------------

// app.post("/registration", (req, res)=>{
//     const {userName , pass , email} = req.body
//     console.log(userName, pass, email)
// })
// -------------------------2 end ------------------

// -------------------------3 start (conditation)------------------

// app.post("/registration", (req, res)=>{
//     const {userName , pass , email} = req.body
//     if(!userName){
//         res.send("userName dite hobe")
//     }else if (!email){
//         res.send("email dite hobe")
//     }else if (!pass){
//         res.send("password dite hobe")
//     }else{

//         console.log(userName, pass, email)
//     }

// })

// -------------------------3 End------------------

// --------------------4th ( alada file (authController) )----------
// app.post("/registration", authController)
// --------------------4th End ----------

// ----------5th ( middle wear )

// -------------next-----
// app.post("/bankinfo", (req, res, next)=>{
//   next()
// },  authController)
//-------------end -------------

// -------------password----------
// app.post("/bankinfo", bankMiddlewear,  authController)
// // -----------------end --------------

// ----------5th ( middle wear ) end----------------------------------------
// ==================classs start===============

app.get("/allusers", authController.getAllUsers);
app.post("/registration", authController.registration);
app.delete("/delete/:id", authController.userDelete)
app.post("/update/:id", authController.userUpdate)

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
