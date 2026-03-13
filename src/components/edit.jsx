import React, {useState} from 'react'

const Edit = ({editTask, text, id}) => {

    const[editValue, setEditValue] = useState(text)

    return (
        <div>
            <div className="flex flex-auto items-center hover:bg-blue-200 rounded-full border border-gray-400 bg-gray-200">
                <input type="text" className="bg-transparent border-0 outline-none
                flex-1 ml-4 p-2 h-12 placeholder:text-slate-600" placeholder={text}
                       onChange={(e) => setEditValue(e.target.value)} />
                <button className="flex items-center bg-orange-500 w-32 h-12 text-white
                text-lg font-medium rounded-r-full cursor-pointer" onClick={()=>editTask(editValue, id)}>Update task</button>
            </div>
        </div>
    )
}
export default Edit
