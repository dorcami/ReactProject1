import { useState, useEffect } from 'react';
import './App.css';

export default function AddPost(props) {
  
  const [Title, setTitle] = useState('')
  const [Body, setBody] = useState('')
  const [obj, setobj] = useState({userid: props.id, id: props.nextid, title: "", body:""})

  useEffect(()=>{
    setobj({...obj, title: Title})
    // eslint-disable-next-line
  },[Title])

  useEffect(()=>{
    setobj({...obj, body: Body})
    // eslint-disable-next-line
  },[Body])

  useEffect(() => {
    setobj({...obj, id: props.nextid})
    // eslint-disable-next-line
  },[props.nextid])



  return (
    <div>
      <h2 className={"centered"}>Add new post - user {props.id}</h2>
      <div className={"todo centered"}>
        <strong>Title:</strong> <input type="text" style={{display:"block",margin: "10px auto",boxShadow: "1px 1px 3px hsla(0, 0%, 0%, 0.3)", width:"90%",height: "30px"}} onChange={(e)=>setTitle(e.target.value)}></input>
        <strong>Body:</strong> <input type="text" style={{display:"block",margin: "10px auto",boxShadow: "1px 1px 3px hsla(0, 0%, 0%, 0.3)", width:"90%",height: "90px"}} onChange={(e)=>setBody(e.target.value)}></input>
        <div className={"centered"}>
        <input type="button" value="Send" onClick={() => props.callback.addpost(obj)}></input>
        <input type="button" value="cancel" onClick={() => props.callback.showAddPost(false)}></input>
        </div>
      </div>
    </div>
  );
}
