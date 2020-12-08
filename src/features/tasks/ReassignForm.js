
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllEmployees, selectEmployeeById } from '../employees/employeesSlice';
import { selectAllReports } from '../reports/reportsSlice';
import { fetchTasks, selectAllTasks, selectTaskById, updateTask } from './tasksSlice';


export const ReassignForm = ({ currentTaskId, taskModal, setTaskModal }) => {

    const dispatch = useDispatch();
    const employees = useSelector(selectAllEmployees);
    const techniciansOption = employees.filter(tech => tech.position === 'technician');

    const [techniqueOption, setTechniqueOption] = useState('all');

    const [technicians, setTechnicians] = useState(techniciansOption);
    const currentTask = useSelector(state => selectTaskById(state, currentTaskId));
    const [currentTechnician, setCurrentTechncian] = useState(technicians[1]);

    

    const [validation, setValidation] = useState(false);
    const [loadingStatus, setLoadingStatus] = useState(false);

    const renderedTechnicians = technicians.map(tech =>
        <option value={tech.name} key={tech._id}>{tech.name}</option>);


    const [assignStep, setAssignStep] = useState(0);


    useEffect(() => {
        if (currentTask.taskName === '') setValidation(false);
        else setValidation(true);

    }, [currentTask])

    useEffect(() => {

        if (techniqueOption === 'all') {
            setTechnicians(techniciansOption);
        }
        else if (techniqueOption === 'hardware') {
            setTechnicians(techniciansOption.filter(tech => tech.technique === 'hardware'));
        }
        else if (techniqueOption === 'software') {
            setTechnicians(techniciansOption.filter(tech => tech.technique === 'software'));
        }
        else if (techniqueOption === 'network') {
            setTechnicians(techniciansOption.filter(tech => tech.technique === 'network'));
        }
    }, [techniqueOption]);


    const onAssign = () => {
        setLoadingStatus(true);
        dispatch(updateTask({...currentTask, technician: currentTechnician._id, status: 0}))
        .then(()=>{setLoadingStatus(false)})
        .catch(err =>{setLoadingStatus(false); alert(err)});
    }





    const onSetCurrentTechnician = (value) => {
        setCurrentTechncian(techniciansOption.find(tech => tech.name === value));

    }

    return (
        <div>
            <div className="modal-body">
                <div className='input-group flex-nowrap mb-2'>
                    <div className="input-group-prepend">
                        <span className="input-group-text">Technician</span>
                    </div>

                    <select name="technician" id="input" className="form-control" required="required"
                        value={currentTechnician.name}

                        onChange={e => {
                            onSetCurrentTechnician(e.target.value);
                        }}
                    >
                        {renderedTechnicians}
                    </select>
                </div>
                <div className="input-group flex-nowrap mb-2">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Technique</span>
                    </div>
                    <select className="form-control" name="technique" id="position"
                        value={techniqueOption}
                        onChange={(e) => {
                            if (e.target.value !== techniqueOption)
                                setTechniqueOption(e.target.value)
                        }}
                    >
                        <option value="all">All</option>
                        <option value="hardware">Hardware</option>
                        <option value="software">Software</option>
                        <option value="network">Network</option>


                    </select>
                </div>
                <div className="input-group flex=nowrap mb-2">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Task Name</span>
                    </div>

                    <input value={currentTask.taskName} type="text" readOnly="readOnly"
                        className="form-control"
                    />


                </div>
                <div className="input-group flex=nowrap mb-2">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Detail</span>
                    </div>

                    <textarea type="text" name="taskDetail" id="input"
                        className="form-control" required="required"
                        rows={4}
                        value={currentTask.detail}
                        readOnly='ReadOnly'
                    />


                </div>

            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal"
                    onClick={() => setTaskModal({ ...taskModal, isDisplay: false })}
                >
                    Close
                 </button>
                &nbsp;

                <button type="button"
                    className="btn btn-primary"
                    data-dismiss="modal"
                    onClick={onAssign}
                    disabled={!validation}
                >

                    &nbsp;
                    Assgin
                    &nbsp;
                   {
                        loadingStatus ? <i className="fa fa-circle-o-notch fa-spin"></i>
                        : <i className="fa fa-check-square-o" aria-hidden="true"></i>
                    }

                </button>
            </div>
        </div>

    );
}