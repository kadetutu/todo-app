import { Trash2, PencilLine } from "lucide-react";

const TodoItems = ({text, id, completed, deleteTodo, toggleTodo, EditTodo}) => {

    return (
        <div className="flex items-center my-3 gap-2">
            <div className="flex flex-auto items-center cursor-pointer hover:bg-blue-200 rounded-full border border-gray-400 bg-gray-200 px-2">
                <input type="checkbox" className="size-4 flex items-center cursor-pointer"
                checked={completed} onChange={() => toggleTodo(id)} />
                <span className={`grow ${completed ? "line-through text-gray-500" : "text-slate-700 ml-2 text-md font-semibold"}`}>
                {text}
                </span>
                <span className="p-2"><PencilLine className={`${completed ? "text-gray-500 w-5 hover:font-bold ml-4 hidden" : "text-gray-500 w-5 hover:font-bold ml-4"}`} onClick={()=>EditTodo(id)}/></span>
                <span className="p-2"><Trash2 className="text-gray-500 w-5 hover:font-bold" onClick={()=>deleteTodo(id)}/></span>

            </div>

        </div>
    )
}
export default TodoItems
