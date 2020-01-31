import React from 'react';
import logo from '../logo.svg';
import './App.css';
import Task from '../components/Task';
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from "@nozbe/with-observables";
import { Q } from '@nozbe/watermelondb';


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            taskName: ''
        };

        this.addTask = this.addTask.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    async addTask() {
        const {database} = this.props;
        await database.action(async () => {
            await database.collections.get('tasks').create(task => {
                task.taskName = this.state.taskName;
            });
        });
        this.setState({ taskName: ''});
    }


    async deleteTask(taskId) {
        const {database} = this.props;

        await database.action(async () => {
            const task = await database.collections.get('tasks').find(taskId);
            await task.markAsDeleted();
        })
    }

    updateTask(event) {
        const taskName = event.target.value;
        this.setState({
            taskName
        });
    }

  render() {
    let {tasks, specialTask} = this.props;
    const {taskName} = this.state;

    return (
        <div className="App">
            <h1>{ specialTask && specialTask.length > 0 ? specialTask[0].taskName : 'Nothing is special to you'}</h1>
          <input
              value={taskName}
              id="task"
              name="task"
              onChange={e => this.updateTask(e)}
          />
          <button onClick={this.addTask}>Add</button>
            {
                tasks.map(task =>
                    <Task key={task.id} task={task} deleteTask={this.deleteTask}/>
                )
            }
        </div>
    );
  }
}


// enhancing
export default withDatabase(withObservables([], ({ database }) => ({
    tasks: database.collections.get('tasks').query().observe(),
    specialTask: database.collections.get('tasks').query(Q.where('taskName', 'salifu')).observe()
}))(App))
