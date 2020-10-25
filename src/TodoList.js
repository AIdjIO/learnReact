import React from 'react'
import Todo from './Todo'

export default function todoList({todoList, toggleTodo}) {
    return (
        todoList.map(todo => {
            return <Todo key={todo.id} toggleTodo = {toggleTodo} todo = {todo}/>
        })
    )
}
