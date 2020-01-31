import React from "react";

const Task = ({task, deleteTask}) => {
    const {taskName, id} = task;
    return(
        <div>
            {taskName}<button onClick={() => deleteTask(id)}>Del</button>
        </div>
    );
};

export default Task;
