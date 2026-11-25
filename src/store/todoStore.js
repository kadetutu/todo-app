import { create } from "zustand";

const todoStore = (set) => ({
    todoList: [],
    addTodo: (item) => {
        set((state) => ({
            todoList: [...state.todoList, {id: Date.now(), task: item, completed: false, editing: false}],
        }))
    },
    deleteTodo: (id) => {
        set((state) => ({
            todoList: [...state.todoList.filter((item) => item.id !== id)]
        }))
    },
    toggleTodo: (id) => {
        set((state) => ({
            todoList: [...state.todoList.map((todo) => todo.id ===id ? {...todo, completed: !todo.completed} : todo)],
        }))
    },
    editTodo: (id) => {
        set((state) => ({
            todoList: [...state.todoList.map((todo) => todo.id ===id ? {...todo, editing: !todo.editing} : todo)],
        }))
    },
    editTask: (id,task) => {
        set((state) => ({
            todoList: [...state.todoList.map((todo) => todo.id === id ? {...todo, task:task, editing: !todo.editing} : todo)]
        }))
    }
});

const useTodoStore = create(todoStore);
export default useTodoStore;