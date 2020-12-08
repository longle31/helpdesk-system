import { current } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';


export const TaskToolkitMenu = ({ taskToolkit,currentTaskId, setTaskToolkit, setTaskModal, taskModal }) => {


    const showTaskDetail = () => {
        setTaskToolkit({...taskToolkit, isDisplay: false});
        setTaskModal({...taskModal, isDisplay:true, taskModalOption:  1});
    }
    return (
        <span className="menu-toolbar" style={{
            top: taskToolkit.top,
            left: taskToolkit.left, display: taskToolkit.isDisplay ? "block" : "none"
        }}>
            {currentTaskId?<button type="button" className="btn btn-primary"
                onClick={showTaskDetail}
            >
                <i className="fa fa-pencil-square-o reg-icon" aria-hidden="true"></i>
            </button>:''}&nbsp;

           
            
        </span>
    );
}