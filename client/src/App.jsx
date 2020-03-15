import React, { Component } from 'react'
import Task from './components/Task/Task'
import './App.css'
import moment from 'moment'
import axios from 'axios'

export default class App extends Component {

  state = {
    filters: {
      showTodos: { checked: true, name: 'todo' },
      showInProgress: { checked: true, name: 'in progress' },
      showReady: { checked: true, name: 'ready' }
    },
    tasks: [],
  }

  componentDidMount() {

    this._getTasks(['todo', 'in progress', 'ready']);

  }

  _getTasks = async (states) => {



    try {

      const response = await axios.get(`http://localhost:8080/tasks?progress=${states.join(',')}`);

      this.setState({
        ...this.state,
        tasks: response.data
      }, () => { console.log(this.state) });

    } catch (error) {

      console.log(error);

    }

  }

  _filterNames = ['showTodos', 'showInProgress', 'showReady'];

  _updateFilter = (event) => {
    console.log(event.target.name);

    let filters = { ...this.state.filters };

    filters[event.target.name].checked = !filters[event.target.name].checked;

    this._getTasks(Object.values(this.state.filters).filter((filter) => { return filter.checked }).map(filter => filter.name));

    this.setState({
      ...this.state,
      filters
    })
  }

  _addNewTask = (event) => {

    const tasks = [...this.state.tasks];

    tasks.push({
      description: '',
      date: '',
      filepath: null,
      progress: 'todo',
      isChanged: true,
      isNew: true,
    })

    this.setState({
      ...this.state,
      tasks
    })

  }


  _updateTask = async (task) => {

    console.log(task);

    try {

      let response;

      if (task.isNew) {
        response = await axios.post("http://localhost:8080/tasks", {
          ...task
        });
      } else {
        console.log(task);
        response = await axios.put(`http://localhost:8080/tasks/${task.index}`, {
          ...task
        });
      }

      console.log(response);

    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <ul className="Filters shadow-sm">
          <li className="mr-2">
            <button type="button" className="btn btn-secondary" onClick={this._addNewTask}>
              Add
            </button>
          </li>
          <li>
            <div className="form-check form-check-inline">
              <input className="form-check-input" name="showTodos" type="checkbox" id="todo" onChange={this._updateFilter} checked={this.state.filters.showTodos.checked} />
              <label className="form-check-label" htmlFor="todo"> todo </label>
            </div>
          </li>
          <li>
            <div className="form-check form-check-inline">
              <input className="form-check-input" name="showInProgress" type="checkbox" id="inProgress" onChange={this._updateFilter} checked={this.state.filters.showInProgress.checked} />
              <label className="form-check-label" htmlFor="inProgress"> in progress </label>
            </div>
          </li>
          <li>
            <div className="form-check form-check-inline">
              <input className="form-check-input" name="showReady" type="checkbox" id="ready" onChange={this._updateFilter} checked={this.state.filters.showReady.checked} />
              <label className="form-check-label" htmlFor="ready"> ready </label>
            </div>
          </li>
        </ul>
        {
          this.state.tasks.map((task, index) => {

            const { description, date, filepath, progress, isChanged, isNew, _id } = task;

            return <Task
              key={_id ? _id : index}
              index={_id ? _id : index}
              description={description}
              date={date} filepath={filepath}
              progress={progress}
              isDateValid={moment(date, 'DD.MM.YYYY').isValid()}
              isChanged={isChanged}
              updateTask={this._updateTask}
              isNew={isNew}>
            </Task>
          })
        }
      </div >
    )
  }
}