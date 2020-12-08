import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllEmployees } from '../employees/employeesSlice';
import './reportsStyle.css';

export const AssignTechnicianForm = ({ displayModal, onPrevious,setTasks ,onNext, numberOfTasks, currentReportId }) => {

    const employees = useSelector(selectAllEmployees);
    const techniciansOption = employees.filter(tech => tech.position === 'technician');

    const [techniqueOption, setTechniqueOption] = useState('all');
    const [technicians, setTechnicians] = useState(techniciansOption);

    const [currentTechnician, setCurrentTechncian] = useState(technicians[0]);
    const [currentTask, setCurrentTask] = useState(
        {
            report: currentReportId,
            taskName: '',
            detail: '',
        }
    );
  
    const [assignedTasks, setAssignedTasks] = useState([]);
    const [validation, setValidation] = useState(false);

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
        else {
            const option =  techniciansOption.filter(tech => tech.technique === techniqueOption);
            if(option && option.length > 0){
                
                setTechnicians(option);
            }else{
                setTechniqueOption('all');
            }
        }
    
    }, [techniqueOption]);

    useEffect(()=>{
        setCurrentTechncian(technicians[0]);
    },[technicians])

    const onAssign = () => {
        if (assignStep < numberOfTasks) {

            setAssignedTasks([...assignedTasks, 
                {
                ...currentTask,
                technicianId: currentTechnician._id, technicianName: currentTechnician.name,
                }
            ]
            );
            setAssignStep(assignStep + 1);
        }
    }

    const onReduce = (value) => {
        if (assignStep > 0) {
            setAssignedTasks(assignedTasks.filter(e => e.taskName !== value));

            setAssignStep(assignStep - 1);
        }
    }

    const nextForm = () =>{
        setTasks(assignedTasks);
        onNext();
    } 

    const renderedTasks = assignedTasks.map(task => {
        return (
            <tr key={task.taskName} className='d-flex'>
                <td className='col-6'>{task.technicianName}</td>
                <td className='col-5'>{task.taskName}</td>
                <td className='col-1' id="remove-task-icon">
                    <i className="fa fa-times-circle-o"  aria-hidden="true"
                        onClick={() => onReduce(task.taskName)}
                    ></i>
                </td>
            </tr>);
    }
    );

    const onSetCurrentTechnician = (value) => {
        setCurrentTechncian(techniciansOption.find(tech => tech.name === value));
        // setTechniqueOption(currentTechnician.technique);
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

                    <input type="text" name="taskName" id="input" className="form-control" required="required"
                        value={currentTask.taskName}
                        onChange={e => setCurrentTask({ ...currentTask, taskName: e.target.value })}
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
                        onChange={e => setCurrentTask({ ...currentTask, detail: e.target.value })}
                    />


                </div>
                {assignStep === 0 ? '' :
                    <table className="table table-bordered table-hover assign-table">
                        <thead>
                            <tr className='d-flex'>
                                <th className='col-6'>Technician</th>
                                <th className='col-5'>Task</th>
                                <th className='col-1'></th>

                            </tr>
                        </thead>
                        <tbody className="overflow-auto">
                            {renderedTasks}
                        </tbody>
                    </table>
                }
                <div className="progress">
                    <div className="progress-bar" role="progressbar"
                        style={{ width: `${parseFloat(assignStep / numberOfTasks) * 100}%` }}
                        aria-valuenow={parseFloat(assignStep / numberOfTasks) * 100} aria-valuemin="0" aria-valuemax="100">

                    </div>
                </div>


            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal"
                    onClick={() => displayModal(false, 0)}
                >
                    Close
                    </button>
                        &nbsp;
                     <button type="button" className="btn btn-primary" data-dismiss="modal"
                    onClick={onPrevious}
                >

                    <i className="fa fa-chevron-left" aria-hidden="true"></i> &nbsp; Previous
                    </button>
                <button type="button" 
                    className={assignStep < numberOfTasks ? "btn btn-warning" : "btn btn-primary"} 
                    data-dismiss="modal"
                    onClick={assignStep < numberOfTasks ? onAssign : nextForm}
                    disabled={!validation}
                >
                    {assignStep < numberOfTasks ? 'Assign' : 'Next'}
                    &nbsp;
                    {assignStep < numberOfTasks ? <i className="fa fa-check-square-o" aria-hidden="true"></i>
                        : <i className="fa fa-chevron-right" aria-hidden="true"></i>}

                </button>
            </div>
        </div>

    );
}