function setTodoItem(key, value) {
    try{
        localStorage.setItem(key, JSON.stringify(value));
    }
    catch(error){
        console.error("Error accessing localStorage:", error);
    }    
}

function getTodoItem(key) {
    try{
        const item = localStorage.getItem(key);        
        return item ? item : null;
    }
    catch(error){
        console.error("Error accessing localStorage:", error);
        return null;      
    }
    
}

export { setTodoItem, getTodoItem };