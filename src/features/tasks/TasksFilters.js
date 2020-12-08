import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const TasksFilters = ({UpdateFilter, tasksFilters}) => {
 
    const onChange = (e) =>{
        let name = e.target.name;
        let value = e.target.value;
        UpdateFilter(name, value);
    }
    return (
        <tr>
            <td>
                <input type="text" className="form-control"
                    name="technicianNameFilter" id="technicianNameFilter" aria-describedby="helpId" 
                    placeholder="searching technician"
                    value = {tasksFilters.technicianNameFilter}
                    onChange = {(e)=> onChange(e)}
                />
            </td>
            <td>
                <input type="text" className="form-control"
                    name="reportTitleFilter" id="reportTitleFilter" aria-describedby="helpId"
                    placeholder="searching title"
                    value = {tasksFilters.reportTitleFilter}
                    onChange = {e => onChange(e)}
                    />
            </td>
           

            <td>
                <input type="text" className="form-control"
                    name="taskNameFilter" id="taskNameFilter" aria-describedby="helpId"
                    placeholder="searching task" 
                    value = {tasksFilters.taskNameFilter}
                    onChange = {e => onChange(e)}
                    />
            </td>
           
            <td>

                <select className="form-control" name="statusFilter" id="statusFilter" 
                    value = {tasksFilters.statusFilter} 
                    onChange={e => onChange(e)} >
                    <option value= {-2}>all</option>
                    <option value={0}>solving</option>
                    <option value={1}>finish</option>
                    <option value={-1}>denied</option>
                </select>
            </td>
            <td></td>
           
        </tr>
    );
}