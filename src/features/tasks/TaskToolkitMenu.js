import React from 'react';
import { useDispatch, useSelector } from 'react-redux';


export const TaskToolkitMenu = ({ taskToolkit, setTaskToolkit, setTaskModal, taskModal }) => {



    const showTaskDetail = () => {
        setTaskToolkit({...taskToolkit, isDisplay: false});
        setTaskModal({...taskModal, isDisplay:true, taskModalOption:  1});
    }

    const onDeleteTask = () => {
        setTaskToolkit({...taskToolkit, isDisplay: false});
        setTaskModal({...taskModal, isDisplay:true, taskModalOption: -1});
    }
    return (
        <span className="menu-toolbar" style={{
            top: taskToolkit.top,
            left: taskToolkit.left, display: taskToolkit.isDisplay ? "block" : "none"
        }}>
            <button type="button" className="btn btn-primary"
                onClick={showTaskDetail}
            >
                <i className="fa fa-pencil-square-o reg-icon" aria-hidden="true"></i>
            </button>&nbsp;
            <button type="button" className="btn btn-danger"
                onClick={onDeleteTask}
            >
                <i className="fa fa-trash reg-icon" aria-hidden="true"></i>
            </button>
            
        </span>
    );
}