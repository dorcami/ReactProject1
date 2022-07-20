import { useState, useEffect } from 'react';
import AddTodo from './AddTodo';
import './App.css';

export default function TodosComp(props) {
  
  const[Todos, setTodos] = useState(props.todos)
  const[nextID, setnextID] = useState(0)
  const [showAddTodo,setShowAddTodo] = useState(false)


  useEffect(()=>{
    setTodos(props.todos);
    if(Object.keys(props.todos).length>0){
    setnextID(Number(Object.keys(props.todos).reduce((a, b) => props.todos[a] > props.todos[b] ? a : b))+1)}
    else{setnextID(1)}
  },[props])

  return (
    <div style={{position: "relative"}}>

      { showAddTodo &&
        <AddTodo id={props.id} nextid={nextID} callback={{showAddTodo: key => setShowAddTodo(key), 
          addtodo: obj => {setShowAddTodo(false); props.callback.addtodo(obj)}}}/>
      }

      { !showAddTodo &&
        <div>
        <h2 className={"centered"}>Todos - User {props.id}</h2><input type="button" value="Add Todo" onClick={() => setShowAddTodo(true)}/>
        {
        Object.keys(Todos).map((key)=>{
          return (<div key={key} className={"todo"}>
              <strong>Title:</strong> {Todos[key].title} <br></br><br></br>
              <strong>Completed?:</strong> {String(Todos[key].completed)}<br></br>
              {
                !Todos[key].completed && <input type="button" value="mark completed" className={"mark"} onClick={() => props.callback.complete(key)}/>
              }
            </div>)
        })
      }
      </div>
    }
    </div>
  );
}
