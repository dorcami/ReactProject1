import { useState, useEffect } from 'react';
import './App.css';

export default function AddUser(props) {
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [obj, setobj] = useState({id: props.nextid, name: "", email: "", address: {street: "", city: "", zipcode:""}})

  useEffect(()=>{
    setobj({...obj, name: name})
    // eslint-disable-next-line
  },[name])

  useEffect(() => {
    setobj({...obj, email: email})
    // eslint-disable-next-line
  },[email])

  useEffect(() => {
    setobj({...obj, id: props.nextid})
    // eslint-disable-next-line
  },[props.nextid])




  return (
    <div>
      <br></br>
      <h2 className={"centered"}>Add new user</h2>
      <div className={"user centered"} style={{padding: "20px"}}>
        <strong>Name:</strong> <input type="text" style={{display:"block",margin: "10px auto",boxShadow: "1px 1px 3px hsla(0, 0%, 0%, 0.3)", width:"80%",height: "30px"}} onChange={(e)=>setName(e.target.value)}></input>
        <strong>Email:</strong> <input type="text" style={{display:"block",margin: "10px auto",boxShadow: "1px 1px 3px hsla(0, 0%, 0%, 0.3)", width:"80%",height: "30px"}} onChange={(e)=>setEmail(e.target.value)}></input>
        <div className={"centered"}>
        <input type="button" value="Send" onClick={() => props.callback.adduser(obj)}></input>
        <input type="button" value="cancel" onClick={() => props.callback.showAddUser(false)}></input>
        </div>
      </div>
    </div>
  );
}
