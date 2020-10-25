import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoAPP.todoList'

function App() {
  const [todoList, setTodos] = useState([])
  const todoNameRef = useRef()
  
  useEffect(()=> {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  },[])

  useEffect(()=>{localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(todoList))},[todoList])

  function toggleTodo(id){
    const newTodos = [...todoList]
    const todo = newTodos.find(todo =>todo.id === id)
    todo.complete =!todo.complete
    setTodos(newTodos)
  }

  function handlerAddTodo(e){
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name:name, complete:false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos(){
    const newTodos = todoList.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

    return (
    <>
    <TodoList todoList={todoList} toggleTodo = {toggleTodo}/>
    <input ref={todoNameRef} type="text"/>
    <button onClick={handlerAddTodo}>Add Todo</button>
    <button onClick = {handleClearTodos}>Clear Completed Todos</button>
    <div>{todoList.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

export default App;
