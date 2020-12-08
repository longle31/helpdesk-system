import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectEmployeeById } from '../employees/employeesSlice';
import { selectReportById } from '../reports/reportsSlice';
import { selectTaskById } from './tasksSlice';


export const TaskRow = ({ task, setCurrentTaskId}) => {
   
  
  
   

    return (
        <tr  onClick={e => { setCurrentTaskId(task._id) }} 
            data-toggle="modal" data-target="#exampleModal"
            className ={task.status === -1 ?'bg-warning':''}
        >
            
            <td>{task.technicianName}</td>
            <td>{task.reportTitle}</td>
            <td>{task.taskName}</td>

            
            <td>
                {task.status === -1 ?
                    <span className="badge badge-fill badge-danger">Denied</span>
                    : (task.status === 0 ? <span className="badge badge-fill badge-primary">Solving</span> :
                        (task.status === 1 ? <span className="badge badge-fill badge-success">Finish</span> : ''))

                }

            </td>
            <td>

                <span className="progress">
                    <span className="progress-bar progress-bar-striped bg-danger" role="progressbar"
                        style={{ width: `${task.progress}%` }} aria-valuenow={task.progress} aria-valuemin="0" aria-valuemax="100">
                        {task.progress}
                    </span>
                </span>
            </td>
        </tr>);
}