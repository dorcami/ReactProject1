// Imports

import './App.css';
import Utils from './Utils';
import {useState, useEffect} from 'react';
import UserComp from './UserComp';
import PostsComp from './Posts';
import TodosComp from './Todos';
import AddUser from './AddUser';


//Main Function

export default function App() {


  // State Declartaions
  
  const [users, setUsers] = useState([])
  const [searchValue, setSearch] = useState('')
  const [selectedID, setSelectedID] = useState('')
  const [UsersTodos, setTodos] = useState({})
  const [UsersPosts, setPosts] = useState({})
  const [ShowAddUser, setShowAddUser] = useState(false)
  const [nextUserID, setNextUserID] = useState(0)


  // Function Declarations

    const GetData = async () =>{
      setSelectedID('')
      let userstemp = await Utils.GetAllUsers();
      let todostemp = await Utils.GetUsersTodos();
      let poststemp = await Utils.GetUsersPosts();
      
      let todosobj = {}
      let postsobj = {}

      userstemp.forEach((user) =>{
        let todotemp = todostemp.filter(x =>x.userId === user.id)
        let posttemp = poststemp.filter(x =>x.userId === user.id)
        let todotemp2 = {}
        let posttemp2 = {}
        todotemp.forEach(x => {todotemp2[x.id]=x})
        posttemp.forEach(x => {posttemp2[x.id]=x})
        todosobj[user.id] = todotemp2
        postsobj[user.id] = posttemp2})

      setUsers(userstemp)
      setTodos(todosobj)
      setPosts(postsobj)
    }


    const MarkTodoCompleted = (id, key) => {
      let todotemp = {}
      todotemp[id] = UsersTodos[id]
      todotemp[id][key].completed = true
      setTodos({...UsersTodos,todotemp})
    }


      const CheckTodosCompleted = (id) => {
        let temp = UsersTodos[id]
        let news = Object.values(temp).filter(x => x.completed === false)
        return news.length>0? false : true
      }

      const DeleteUser = (id) =>{
        if(id===selectedID){setSelectedID("")}
        let tempusers = users.filter(x => x.id!==id)
        let temptodos = {...UsersTodos}
        let tempposts = {...UsersPosts}
        delete temptodos[id]
        delete tempposts[id]
        setUsers(tempusers)
        setTodos(temptodos)
        setPosts(tempposts)
      }

      const AddSomeone = (obj) =>{
        setUsers([...users, obj])
        let temptodos = UsersTodos
        let tempposts = UsersPosts
        temptodos[obj.id] = {}
        tempposts[obj.id] = {}
        setTodos(temptodos)
        setPosts(tempposts)

      }

      const AddTodo = (obj, id) =>{
        let temptodos = {}
        temptodos[id] = UsersTodos[id]
        temptodos[id][obj.id] = obj
        setTodos({...UsersTodos, temptodos})
      }


      const AddPost = (obj, id) =>{
        let tempposts = {}
        tempposts[id] = UsersPosts[id]
        tempposts[id][obj.id] = obj
        setPosts({...UsersPosts, tempposts})
      }
      

      useEffect(()=>{
        const checknextid = () =>{
          if(users.length > 0){
            let temp=0
            users.forEach(user =>{
              if(user.id > temp){ temp=user.id}
            })
            setNextUserID(temp+1)
          }
          else{setNextUserID(0)}}
        checknextid();
      },[users])


  return (
    <div className={"container"}>

      {/* Left Column */}

      <div className="left">
        <h2 className={"centered"} style={{}}>Search for:<br></br>
        <input style={{left: "100px", fontSize: "1.5rem"}} type="text" onChange={(e) => setSearch(e.target.value.toLowerCase())} /></h2>
        <div className={"centered"}>
          <input type="button" value="Collect Data from Server" onClick={GetData}/>
          <input type="button" value="Add User" onClick={() => setShowAddUser(!ShowAddUser)}/>
        </div>
        {
        ShowAddUser &&
          <AddUser nextid={nextUserID} callback={{adduser: obj => {setShowAddUser(false);AddSomeone(obj)
          }}}/>
        }
        {
          !ShowAddUser &&
          users.map((user, index) => {
            if(user.name.toLowerCase().includes(searchValue) || user.email.toLowerCase().includes(searchValue)){
              return <UserComp key={user.id} userData={user} completion={CheckTodosCompleted(user.id)} selected={selectedID} callback={{
                update: item => setUsers([...users.slice(0,index), item, ...users.slice(index+1,users.length)]),
                select: num => {if(selectedID===num){ setSelectedID("")} else{setSelectedID(num)}},
                delete: userid => DeleteUser(userid),
                }}/>
            }
            return null
          })
        }
      </div>

      {/* Right Column */}

      {
        selectedID &&
      <div className="right">
        <div>
          <TodosComp id={selectedID} todos={UsersTodos[selectedID]} callback={{
            complete: key => MarkTodoCompleted(selectedID, key),
            addtodo: obj => AddTodo(obj, selectedID)
          }} />
          
        </div>
        <div>
          <PostsComp id={selectedID} posts={UsersPosts[selectedID]} callback={{
            addpost: obj => AddPost(obj, selectedID)
          }}/>
        </div>
      </div>
      }

    </div>
  );
}