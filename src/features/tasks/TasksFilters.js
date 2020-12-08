import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const TasksFilters = ({filters, updateFilters}) => {

    const onChange = (e) =>{
        let name = e.target.name;
        let value = e.target.value;
        updateFilters(name, value);
    }
    // reportTitleFilter: '',
    //     deviceNameFilter: '',
    //     taskTitleFilter :'',
    //     tasksStatusFilter: -2,
    return (
        <tr>
            <td>
                <input type="text" className="form-control"
                    name="reportTitleFilter" id="reportTitleFilter" aria-describedby="helpId" 
                    placeholder="searching id"
                    value = {filters.reportTitleFilter}
                    onChange = {(e)=> onChange(e)}
                />
            </td>
            <td>
                <input type="text" className="form-control"
                    name="deviceNameFilter" id="deviceNameFilter" aria-describedby="helpId"
                    placeholder="searching name"
                    value = {filters.deviceNameFilter}
                    onChange = {e => onChange(e)}
                    />
            </td>
           

            <td>
                <input type="text" className="form-control"
                    name="taskNameFilter" id="taskNameFilter" aria-describedby="helpId"
                    placeholder="searching phone" 
                    value = {filters.taskNameFilter}
                    onChange = {e => onChange(e)}
                    />
            </td>
          
            <td>

                <select className="form-control" name="tasksStatusFilter" id="tasksStatusFilter"
                 value = {filters.tasksStatusFilter} 
                onChange={e => onChange(e)} >
                    <option value={-2}>all</option>
                    <option value={-1}>denied</option>
                    <option value={0}>solving</option>
                    <option value={1}>finish</option>
                </select>
            </td>
            <td></td>
        </tr>
    );
}