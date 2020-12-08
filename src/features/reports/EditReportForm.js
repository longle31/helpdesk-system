import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllEmployees, selectEmployeeById, selectEmployees } from '../employees/employeesSlice';
import { selectAllDevices, selectDeviceById } from '../devices/devicesSlice';
import { fetchReports, selectAllReports, selectReport, selectReportById, updateReport } from './reportsSlice';
import './reportsStyle.css';
import { AnalyzeReportForm } from './AnalyzeReportForm';
import { AssignTechnicianForm } from './AssignTechnicianForm';
import { CommitAndSaveForm } from './CommitAndSaveForm';
import { addNewTask, selectAllTasks } from '../tasks/tasksSlice';
export const EditReportForm = ({ currentReportId,setCurrentReportId, displayModal }) => {
    
    const [numberOfTasks, setNumberOfTasks] = useState(1);
    const [loadingStatus, setLoadingStatus] = useState(false);
    const [step, setStep] = useState(0);
    const [tasks, setTasks] = useState();
    const [report, setReport] = useState();
    const dispatch = useDispatch();

    const onNext = () => {
        if (step <= 2)
            setStep(step + 1);
    }

    const onPrevious = () => {
        if (step >= 1)
            setStep(step - 1)
    }
    const onSave = () => {

        setLoadingStatus(true);
        dispatch(updateReport({ ...report,_id:report._id, status: 1 }))
            .then(() => {
                tasks.forEach(task => {
                    dispatch(addNewTask({
                        report: task.report, taskName: task.taskName,
                        technician: task.technicianId, detail: task.detail, status: 0,
                        progress: 0
                    }));
                })
                setLoadingStatus(false);
                displayModal(false, 0);
                dispatch(fetchReports());
            })
            .catch(error => alert(error));

    }

    let reportBody;
    
    if (step === 0) {
        reportBody = (

            <AnalyzeReportForm
                displayModal={displayModal} onNext={onNext}
                onPrevious={onPrevious} setCurrentReportId={setCurrentReportId}
                setNumberOfTasks={setNumberOfTasks} numberOfTasks={numberOfTasks}
                currentReportId={currentReportId} setReport={setReport}
            />
        );
    } else if (step === 1) {
        reportBody = <AssignTechnicianForm
            numberOfTasks={numberOfTasks}
            displayModal={displayModal}
            onNext={onNext}
            onPrevious={onPrevious}
            setTasks={setTasks}
            currentReportId={currentReportId}
            tasks={tasks}

        />

    } else if (step === 2) {
        reportBody = <CommitAndSaveForm 
            employeeId={report.employee} reportId={report._id} tasks={tasks}
            displayModal={displayModal} onSave={onSave} loadingStatus={loadingStatus}

        />
    }


    return (
        <div>
            {reportBody}

        </div>
    );

}