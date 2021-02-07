export function Task({ task, index, completeTask, removeTask, editTask, selectedValue }) {
    return (
        <div>
            {task.completed == selectedValue || selectedValue == 'all' ?
                <div className="task" 
                style={{ textDecoration: task.completedStatus ? "line-through" : "" }}> 
                {task.title}
                    <button style={{ background: "red" }} onClick={() => removeTask(index)}>x</button>
                    <button onClick={() => completeTask(index, task.completedStatus)}>{task.completedStatus !== true ? 'complete' : 'reset'}</button>
                    <button style={{ background: !task.completedStatus ? "green" : 'grey' }} onClick={() => editTask(index)} disabled={task.completedStatus}>Edit</button> </div> : ""}
        </div>
    );
}