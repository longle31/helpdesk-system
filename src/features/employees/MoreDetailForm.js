import { current } from '@reduxjs/toolkit';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllEmployees, selectEmployeeById } from './employeesSlice';

export const MoreDetailForm = (props) =>{
    const currentEmployeeId = props.currentEmployeeId;
    const allEmps = useSelector(selectAllEmployees);
    const currentEmployee = useSelector(state => selectEmployeeById(state, currentEmployeeId));
   
    const onChange = (e) =>{

    }
    
    if(currentEmployee)
    return(
        <form id="moreDetailForm">
            <div className='input-group flex-nowrap mb-2' >
                <div className="input-group-prepend">
                    <span className="input-group-text">Name</span>
                </div>
                <input type="text" name="name" id="name"
                    className="form-control" onChange={e => onChange(e)} value={currentEmployee.name}
                />
            </div>
        </form>
    );
    return ('');
}