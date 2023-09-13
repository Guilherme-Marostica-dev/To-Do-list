import React, { useState, useEffect } from "react";
import './TodoList.css';
import icon from './assets/icon.webp'

function TodoList(){

    const listStorage = localStorage.getItem('List');

    const [list, setList] = useState(listStorage ? JSON.parse(listStorage): []);

    const [newTask, setNewTask] = useState("");

    useEffect(()=>{
        localStorage.setItem('List', JSON.stringify(list));
    },[list])

    function addTask(form){
        form.preventDefault();
        if(!newTask){
            return;
        }
        setList([...list, {text: newTask, isCompleted: false}]);
        setNewTask("");
        document.getElementById('input-entry').focus();
    }

    function hasClick(index){
        const listAux = [... list]
        listAux[index].isCompleted = !listAux[index].isCompleted;
        setList(listAux);
    }
    function deleted(index){
        const listAux = [... list]
        listAux.splice(index,1);
        setList(listAux);
    }

    function deleteAll (){
        setList([]);
    }

    return (
    <>
        <div>
            <h1> To Do List</h1>
            <form onSubmit={addTask}>
                <input 
                    type="text"
                    value={newTask}
                    onChange={(e)=>{setNewTask(e.target.value)}}
                    id="input-entry"
                    placeholder="Adicione uma tarefa"                    
                />

                <button type="submit" className="add">Add</button>
            </form>
        </div>
        <div className="tasklist">
            <div style={{textAlign:'center'}}>
                {
                    list.length < 1 
                    ? 
                    <img className="centralItem" src={icon}/>
                    :
                    list.map((task, index)=>(
                        <div 
                            key={index}
                            className={task.isCompleted ? "task completed" : "task"}>
                            <span onClick={()=> { hasClick(index) }}>{task.text}</span>
                            <button onClick={()=> { deleted(index) }} className="del">Delete</button>
                        </div>
                    ))
                }
            {
                list.length > 0 &&
                <button onClick={()=> { deleteAll() }} className="delAll">Delete All</button>
            }
            </div>
        </div>
    </>
    )
}

export default TodoList