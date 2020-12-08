import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './employeesStyle.css';
export const EmployeesToolkitMenu = ({displayToolbar, updateEmployeeModal, toolbar}) =>{
    const {top, left, isDisplay} = toolbar;

    const dispatch = useDispatch();

    const onClickAddEmployee = () =>{
        displayToolbar(false);
        updateEmployeeModal(true , 0);
        
        
    }
    const onClickShowDetail = () =>{
        
        displayToolbar(false);
        updateEmployeeModal(true , 1);        
    }
    return (
        <span className="menu-toolbar" style={{top, left, display: isDisplay===true?'block':'none'}}>
            <button type="button" className="btn btn-primary"
                onClick={onClickAddEmployee}
            >
                <i className="fa fa-plus reg-icon" aria-hidden="true"></i>
            </button>&nbsp;
            <button type="button" className="btn btn-primary">
                <i className="fa fa-pencil-square-o reg-icon" aria-hidden="true"></i>
            </button>
            &nbsp;
            <button type="button" className="btn btn-primary" onClick={onClickShowDetail}>
                <i className="fa fa-info-circle reg-icon" aria-hidden="true"></i>
            </button>
        </span>
    );
}