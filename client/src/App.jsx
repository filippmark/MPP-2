import React, { Component } from 'react'
import Task from './components/Task/Task'
import './App.css'

export default class App extends Component {

  state = {
    showTodos: true,
    showInProgres: true,
    showReady: true
  }
  
  _updateFilter = (event) => {
    console.log(event.target.name);
    this.setState({ 
      ...this.state,
      [event.target.name] : !this.state[event.target.name]
     }, () => {console.log(this.state)});
  }

  render() {
    return (
      <div>
        <ul className="Filters shadow-sm">
          <li>
            <div className="form-check form-check-inline">
              <input className="form-check-input" name="showTodos" type="checkbox" id="todo" onChange={this._updateFilter} checked={this.state.showTodos}/>
              <label className="form-check-label" htmlFor="todo"> todo </label>
            </div>
          </li>
          <li>
            <div className="form-check form-check-inline">
              <input className="form-check-input" name="showInProgress" type="checkbox" id="inProgress" onChange={this._updateFilter} checked={this.state.showInProgres}/>
              <label className="form-check-label" htmlFor="inProgress"> in progress </label>
            </div>
          </li>
          <li>
            <div className="form-check form-check-inline">
              <input className="form-check-input" name="showReady" type="checkbox" id="ready" onChange={this._updateFilter} checked={this.state.showReady}/>
              <label className="form-check-label" htmlFor="ready"> ready </label>
            </div>
          </li>
        </ul>
        <Task></Task>
        <Task></Task>
        <Task></Task>
        <Task></Task>
        <Task></Task>
        <Task></Task>
      </div>
    )
  }
}
