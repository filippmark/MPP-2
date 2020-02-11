import React, { Component } from 'react'
import './Task.css'

class Task extends Component {
    
    
    updateProgress = () => {

    }
    
    render() {
        return (
            <ul className="Task shadow">
                <li className="Task__description">
                    <input className="border-0 w-75" type="text"></input>
                </li>
                <li className="Task__date">
                   deadline: 29.12.2019
                </li>
                <li className="Task__file">
                    <div className="FileChooser">
                        <input className="FileInput" type="file" id="inputGroupFile"/>
                        <label htmlFor="inputGroupFile" className="fileLabel btn btn-secondary">Choose file</label>
                    </div>
                </li>
                <li className="Task__status">
                    <select className="custom-select border-0">
                        <option value="0"> todo </option>
                        <option value="1"> in progress </option>
                        <option value="2"> ready </option>
                    </select>
                </li>
            </ul>
        )
    }
}

export default Task;