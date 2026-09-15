import { useEffect, useState } from "react"
import axios from 'axios';

function App() {
  const [userlist, setUserList] = useState()
  let [FormData, setFromData] = useState({
    username: "",
    email: "",
    password: "",
  })
  let [error, setError] = useState({
    username: "",
    email: "",
    password: "",
  })

  let handleForm = (e) => {
    let { name, value } = e.target
    setFromData({ ...FormData, [name]: value })
    setError({})
  }

  const handleSubmit = async () => {
    const response = await axios.post('http://localhost:8000/registration', {
    username: FormData.username,
    email: FormData.email,
    password: FormData.password,
});

   console.log(response);
  }



  const handleDelete = async (i) => {
    await axios.delete(`http://localhost:8000/delete/${i._id}`)
  }

    useEffect(()=>{
  async function fetch(){
  const response = await axios.get('http://localhost:8000/allusers');
   setUserList(response.data)
  
  }
  fetch()
  
  },[handleDelete])

  return (
    <div>
      <div>
        <input 
          onChange={handleForm} 
          name="username" 
          type="text" 
          placeholder="Enter Your Name" 
        />
      </div>

      <br />

      <div>
        <input 
          onChange={handleForm} 
          name="email" 
          type="email" 
          placeholder="Enter Your email" 
        />
      </div>

      <br />

      <div>
        <input 
          onChange={handleForm} 
          name="password" 
          type="password" 
          placeholder="Enter Your password" 
        />
      </div>

      <br />

      <button onClick={handleSubmit}>Submit</button>
      <h1>
        <div className="card_wrapper">
          {userlist?.map((item,index)=>(
            <div key={index}  className="card_item">
            <h3>Name: {item.username}</h3>
            <h3>Email: {item.email} </h3>
            <h3>Password: {item.password} </h3>
            <button onClick={()=>handleDelete(item)}>Delete</button>
          </div>

          ))
          
          }
       
        </div>

   
      </h1>
    </div>
  )
}

export default App