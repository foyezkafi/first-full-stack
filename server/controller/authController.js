// const authController = (req, res)=>{
//     const balance = 10000
//     // const {userName , pass , email} = req.body
//     // if(!userName){
//     //     res.send("userName dite hobe")
//     // }else if (!email){
//     //     res.send("email dite hobe")
//     // }else if (!pass){
//     //     res.send("password dite hobe")
//     // }else{

//     //     console.log(userName, pass, email)
//     // }
//   res.send(balance)

// }

const Usermodel = require("../model/Usermodel");

const getAllUsers = async (req, res) => {
  const data = await Usermodel.find()
  res.send(data)
};

const registration = async (req, res) => {
  const { username, email, password } = req.body;

 const existedUser = await Usermodel.findOne({email: email})
if(existedUser){
  res.status(409).json({
    succes: false,
    message: "User Already existed",
    email: existedUser.email
  })
  return
}


  const users = new Usermodel({
    username: username,
    email: email,
    password: password,
  });

  await users.save();

  // res.send("User registered successfully");
  res.status(201).json({
    success: true,
    message: "User Created Successfully",
    data: users,
  });
};

const userDelete = async (req, res) => {
   const id = req.params
  try {
      await Usermodel.findByIdAndDelete(id.id)
      res.send("delete hoise")
  } catch (error) {
    res.send("User can't delete")
  }

};
const userUpdate = async (req, res) => {
   const id = req.params
   const {username, email, password} = req.body
  try {
    await Usermodel.findByIdAndUpdate(id.id,{username, email, password})
      res.send("update hoise")
  } catch (error) {
    res.send("User can't updated")
  
  }
};

module.exports = { getAllUsers, registration, userDelete, userUpdate};
