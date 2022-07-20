import { useState, useEffect } from 'react';
import AddPost from './AddPost';
import './App.css';


export default function PostsComp(props) {

  const[posts, setPosts] = useState(props.posts)
  const[nextID, setnextID] = useState(0)
  const [showAddPost,setShowAddPost] = useState(false)
  

  useEffect(()=>{
    setPosts(props.posts);
    if(Object.keys(props.posts).length>0){
    setnextID(Number(Object.keys(props.posts).reduce((a, b) => props.posts[a] > props.posts[b] ? a : b))+1)}
    else{setnextID(1)}
  },[props])


  return (
    <div style={{position: "relative"}}>
      { showAddPost &&
        <AddPost id={props.id} nextid={nextID} callback={{showAddPost: key => setShowAddPost(key), 
          addpost: obj => {setShowAddPost(false); props.callback.addpost(obj)}}}/>
      }

      { !showAddPost &&
        <div>
          <h2 className={"centered"}>Posts - User {props.id}</h2><input type="button" value="add" style={{"right": "5%", top: 0, position: "absolute"}} onClick={() => setShowAddPost(true)}/>
          {
            Object.keys(posts).map((key)=>{
              return (
              <div key={key} className={"post"}>
                <strong>Title:</strong> {posts[key].title} <br></br><br></br>
                <strong>Body:</strong> {posts[key].body}
              </div>)
            })
          }
        </div>
      }
    </div>
  );
}
