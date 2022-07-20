import { useState, useEffect } from 'react';
import './App.css';
import OtherDataComp from './OtherData';
// import utils from './Utils';

//https://jsonplaceholder.typicode.com/users
//https://jsonplaceholder.typicode.com/posts
//https://jsonplaceholder.typicode.com/todos

export default function UserComp(props) {

  const [user, setUser] = useState(props.userData)
  const [updateduser, setupdateduser] = useState(props.userData)
  const [ShowOtherData, setShowOtherData] = useState(false)
  const [activecolor, setActiveColor] = useState("salmon")

  const UpdateUser = () =>{
    user.address = updateduser
    props.callback.update(user)
  }

  useEffect(()=>{
    if(props.completion){
      setActiveColor('mediumaquamarine')
    }
    else{setActiveColor('salmon')}
  },[props.completion])

  return (
    <div style={{"background": props.selected===user.id? activecolor: "linear-gradient(145deg, #dddddd, #ffffff"}} className={props.completion? "user tasksdone" : "user opentasks" }>
      <div onClick={() => props.callback.select(user.id)} className={"centered"} style={{cursor:"pointer", padding: "15px"}}>
        <h3 className={"centered"} style={{margin: "0"}}>User ID: {user.id}</h3>
        <h4>User Name: </h4><input type="text" value={user.name} onChange={(e) => setUser({...user, name: e.target.value})}/>
        <h4>Email Address: </h4><input type="text" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})}/>
      </div>
      <div className={"centered"}>
      <input type="button" value="Other Data" onMouseOver={()=> setShowOtherData(true)} onClick={() => setShowOtherData(false)}/>
      {
        ShowOtherData && <OtherDataComp userData={{street: user.address.street, city: user.address.city, zipcode: user.address.zipcode}}
        callback={{user: obj => {setupdateduser(obj);console.log(obj)}}}/>
      }
      <input type="button" value="Update" onClick={UpdateUser}/>
      <input type="button" value="Delete" onClick={()=> props.callback.delete(user.id)}/>
    </div>
    </div>
  );
}
