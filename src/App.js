import React, {useEffect, useState } from 'react';
import './App.css';
import Form from './components/Form';
import TodoList from './components/TodoList';



function App() {

  //states
  const [inputText, setInputText]=useState("");
  const [todos, setTodos]=useState([]);
  const [status, setStatus]=useState('all');
  const [filteredTodos, setFilteredTodos]=useState([]);
//run once
useEffect(()=>{
  getLocalTodos();
},[])
  //UseEffect
  useEffect(() =>{
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

//Functions
  const filterHandler =() =>{
    switch (status){
      case "completed":
        setFilteredTodos(todos.filter((todo)=>todo.completed === true));
        break;
        case "uncompleted":
          setFilteredTodos(todos.filter((todo)=>todo.completed === false));
          break;
          default:
            setFilteredTodos(todos);
            break;
    };
  };

  const saveLocalTodos = ()=>{
      localStorage.setItem('todos', JSON.stringify([]));
    
  };

  const getLocalTodos = ()=>{
    if(localStorage.getItem('todos')===null){
      localStorage.setItem('todos', JSON.stringify([]));
    }else{
      let todoLocal=JSON.parse(localStorage.getItem('todos'));
      setTodos(todoLocal);
      
    }

  };
  return (
    <div className="App" >
      <header>
     <h1 className="title"> To-do list </h1>
     </header>
     <Form todos={todos} setTodos={setTodos} inputText={inputText} setInputText={setInputText} setStatus={setStatus} filteredTodos={filteredTodos}/>
     <TodoList filteredTodos={filteredTodos} setTodos={setTodos} todos={todos} />
    </div>
  );
}

export default App;
