import React, { useState} from 'react';
import { Task } from './Task';
import './Todo.scss';

const Todo = () => {
    const [tasks, setTasks] = useState([
        {
            title: "Grab some Pizza",
            completed: 'completed',
            completedStatus: true
        },
        {
            title: "Do your workout",
            completed: 'completed',
            completedStatus: true
        },
        {
            title: "Hangout with friends",
            completed: 'uncompleted',
            completedStatus: false
        }
    ]);

    const [editState, setEditState] = useState(false);
    const [selectValue, setSelectValue] = useState('all');
    const [editTaskVal, setEditTaskVal] = useState('');
    const [editIndex, setEditIndex] = useState(null);


    const addTask = (title) => {
        const newTasks = [...tasks, { title, completed: 'uncompleted' }];
        setTasks(newTasks);
        setEditState(false);
    };

    const updateTodo = () => {
        const newTasks = [...tasks];
        let newTask = newTasks[editIndex];
        newTask.title = editTaskVal;
        newTasks.splice(editIndex, 1, newTask);
        setTasks(newTasks);
        setEditState(false);
    }

    const completeTask = (index, taskStatus) => {
        const newTasks = [...tasks];
        newTasks[index].completedStatus = !taskStatus;
        setTasks(newTasks);
    };

    const removeTask = index => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    };

    const editTask = index => {
        const newTasks = [...tasks];
        setEditTaskVal(newTasks[index].title);
        setEditIndex(index);
        setEditState(true);
    };


    const selectValueHandler = (e) => {
        setSelectValue(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (!editTaskVal) return;
        if (!editState) {
            addTask(editTaskVal);
        } else {
            updateTodo(editTaskVal)
        }
        setEditTaskVal("");
    }

    return (
        <div className="todo-container">

            <h1>React Todo App</h1>
        
                <div className="create-task container">
                    <input
                        type="text"
                        className="input"
                        value={editTaskVal}
                        placeholder="Add a new task"
                        onChange={e => setEditTaskVal(e.target.value)}
                    />
                    <button className="todo-submit-btn" onClick={handleSubmit}>{!editState ? 'Add Task' : 'Update'}</button>
                

                <div className="filter-tasks">
                    <select onChange={selectValueHandler}>
                        <option defaultValue="" disabled>select</option>
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="uncompleted">Not-Completed</option>
                    </select>
                </div>

                </div>


            { !editState ? <div className="tasks">
                {tasks.map((task, index) => (
                    <Task
                        task={task}
                        index={index}
                        completeTask={completeTask}
                        removeTask={removeTask}
                        editTask={editTask}
                        selectedValue={selectValue}
                        key={index}
                    />
                ))}
            </div> : "Editing..."}
        </div>
    );
}

export default Todo;