import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, fetchTasksByTechnicianId, selectAllTaskIds, selectAllTasks } from './tasksSlice';
import { TaskRow } from './TaskRow';
import { fetchReportById, fetchReports, selectAllReports } from '../reports/reportsSlice';
import { TaskModal } from './TaskModal';
import { TaskToolkitMenu } from './TaskToolkitMenu';
import { fetchUser } from '../user/userSlice';
import { fetchDevices, selectAllDevices } from '../devices/devicesSlice';
import { TasksFilters } from './TasksFilters';
import { TableHeading } from '../../entities/TableHeading';
const cookie = document.cookie.split(';').map(cookie => cookie.split('='))
    .reduce((accumulator, [key, value]) => ({...accumulator, [key.trim()]: decodeURIComponent(value)}),{})
export const TasksPage = () => {
    const dispatch = useDispatch();
    const tasks = useSelector(selectAllTasks);
    const devices = useSelector(selectAllDevices);
    const reports = useSelector(selectAllReports);

    const userStatus = useSelector(state => state.user.status)
    const tasksStatus = useSelector(state => state.tasks.status);
    const reportStatus = useSelector(state => state.reports.status);
    const deviceStatus = useSelector(state => state.devices.status);
    const error = useSelector(state => state.tasks.error);
    const [currentTaskId, setCurrentTaskId] = useState('');

    const [filters, setFilters] = useState({
        reportTitleFilter: '',
        deviceNameFilter: '',
        taskNameFilter: '',
        tasksStatusFilter: -2,
    });
    const [sorters, setSorters] = useState({
        reportTitleSorter: 0,
        deviceNameSorter: 0,
        taskNameSorter: 0,
        taskStatusSorter: 0,
        taskProgressSorter: 0,
    });
    const setSortOrder = (name, value) => {
        setSorters({
            reportTitleSorter: 0,
            deviceNameSorter: 0,
            taskNameSorter: 0,
            taskStatusSorter: 0,
            taskProgressSorter: 0,
            [name]: value,
        });
    }
    let renderedTasks;
    useEffect(() => {

        if (userStatus === 'idle') {
            dispatch(fetchUser(cookie.loadingToken));
        }
    }, [userStatus]);

    useEffect(() => {
        if (deviceStatus === 'idle') {
            dispatch(fetchDevices())
        }
    }, [deviceStatus]);

    useEffect(() => {
        if (reportStatus === 'idle') {
            dispatch(fetchReports());
        }
    }, [reportStatus]);

    useEffect(() => {
        if (tasksStatus === 'idle') {
 
            dispatch(fetchTasksByTechnicianId(cookie.loadingToken));
        }
    }, [tasksStatus]);
    const [isUpdate, setUpdate] = useState(false);
    const [content, setContent] = useState();

    useEffect(() => {
        setUpdate(true);
    }, [tasks]);

    if (tasksStatus === 'loading' || reportStatus === 'loading' || userStatus === 'loading') {
        renderedTasks = (
            <tr className="spinner-border text-primary" style={{ width: 100, height: 100 }}></tr>
        );
    } else if (tasksStatus === 'failed' || reportStatus === 'failed' || userStatus === 'failed') {
        renderedTasks = <tr>{error}</tr>
    } else if (tasksStatus === "succeeded" && reportStatus === 'succeeded' && userStatus === 'succeeded') {
        if (isUpdate) {
            setContent(tasks.map(task => ({
                ...task,
                reportTitle: reports.find(report => report._id === task.report).title,
                deviceName:
                    devices.find(device => device._id === reports.find(report => report._id === task.report).device).deviceName
            })));
            setUpdate(false);
        }
    }
    let tempTask = Object.assign([], content);

    if (filters.reportTitleFilter) {
        tempTask = tempTask.filter(task => task.reportTitle.toLowerCase().indexOf(filters.reportTitleFilter.toLowerCase()) !== -1);
    }

    if (filters.deviceNameFilter) {
        tempTask = tempTask.filter(task => task.deviceName.toLowerCase().indexOf(filters.deviceNameFilter.toLowerCase()) !== -1);
    }

    if (filters.taskTitleFilter) {
        tempTask = tempTask.filter(task => task.taskName.toLowerCase().indexOf(filters.taskTitleFilter.toLowerCase()) !== -1);
    }

    if (parseInt(filters.tasksStatusFilter) !== -2) {
        tempTask = tempTask.filter(task => task.status === parseInt(filters.tasksStatusFilter));
    }

    if(sorters.deviceNameSorter !== 0){
        tempTask = tempTask.sort((a, b) => {
            if(a.deviceName === b.deviceName) return 0;
            return a.deviceName > b.deviceName ? sorters.deviceNameSorter: -sorters.deviceNameSorter;
        });
    }
    if(sorters.reportTitleSorter !== 0){
        tempTask = tempTask.sort((a, b) => {
            if(a.reportTitle === b.reportTitle) return 0;
            return a.reportTitle > b.reportTitle ? sorters.reportTitleSorter: -sorters.reportTitleSorter;
        });
    }
    if(sorters.taskNameSorter !== 0){
        tempTask = tempTask.sort((a, b) => {
            if(a.taskName === b.taskName) return 0;
            return a.taskName > b.taskName ? sorters.taskNameSorter: -sorters.taskNameSorter;
        });
    }
    if(sorters.taskStatusSorter !== 0){
        tempTask = tempTask.sort((a, b) => {
            if(a.status === b.status) return 0;
            return a.status > b.status ? sorters.taskStatusSorter: -sorters.taskStatusSorter;
        });
    }

    if(sorters.taskProgressSorter !== 0){
        tempTask = tempTask.sort((a, b) => {
            if(a.progress === b.progress) return 0;
            return a.progress > b.progress ? sorters.taskProgressSorter: -sorters.taskProgressSorter;
        });
    }


    if (content)
        renderedTasks = tempTask.map(task =>
            <TaskRow key={task._id} setCurrentTaskId={setCurrentTaskId} task={task} />
        )

    const [taskModal, setTaskModal] = useState({
        isDisplay: false,
        currentTaskId: '',
        taskModalOption: 1 // 1 : more detail, -1: delete
    });

    const [taskToolkit, setTaskToolkit] = useState({
        top: 0,
        left: 0,
        isDisplay: false,
    });
    const onMouseMoveTbody = (e) => {
        if (taskToolkit.isDisplay) {
            setTaskToolkit({ ...taskToolkit, isDisplay: false });

        }
    }
    const tbodyOnMouseLick = (e) => {
        e.preventDefault();
        setTaskToolkit({ left: e.clientX, top: e.clientY - 35, isDisplay: true });
    }
    const onUpdateFilters = (name, value) => {
        setFilters({ ...filters, [name]: value })
    }

    return (
        <div className={taskModal.isDisplay ? "modal-open container-fluid" : "container-fluid"}

        >
            {taskModal.isDisplay ? <TaskModal setTaskModal={setTaskModal}
                taskModal={taskModal} currentTaskId={currentTaskId}

            /> : ''}
            {taskToolkit.isDisplay ? <TaskToolkitMenu taskToolkit={taskToolkit}
                setTaskToolkit={setTaskToolkit} setTaskModal={setTaskModal}
            /> : ''}
            <h3 className="text-center">Tasks Management</h3>
            <div className="row justify-content-center">

                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-11">

                    <table className='table table-bordered table-hover' >
                        <thead className="thead-dark">
                            <tr>
                                <TableHeading title='Report' sortName='reportTitleSorter'
                                    sortOrder={sorters.reportTitleSorter} setSortOrder={setSortOrder}
                                />
                                <TableHeading title='Device' sortName='deviceNameSorter'
                                    sortOrder={sorters.deviceNameSorter} setSortOrder={setSortOrder}
                                />
                                <TableHeading title='Task' sortName='taskNameSorter'
                                    sortOrder={sorters.taskNameSorter} setSortOrder={setSortOrder}
                                />
                                <TableHeading title='Task Status' sortName='taskStatusSorter'
                                    sortOrder={sorters.taskStatusSorter} setSortOrder={setSortOrder}
                                />
                                <TableHeading title='Task Progress' sortName='taskProgressSorter'
                                    sortOrder={sorters.taskProgressSorter} setSortOrder={setSortOrder}
                                />
                            
                            </tr>
                            <TasksFilters filters={filters} updateFilters={onUpdateFilters} />
                        </thead>
                        <tbody onMouseMove={e => onMouseMoveTbody(e)}
                            onContextMenu={e => tbodyOnMouseLick(e)}
                        >
                            {renderedTasks ? renderedTasks : ''}


                        </tbody>
                    </table>

                </div>

            </div>

        </div>
    );
}
