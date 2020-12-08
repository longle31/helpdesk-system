import { current } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllEmployees, selectEmployeeById } from '../employees/employeesSlice';
import { selectAllTasks, selectTaskById, updateTask } from './tasksSlice';


export const EditTaskForm = ({ currentTaskId, taskModal, setTaskModal }) => {

    const currentTask = useSelector(state => selectTaskById(state, currentTaskId));

    const technician = useSelector(state => state.user.user);

    const dispatch = useDispatch();

    const [currentProgress, setCurrentProgress] = useState(currentTask.progress);
    const [validation, setValidation] = useState(false);
    const [solution, setSolution] = useState(currentTask.solution ? currentTask.solution : {

        solutionName: '',
        detail: '',
    });

    const [loadingStatus, setLoadingStatus] = useState(false);
    const [loadingDeniedStatus, setLoadingDeniedStatus] = useState(false);


    const solutionForm = (
        <div>
            <div className="input-group mb-2">
                <div className="input-group-prepand">
                    <span className="input-group-text">Solution Name</span>
                </div>

                <input type="text" className="form-control" name="technicianName"
                    id="technicianName" aria-describedby="helpId" placeholder=""
                    value={solution.solutionName}
                    onChange={e => setSolution({ ...solution, solutionName: e.target.value })}
                />

                <div className="input-group-append"></div>
            </div>



            <div className="form-group mb-2">
                <span>Solution Detail</span>


                <textarea type="text" className="form-control" name="technicianName"
                    id="technicianName" aria-describedby="helpId" placeholder=""

                    value={solution.detail}
                    onChange={e => setSolution({ ...solution, detail: e.target.value })}
                />
                <div className="input-group-append"></div>
            </div>
        </div>
    );

    useEffect(() => {
        setCurrentProgress(currentTask.progress);
    }, [currentTask])


    const onSave = () => {
        setLoadingStatus(true);
        dispatch(updateTask({
            ...currentTask, progress: currentProgress,
            solution, status: currentProgress > 99 ? 1 : 0,
        }))
            .then(() => {
                setLoadingStatus(false);

            })
            .catch(error => {
                setLoadingStatus(false);
                alert(error);
            });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const validate = () => {
        if (!currentTask.taskName) {
            return false;
        }
        if (!currentTask.technician) {
            return false;
        }
        if (currentProgress > 99) {
            if (!solution.solutionName) {
                return false;
            }
            if (!solution.detail) {
                return false
            }
        }

        return true;
    }

    useEffect(() => {
        setValidation(validate)
    }, [validate]);

    const onDeny = () => {
        setLoadingDeniedStatus(true);
        dispatch(updateTask({
            ...currentTask, progress: currentProgress,
            status: -1,
        }))
            .then(() => {
                setLoadingDeniedStatus(false);

            })
            .catch(error => {
                setLoadingDeniedStatus(false);
                alert(error);
            });
    }

    const denyButton = (
        <button type="button" className="btn btn-danger"
            onClick={onDeny}
        >{loadingDeniedStatus ? <i className="fa fa-circle-o-notch fa-spin"></i> : ''}&nbsp;Deny
        </button>
    );
    return (
        <div>
            <div className="modal-body">
                <div className="input-group mb-2">
                    <div className="input-group-prepand">
                        <span className="input-group-text">Technician Name</span>
                    </div>

                    <input type="text" className="form-control" name="technicianName"
                        id="technicianName" aria-describedby="helpId" placeholder=""
                        readOnly="readOnly"

                        value={technician.name}
                    />

                </div>

                <div className="input-group mb-2">
                    <div className="input-group-prepand">
                        <span className="input-group-text">Task Name</span>
                    </div>

                    <input type="text" className="form-control" name="taskName"
                        id="taskName" aria-describedby="helpId" placeholder=""
                        readOnly="readOnly"
                        value={currentTask.taskName}
                    />
                </div>
                <div className="form-group mb-2">
                    <span>Detail</span>


                    <textarea type="text" className="form-control" name="technicianName"
                        id="detail" aria-describedby="helpId" placeholder=""
                        readOnly ='readOnly'
                        value={currentTask.detail}

                    />
                    <div className="input-group-append"></div>
                </div>
                <div className="input-group mb-2">
                    <div className="input-group-prepand">
                        <span className="input-group-text">Task Status</span>
                    </div>


                    <span className="input-group-text">
                        {
                            currentTask.status === -1
                                ? <span className="badge badge-fill badge-danger">Denied</span>
                                : (
                                    currentTask.status === 0
                                        ? <span className="badge badge-fill badge-primary">Solving</span>
                                        : (
                                            currentTask.status === 1
                                                ? <span className="badge badge-fill badge-success">Finish</span>
                                                : ''
                                        )
                                )

                        }
                    </span>
                </div>
                <div className="input-group mb-2">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Progress</span>
                    </div>
                    <input type="number" name="" id="input"
                        style={{ width: '50px' }}
                        value={currentProgress} min={0} max={100} step={1} required="required" title=""
                        onChange={e => { if (e.target.value <= 100 && currentTask.status !== -1) setCurrentProgress(e.target.value) }}
                    />
                </div>

                <div className="progress mb-2">

                    <div className="progress-bar" role="progressbar"
                        aria-valuenow={currentProgress}
                        style={{ width: `${currentProgress}%` }}
                        aria-valuemin="0" aria-valuemax="100"
                    >
                        {currentProgress}%
                    </div>
                </div>

                {currentProgress > 99 ? solutionForm : ''}

            </div>

            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal"
                    onClick={() => { setTaskModal({ ...taskModal, isDisplay: false }) }}
                >
                    Close
                </button>
                {currentTask.status === 0 && currentProgress < 100 ? denyButton : ''}&nbsp;
                <button type="button" className="btn btn-primary"
                    onClick={onSave}
                    disabled={!validation || currentTask.status === -1}
                >{loadingStatus ? <i className="fa fa-circle-o-notch fa-spin"></i> : ''}&nbsp;Save</button>
            </div>
        </div>
    );
}