import React from 'react';
import { useSelector } from 'react-redux';
import { selectEmployeeById } from '../employees/employeesSlice';
import { selectReportById } from './reportsSlice';

export const CommitAndSaveForm = ({ displayModal, onSave, employeeId, reportId, tasks, loadingStatus }) => {

    const report = useSelector(state => selectReportById(state, reportId));
    
    const employeeName = useSelector(state => selectEmployeeById(state, employeeId)).name;

    const renderedTasks = tasks.map(task => {
        return (
            <tr key={task.taskName} className='d-flex'>
                <td className='col-6'>{task.technicianName}</td>
                <td className='col-6'>{task.taskName}</td>

            </tr>);
    }
    );


    return (
        <div>
            <div className="modal-body">

                <div className='input-group flex-nowrap mb-2'>
                    <div className="input-group-prepend">
                        <span className="input-group-text">Employee Name</span>
                    </div>

                    <input name="currentEmployee" id="input" className="form-control" required="required"
                        readOnly="readOnly"
                        value={employeeName}
                    >
                    </input>

                    <div className="input-group-append ">

                    </div>
                </div>

                <div className='input-group flex-nowrap mb-2'>
                    <div className="input-group-prepend">
                        <span className="input-group-text">Report Title</span>
                    </div>

                    <input name="currentEmployee" id="input" className="form-control" required="required"
                        readOnly="readOnly"
                        value={report.title}
                    >
                    </input>

                    <div className="input-group-append ">

                    </div>
                </div>

                <table className="table table-bordered table-hover" >
                    <thead>
                        <tr className='d-flex'>
                            <th className='col-6'>Technician</th>
                            <th className='col-6'>Task</th>
                        </tr>
                    </thead>
                    <tbody className="overflow-auto" style={{ height: 'auto' }}>
                        {renderedTasks}
                    </tbody>
                </table>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal"
                    onClick={() => displayModal(false, 0)}
                >
                    Close
              </button>
                  &nbsp;
                <button type="button" className="btn btn-primary" data-dismiss="modal"
                    onClick={onSave}
                >
                    {loadingStatus ? <i className="fa fa-circle-o-notch fa-spin"></i> : ""}&nbsp;Save
                </button>

            </div>
        </div>
    );
}