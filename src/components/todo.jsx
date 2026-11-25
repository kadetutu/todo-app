import React, {useState} from 'react'
import { useEffect } from "react";
import { ListTodo } from "lucide-react";
import TodoItems from "./TodoItems.jsx";
import Edit from "./edit.jsx";
import { getTodoItem } from '../lib/localstore.js';

const ToDo = ()=> {
    
    const[inputValue, setInputValue] = useState('')
    const[todoList, setTodoList] = useState(()=> {
        const storedTodos = getTodoItem("todoList");
        return storedTodos ? JSON.parse(storedTodos) : [];
    });

    const createTodo = () => {
        //const inputText = inputRef.current.value.trim();
        if (inputValue === "") {
            return;
        }
        const newTodo = {
            id: Date.now(),
            text: inputValue,
            completed: false,
            editing: false,
        }
        const todoExist = todoList.some(todoItem => todoItem.text === inputValue)
        if(!todoExist){
            setTodoList((prevTodos) => [...prevTodos, newTodo]);
        }
        else {
            alert("Todo items already exist")
        }
        setInputValue('');
    }

    const deleteTodo = (id) => {
        setTodoList((prevTodos) => {
            return prevTodos.filter((todo)=> todo.id !== id)
        })
    }

    const toggleTodo = (id) => {
        setTodoList((prevTodos) => {
            return prevTodos.map((todo)=>{
                if(todo.id === id){
                    return {...todo, completed: !todo.completed}
                }
                return todo
            })
        })

    }

    const EditTodo = (id) => {
        setTodoList((prevTodos) => {
            return prevTodos.map((todo) => {
                if(todo.id === id){
                    return {...todo, editing: !todo.editing}
                }
                return todo
            })
        })
    }

    const EditTask = (task, id) => {
        setTodoList((prevTodos) => {
            return prevTodos.map((todo)=>{
                if(todo.id === id){
                    return {...todo, text:task, editing:!todo.editing}
                }
                return todo
            })
        })
    }

    useEffect(() => {
        localStorage.setItem("todoList", JSON.stringify(todoList));
    }, [todoList]);

    return (
        <div className="todo-list-bg">

            {/* ----------- title ------------- */}
            <div className="flex items-center mt-2 gap-2">
                <ListTodo className="text-orange-500 font-bold"/>
                <h2>To-Do List</h2>
            </div>

            {/* ----------- Input box ---------------*/}
            <div className="flex items-center my-7 bg-gray-200 rounded-full">
                <input value={inputValue}  onChange={(e)=>setInputValue(e.target.value)}
                       className="bg-transparent border-0 outline-none
                flex-1 pl-3 pr-2 h-12 placeholder:text-slate-600" type="text"
                       placeholder="Add to task list" />
                <button className="bg-orange-500 w-32 h-12 text-white
                text-lg font-medium rounded-r-full cursor-pointer" onClick={createTodo}>Add task</button>
            </div>

            {/* ----------- Todo List --------------- */}
            <div className="space-y-2">

                {todoList.map((item, index) => (
                    item.editing ? (
                        <Edit key={index} text={item.text} id={item.id} editTask={EditTask} />
                    ) : (
                        <TodoItems className="flex items-center p-3 rounded-lg bg-slate-100 border border-gray-200"
                                   key={index} text={item.text} id={item.id} completed={item.completed}
                                   deleteTodo={deleteTodo} toggleTodo={toggleTodo} EditTodo={EditTodo}
                        />
                    )
                )) }
            </div>

        </div>
    )
}

export default ToDo