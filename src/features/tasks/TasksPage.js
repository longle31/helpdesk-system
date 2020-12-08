import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, selectAllTasks } from './tasksSlice';
import { TaskRow } from './TaskRow';
import { fetchEmployees, selectAllEmployees } from '../employees/employeesSlice';
import { fetchReports, selectAllReports } from '../reports/reportsSlice';
import { TaskModal } from './TaskModal';
import { TaskToolkitMenu } from './TaskToolkitMenu';
import { selectAllDevices } from '../devices/devicesSlice';
import { TasksFilters } from './TasksFilters';
import { TableHeading } from '../../unities/TableHeading';
export const TasksPage = () => {
    const dispatch = useDispatch();
    const reports = useSelector(selectAllReports);
    const employees = useSelector(selectAllEmployees);
    const tasks = useSelector(selectAllTasks);
    const taskStatus = useSelector(state => state.tasks.status);
    const reportStatus = useSelector(state => state.reports.status);
    const employeesStatus = useSelector(state => state.employees.status);
    const error = useSelector(state => state.tasks.error);
    const [currentTaskId, setCurrentTaskId] = useState('');
    const [content, setContent] = useState();
    const [isUpdate, setUpdate] = useState(false);

    const [tasksFilters, setTasksFilters] = useState({
        technicianNameFilter: '',
        reportTitleFilter: '',
        taskNameFilter: '',
        statusFilter: -2,
    })

    const [tasksSorter, setTasksSorter] = useState({
        technicianNameSorter: 0, // -1 decrease 1 increase
        reportTitleSorter: 0,
        taskNameSorter: 0,
        statusSorter: 0,
        progressSorter: 0,
    })


    const [taskModal, setTaskModal] = useState({
        isDisplay: false,
        taskModalOption: 0 // 1 : more detail, -1: delete
    });

    const [taskToolkit, setTaskToolkit] = useState({
        top: 0,
        left: 0,
        isDisplay: false,
    });

    let renderedTask;


    useEffect(() => {
        if (employeesStatus === 'idle') {
            dispatch(fetchEmployees());
        }
    }, [dispatch, employeesStatus]);

    useEffect(() => {
        if (reportStatus === 'idle') {
            dispatch(fetchReports());
        }
    }, [dispatch, reportStatus]);

    useEffect(() => {
        if (taskStatus === 'idle') {
            dispatch(fetchTasks());
        }
    }, [dispatch, taskStatus]);


    useEffect(() => {
        setUpdate(true);
    }, [tasks])



    if ((employeesStatus === 'succeeded' && reportStatus === 'succeeded' && taskStatus === 'succeeded')) {
        if (isUpdate) {
            setContent(tasks.map(task => {
                return {
                    ...task,
                    technicianName: employees.find(emp => emp._id === task.technician).name,
                    reportTitle: reports.find(report => report._id === task.report).title,
                }
            })
            );
            setUpdate(false);
        }

    } else if (employeesStatus === 'failed' || reportStatus === 'failed' || taskStatus === 'failed') {
        renderedTask = <tr>{error}</tr>
    } else if (employeesStatus === 'loading' || reportStatus === 'loading' || taskStatus === 'loading') {
        renderedTask = (
            <tr className="spinner-border text-primary" style={{ width: 100, height: 100 }}></tr>
        );
    }



    let tempRefTasks = Object.assign([], content);
    if (tempRefTasks && tempRefTasks.length > 0) {
        if (tasksFilters.technicianNameFilter) {
            tempRefTasks = tempRefTasks.filter(task => {
                return task.technicianName.toLowerCase().indexOf(tasksFilters.technicianNameFilter.toLocaleLowerCase()) !== -1;
            })
        }

        if (tasksFilters.reportTitleFilter) {
            tempRefTasks = tempRefTasks.filter(task => {
                return task.reportTitle.toLowerCase().indexOf(tasksFilters.reportTitleFilter.toLocaleLowerCase()) !== -1

            })
        }

        if (tasksFilters.taskNameFilter) {
            tempRefTasks = tempRefTasks.filter(task => {
                return task.taskName.toLowerCase().indexOf(tasksFilters.taskNameFilter.toLocaleLowerCase()) !== -1

            })
        }

        tempRefTasks = tempRefTasks.filter(task => {
            if (parseInt(tasksFilters.statusFilter) === -2) return task;
            return task.status === parseInt(tasksFilters.statusFilter);
        })


        if (tasksSorter.technicianNameSorter !== 0)
            tempRefTasks = tempRefTasks.sort((a, b) => {
                if(a.technicianName === b.technicianName) return 0;
                return a.technicianName > b.technicianName ? tasksSorter.technicianNameSorter : - tasksSorter.technicianNameSorter
            });

        if (tasksSorter.reportTitleSorter !== 0)
            tempRefTasks = tempRefTasks.sort((a, b) => {
                if(a.reportTitle === b.reportTitle) return 0;
                return a.reportTitle > b.reportTitle ? tasksSorter.reportTitleSorter : - tasksSorter.reportTitleSorter;
            });

        if (tasksSorter.taskNameSorter !== 0)
            tempRefTasks = tempRefTasks.sort((a, b) => {
                if(a.taskName === b.taskName) return 0;
                return a.taskName > b.taskName ? tasksSorter.taskNameSorter : - tasksSorter.taskNameSorter;
            });
        if (tasksSorter.statusSorter !== 0)
            tempRefTasks = tempRefTasks.sort((a, b) => {
                if(a.status === b.status) return 0;
                return a.status > b.status ? tasksSorter.statusSorter : -tasksSorter.statusSorter;
            });

        if (tasksSorter.progressSorter !== 0)
            tempRefTasks = tempRefTasks.sort((a, b) => {
                if(a.progress === b.progress) return 0;
                return a.progress > b.progress ? tasksSorter.progressSorter: -tasksSorter.progressSorter;
            });

        if (tempRefTasks)
            renderedTask = tempRefTasks.map(task => <TaskRow key={task._id}
                task={task}
                setCurrentTaskId={setCurrentTaskId}
            />)
    }


    const onMouseMoveTbody = (e) => {
        if (taskToolkit.isDisplay) {
            setTaskToolkit({ ...taskToolkit, isDisplay: false });

        }
    }
    const tbodyOnMouseLick = (e) => {
        e.preventDefault();
        setTaskToolkit({ left: e.clientX, top: e.clientY - 35, isDisplay: true });
    }
    const onUpdateFilter = (name, value) => {
        setTasksFilters({ ...tasksFilters, [name]: value });
    }

    const setSortOrder = (name, sortOrder) => {
        setTasksSorter({
            technicianNameSorter: 0, // -1 decrease 1 increase
            reportTitleSorter: 0,
            taskNameSorter: 0,
            statusSorter: 0,
            progressSorter: 0
            , [name]: sortOrder
        });
    }

    return (
        <div className={taskModal.isDisplay ? "modal-open container-fluid" : "container-fluid"}

        >
            {
                taskModal.isDisplay ? <TaskModal setTaskModal={setTaskModal}
                    taskModal={taskModal} currentTaskId={currentTaskId} />
                    : ''
            }

            {
                taskToolkit.isDisplay ? <TaskToolkitMenu taskToolkit={taskToolkit}
                    setTaskToolkit={setTaskToolkit} setTaskModal={setTaskModal} currentTaskId={currentTaskId} />
                    : ''
            }


            <h3 className="text-center">Tasks Management</h3>
            <div className="row justify-content-center">

                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-11">

                    <table className='table table-bordered table-hover' >
                        <thead className="thead-dark">
                            <tr>
                                <TableHeading
                                    title="Technician"
                                    sortName="technicianNameSorter"
                                    setSortOrder={setSortOrder}
                                    sortOrder={tasksSorter.technicianNameSorter}
                                />

                                <TableHeading
                                    title="Report"
                                    sortName="reportTitleSorter"
                                    setSortOrder={setSortOrder}
                                    sortOrder={tasksSorter.reportTitleSorter}
                                />

                                <TableHeading
                                    title="Task"
                                    sortName="taskNameSorter"
                                    setSortOrder={setSortOrder}
                                    sortOrder={tasksSorter.taskNameSorter}
                                />
                                <TableHeading
                                    title="Task Status"
                                    sortName="statusSorter"
                                    setSortOrder={setSortOrder}
                                    sortOrder={tasksSorter.statusSorter}
                                />

                                <TableHeading
                                    title="Task Progress"
                                    sortName="progressSorter"
                                    setSortOrder={setSortOrder}
                                    sortOrder={tasksSorter.progressSorter}
                                />
                            </tr>
                            <TasksFilters UpdateFilter={onUpdateFilter} tasksFilters={tasksFilters} />
                        </thead>
                        <tbody onMouseMove={e => onMouseMoveTbody(e)}
                            onContextMenu={e => tbodyOnMouseLick(e)}
                        >
                            {renderedTask}
                        </tbody>
                    </table>

                </div>

            </div>

        </div>
    );
}
