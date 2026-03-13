import React, { useState } from 'react'

const Form = ({createTodo}) => {
    const [value, setValue] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault();
        createTodo(value);
        //console.log(value)
        setValue('')
    }

    return (
        <form className="flex items-center my-7 bg-gray-200 rounded-full" onSubmit={handleSubmit}>
            <input value={value}  onChange={(e)=>setValue(e.target.value)}
                   className="bg-transparent border-0 outline-none
                flex-1 pl-3 pr-2 h-12 placeholder:text-slate-600" type="text"
                   placeholder="Add to task list" />
            <button className="bg-orange-500 w-32 h-12 text-white
                text-lg font-medium rounded-r-full cursor-pointer">Add task</button>
        </form>
    )
}
export default Form
