// import React, { useState, useEffect } from "react";

// function ToDoList() {

//     // Load tasks from localStorage at first render
//     const [task, setTasks] = useState(() => {
//         return JSON.parse(localStorage.getItem("tasks")) || [];
//     });

//     const [newTask, setNewTask] = useState("");

//     const [editingIndex, setEditingIndex] = useState(-1);
//     const [editValue, setEditValue] = useState("");

//     // Store tasks into localStorage whenever task state changes
//     useEffect(() => {
//         localStorage.setItem("tasks", JSON.stringify(task));
//     }, [task]);

//     function handleInputChange(event){
//         setNewTask(event.target.value);
//     }

//     function addTask(){
//         if(newTask.trim() !== ""){
//             setTasks(t => [...t, newTask]);
//             setNewTask("");
//         }
//     }

//     function startEdit(index){
//         setEditingIndex(index);
//         setEditValue(task[index]);
//     }

//     function saveEdit(){
//         if (editValue.trim() !== ""){
//             setTasks(task.map((t, i) => 
//                 i === editingIndex ? editValue : t
//             ));
//         }
//         setEditingIndex(-1);
//         setEditValue("");
//     }

//     function deleteTask(index){
//         const updatedTasks = task.filter((_, i)=> i!==index);
//         setTasks(updatedTasks);
//     }

//     function moveTaskUp(index){
//         if(index > 0){
//             const updatedTasks = [...task];
//             [updatedTasks[index], updatedTasks[index - 1]] = 
//             [updatedTasks[index - 1], updatedTasks[index]];
//             setTasks(updatedTasks);
//         }
//     }

//     function moveTaskDown(index){
//         if(index < task.length - 1){
//             const updatedTasks = [...task];
//             [updatedTasks[index], updatedTasks[index + 1]] = 
//             [updatedTasks[index + 1], updatedTasks[index]];
//             setTasks(updatedTasks);
//         }
//     }

//     return (
//         <div className="to-do-list">
//             <h1>To-Do-List</h1>

//             <div>
//                 <input 
//                     type="text"
//                     placeholder="Enter a Task.."
//                     value={newTask}
//                     onChange={handleInputChange} />

//                 <button 
//                     className="add-button"
//                     onClick={addTask}>
//                     Add
//                 </button>
//             </div>

//             <ol>
//                 {task.map((tasks, index) => 
//                     <li key={index}>
                        
//                         {/* Task Text */}
//                         <span className="text">{tasks}</span>

//                         {/* Edit Button */}
//                         <button 
//                             className="edit-button" 
//                             onClick={() => startEdit(index)}
//                         >
//                             Edit
//                         </button>

//                         {/* Edit Mode */}
//                         {editingIndex === index && (
//                             <div className="edit-mode-block">

//                                 <input
//                                     type="text"
//                                     className="edit-block-input"
//                                     value={editValue}
//                                     onChange={(e) => setEditValue(e.target.value)}
//                                     onKeyDown={(e) => e.key === "Enter" && saveEdit()}
//                                     autoFocus
//                                 />

//                                 <div className="edit-buttons-row">
//                                     <button className="save-button" onClick={saveEdit}>Save</button>
//                                     <button className="cancel-button" onClick={() => setEditingIndex(-1)}>Cancel</button>
//                                 </div>

//                             </div>
//                         )}

//                         {/* Delete & Move Buttons */}
//                         <button className="delete-button" onClick={() => deleteTask(index)}>
//                             Delete
//                         </button>

//                         <button className="move-button" onClick={() => moveTaskUp(index)}>
//                             👆🏻
//                         </button>

//                         <button className="move-button" onClick={() => moveTaskDown(index)}>
//                             👇🏻
//                         </button>

//                     </li>
//                 )}
//             </ol>
//         </div>
//     );
// }

// export default ToDoList;



import React, { useState, useEffect } from "react";

function ToDoList() {

    // Load tasks from localStorage at first render
    const [task, setTasks] = useState(() => {
        return JSON.parse(localStorage.getItem("tasks")) || [];
    });

    const [newTask, setNewTask] = useState("");

    const [editingIndex, setEditingIndex] = useState(-1);
    const [editValue, setEditValue] = useState("");

    // MESSAGE SYSTEM
    const [message, setMessage] = useState({ text: "", type: "" });

    function showMessage(text, type = "info") {
        setMessage({ text, type });
        setTimeout(() => setMessage({ text: "", type: "" }), 2000);
    }

    // Store tasks into localStorage whenever task state changes
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(task));
    }, [task]);

    function handleInputChange(event){
        setNewTask(event.target.value);
    }

    function addTask(){
        if (!newTask.trim()) {
            showMessage("Please enter a task", "error");
            return;
        }

        if (task.some(t => t.toLowerCase() === newTask.toLowerCase())) {
            showMessage("Task already exists!", "error");
            return;
        }

        setTasks(t => [...t, newTask]);
        setNewTask("");
        showMessage("Task added successfully!", "success");
    }

    function startEdit(index){
        setEditingIndex(index);
        setEditValue(task[index]);
    }

    function saveEdit(){
        if (!editValue.trim()) {
            showMessage("Task cannot be empty", "error");
            return;
        }

        setTasks(task.map((t, i) => 
            i === editingIndex ? editValue : t
        ));

        setEditingIndex(-1);
        setEditValue("");
        showMessage("Task updated!", "success");
    }

    function deleteTask(index){
        const updatedTasks = task.filter((_, i)=> i !== index);
        setTasks(updatedTasks);
        showMessage("Task deleted!", "warning");
    }

    function moveTaskUp(index){
        if(index > 0){
            const updatedTasks = [...task];
            [updatedTasks[index], updatedTasks[index - 1]] = 
            [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
            showMessage("Moved up!", "info");
        }
    }

    function moveTaskDown(index){
        if(index < task.length - 1){
            const updatedTasks = [...task];
            [updatedTasks[index], updatedTasks[index + 1]] = 
            [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
            showMessage("Moved down!", "info");
        }
    }

    return (
        <div className="to-do-list">
            <h1>To-Do-List</h1>

            {/* MESSAGE UI */}
            {message.text && (
                <div className={`message ${message.type}`}>
                    {message.text}
                </div>
            )}

            <div>
                <input 
                    type="text"
                    placeholder="Enter a Task.."
                    value={newTask}
                    onChange={handleInputChange} />

                <button 
                    className="add-button"
                    onClick={addTask}>
                    Add
                </button>
            </div>

            <ol>
                {task.map((tasks, index) => 
                    <li key={index}>
                        
                        <span className="text">{tasks}</span>

                        <button 
                            className="edit-button" 
                            onClick={() => startEdit(index)}
                        >
                            Edit
                        </button>

                        {editingIndex === index && (
                            <div className="edit-mode-block">

                                <input
                                    type="text"
                                    className="edit-block-input"
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                                    autoFocus
                                />

                                <div className="edit-buttons-row">
                                    <button className="save-button" onClick={saveEdit}>Save</button>
                                    <button className="cancel-button" onClick={() => setEditingIndex(-1)}>Cancel</button>
                                </div>

                            </div>
                        )}

                        <button className="delete-button" onClick={() => deleteTask(index)}>
                            Delete
                        </button>

                        <button className="move-button" onClick={() => moveTaskUp(index)}>
                            👆🏻
                        </button>

                        <button className="move-button" onClick={() => moveTaskDown(index)}>
                            👇🏻
                        </button>

                    </li>
                )}
            </ol>
        </div>
    );
}

export default ToDoList;
