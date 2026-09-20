import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  let [updateMode, setUpdateMode] = useState(false);
  let [updateId, setUpdateId] = useState("")
  let [userList, setUserList] = useState();
  let [FormData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  let [error, setError] = useState({
    username: "",
    email: "",
    password: "",
  });
  let handleForm = (e) => {
    let { name, value } = e.target;
    setFormData({ ...FormData, [name]: value });
    setError({});
  };

const handleSubmit = async () => {
  const response = await axios.post("http://localhost:8000/registration", {
    username: FormData.username,
    email: FormData.email,
    password: FormData.password,
  }).then(()=>{
    setFormData({
      username: "",
      email: "",
      password: "",
    })
    setUpdateId(Date.now())
  });
}
  const handleDelete = async (i) => {
    setUpdateId(i._id)
    await axios.delete(`http://localhost:8000/delete/${i._id}`).then(()=>{
      setUpdateId()
    });
  };

  const handleUpdate = (i) => {
    setUpdateMode(true)
    setUpdateId(i._id)
    setFormData({
      username: i.username,
      email: i.email,
      password: i.password,
    });
  };

  const handleFormUpdate = async () => {
    const response = await axios.post(`http://localhost:8000/update/${updateId}`, {
      username: FormData.username,
      email: FormData.email,
      password: FormData.password,
    }).then(()=>{
      setUpdateId("")
      setUpdateMode(false)
      setFormData({
         username: "",
        email: "",
        password: "",
      })
    });
  }

  useEffect(() => {
    async function fetch() {
      const response = await axios.get("http://localhost:8000/allusers");
      setUserList(response.data);
    }
    fetch();
  }, [updateId]);

  return (
    <div>
      <div>
        <input
          onChange={handleForm}
          name="username"
          type="text"
          placeholder="Enter your Name"
          value={FormData.username}
        />
      </div>
      <br />
      <div>
        <input
          onChange={handleForm}
          name="email"
          type="email"
          placeholder="Enter your Email"
          value={FormData.email}
        />
      </div>
      <br />
      <div>
        <input
          onChange={handleForm}
          name="password"
          type="password"
          placeholder="Enter your Password"
          value={FormData.password}
        />
      </div>
      <br />
      {updateMode ? (
        <button onClick={handleFormUpdate}>Update</button>
      ) : (
        <button onClick={handleSubmit}>Submit</button>
      )}
      <h1>User List:</h1>
      <div className="card_wrapper">
        {userList?.map((item, index) => (
          <div key={index} className="card_item">
            <h3>Name: {item.username}</h3>
            <h3>Email:{item.email}</h3>
            <h3>Password:{item.password}</h3>
            <button onClick={() => handleDelete(item)}>Delete</button>
            <button onClick={() => handleUpdate(item)}>Update</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;