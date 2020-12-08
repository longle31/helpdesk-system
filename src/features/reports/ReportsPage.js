import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReportModal } from './ReportModal';
import { ReportRow } from './ReportRow';
import { ReportsFilters } from './ReportsFilters';
import { ReportsToolkitMenu } from './ReportsToolkitMenu';
import { fetchReports, selectAllReports, selectReportIds } from './reportsSlice';
import { fetchDevices, selectAllDevices } from '../devices/devicesSlice';
import { fetchEmployees, selectAllEmployees } from '../employees/employeesSlice';
import { TableHeading } from '../../unities/TableHeading';

export const ReportsPage = () => {

    const reportStatus = useSelector(state => state.reports.status);
    const deviceStatus = useSelector(state => state.devices.status);
    const employeeStatus = useSelector(state => state.employees.status);
    const employees = useSelector(selectAllEmployees);
    const devices = useSelector(selectAllDevices);
    const error = useSelector(state => state.reports.error);
    const dispatch = useDispatch();
    const [content, setContent] = useState();
    const [isUpdate, setUpdate] = useState(false);
    let renderedReports;
    useEffect(() => {
        if (deviceStatus === 'idle') {
            dispatch(fetchDevices());
        }
    }, [deviceStatus, dispatch]);

    useEffect(() => {
        if (employeeStatus === 'idle') {

            dispatch(fetchEmployees());
        }
    }, [dispatch, employeeStatus])
    useEffect(() => {

        if (reportStatus === 'idle') {

            dispatch(fetchReports());
        }

    }, [dispatch, reportStatus]);

    const reports = useSelector(selectAllReports);

    const [filters, setFilters] = useState({
        employeeNameFilter: '',
        deviceNameFilter: '',
        reportTitleFilter: '',
        reportDateFilter: '',
        reportStatusFilter: -1,
    });

    const [reportsSorters, setReportsSorters] = useState({
        employeeNameSorter: 0,
        deviceNameSorter: 0,
        reportTitleSorter: 0,
        reportDateSorter: 0,
        reportStatusSorter: 0,

    });

    const setSortOrder = (name, value) => {
        setReportsSorters({
            employeeNameSorter: 0,
            deviceNameSorter: 0,
            reportTitleSorter: 0,
            reportDateSorter: 0,
            reportStatusSorter: 0,
            [name]: value
        });
        console.log(reportsSorters);
    }
    const [toolbar, setToolbar] = useState({
        top: 0,
        left: 0,
        isDisplay: false,
        toolbarOption: 0,/// 0 : add new Report, 1 : analyze, 2: delete,
    });
    const [reportModal, setReportModal] = useState({
        isModalDisplayed: false,
        modalOption: 1, /// 0 : add new Report, 1 : analyze, 2: delete,
        currentReportId: '',
    });

    useEffect(() => {
        setUpdate(true);
    }, [reports])



    if (employeeStatus === 'succeeded' && deviceStatus === 'succeeded' && reportStatus === 'succeeded') {
        if (isUpdate) {
            setContent(reports.map(report => ({
                ...report,
                employeeName: employees.find(emp => emp._id === report.employee).name,
                deviceName: devices.find(device => device._id === report.device).deviceName,
            })));
            setUpdate(false);
        }

    } else if (employeeStatus === 'failed' || deviceStatus === 'failed' || reportStatus === 'failed') {
        renderedReports = <div>{error}</div>
    } else if (employeeStatus === 'loading' || deviceStatus === 'loading' || reportStatus === 'loading') {
        renderedReports = <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    }

    var tempReports = Object.assign([], content);


    if (tempReports.length > 0) {
        if (filters.employeeNameFilter) {
            tempReports = tempReports.filter((report) => {
                return report.employeeName.toLowerCase().indexOf(filters.employeeNameFilter.toLowerCase()) !== -1;
            });
        }

        if (filters.deviceNameFilter) {
            tempReports = tempReports.filter((report) => {
                return report.deviceName.toLowerCase().indexOf(filters.deviceNameFilter.toLowerCase()) !== -1;
            });
        }
        if (filters.reportTitleFilter) {
            tempReports = tempReports.filter((report) => {
                return report.title.toLowerCase().indexOf(filters.reportTitleFilter.toLowerCase()) !== -1;
            });
        }

        if (filters.reportDateFilter) {
            tempReports = tempReports.filter((report) => {
                return report.reportDate.toString().indexOf(filters.reportDateFilter.toLowerCase()) !== -1;
            });
        }
        if (parseInt(filters.reportStatusFilter) !== -1)
            tempReports = tempReports.filter((report) => {

                return report.status === parseInt(filters.reportStatusFilter);
            });

        if (reportsSorters.employeeNameSorter !== 0)
            tempReports = tempReports.sort((a, b) => {
                if (a.employeeName === b.employeeName) return 0;
                return a.employeeName > b.employeeName ? reportsSorters.employeeNameSorter : - reportsSorters.employeeNameSorter;
            });

        if (reportsSorters.deviceNameSorter !== 0)
            tempReports = tempReports.sort((a, b) => {
                if (a.deviceName === b.deviceName) return 0;
                return a.deviceName > b.deviceName ? reportsSorters.deviceNameSorter : - reportsSorters.deviceNameSorter;
            });

        if (reportsSorters.reportTitleSorter !== 0)
            tempReports = tempReports.sort((a, b) => {
                if (a.title === b.title) return 0;
                return a.title > b.title ? reportsSorters.reportTitleSorter : - reportsSorters.reportTitleSorter
            });

        if (reportsSorters.reportDateSorter !== 0)
            tempReports = tempReports.sort((a, b) => {
                if (a.reportDate.localeCompare(b.reportDate) === 0) return 0;
                return a.reportDate.localeCompare(b.reportDate) > 0 ? reportsSorters.reportDateSorter : - reportsSorters.reportDateSorter
            });

        if (reportsSorters.reportStatusSorter !== 0)
            tempReports = tempReports.sort((a, b) => {
                if (a.status === b.status) return 0;
                return a.status > b.status ? reportsSorters.reportStatusSorter : -reportsSorters.reportStatusSorter;
            });



    }


    const onUpdateReportFilters = (name, value) => {
        setFilters({
            ...filters,
            [name]: value
        });
    }
    const onMouseMoveTbody = (e) => {
        if (toolbar.isDisplay === true) {

            setToolbar({ ...toolbar, isDisplay: false });
        }
    }
    const tbodyOnMouseLick = (e) => {
        e.preventDefault();
        setToolbar({ ...toolbar, isDisplay: true, top: e.clientY - 35, left: e.clientX });
    }

    const onSetCurrentReport = (reportId) => {
        setReportModal({ ...reportModal, currentReportId: reportId });
    }

    const onDisplayToolbar = (isDisplay) => {
        setToolbar({ ...toolbar, isDisplay: isDisplay });
    }
    const onDisplayModal = (isModalDisplayed, modalOption) => {

        setReportModal({
            ...reportModal,
            isModalDisplayed: isModalDisplayed,
            modalOption: modalOption, /// 0 : add new Report, 1 : analyze, 2: delete,

        });
    }

    if (tempReports.length > 0)
        renderedReports = tempReports.map(report =>
            <ReportRow
                report={report}
                key={report._id}
                setCurrentReport={onSetCurrentReport}
            />

        );

    return (
        <div className={reportModal.isModalDisplayed ? "modal-open container-fluid" : "container-fluid"}
        >
            {
                toolbar.isDisplay ?
                    <ReportsToolkitMenu
                        toolbar={toolbar}
                        displayToolbar={onDisplayToolbar} displayModal={onDisplayModal}
                        currentReportId={reportModal.currentReportId}
                    />
                    : ''
            }
            {
                reportModal.isModalDisplayed ?
                    <ReportModal
                        currentReportId={reportModal.currentReportId}
                        displayModal={onDisplayModal}
                        modalOption={reportModal.modalOption}
                        setCurrentReportId={onSetCurrentReport}
                    />
                    : ''
            }
            <h3 className="text-center">Report Management</h3>
            <div className="row justify-content-center">

                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-11">

                    <table className='table table-bordered table-hover' >
                        <thead className="thead-dark">
                            <tr>
                                <TableHeading title="Employee Name"
                                    sortName="employeeNameSorter" sortOrder={reportsSorters.employeeNameSorter}
                                    setSortOrder={setSortOrder}
                                />
                                <TableHeading title="Device Name"
                                    sortName="deviceNameSorter" sortOrder={reportsSorters.deviceNameSorter}
                                    setSortOrder={setSortOrder}
                                />
                                <TableHeading title="Title"
                                    sortName="reportTitleSorter" sortOrder={reportsSorters.reportTitleSorter}
                                    setSortOrder={setSortOrder}
                                />
                                <TableHeading title="Report Date"
                                    sortName="reportDateSorter" sortOrder={reportsSorters.reportDateSorter}
                                    setSortOrder={setSortOrder}
                                />
                                <TableHeading title="Report Date"
                                    sortName="reportStatusSorter" sortOrder={reportsSorters.reportStatusSorter}
                                    setSortOrder={setSortOrder}
                                />
                            </tr>

                            <ReportsFilters updateReportFilters={onUpdateReportFilters} filters={filters} />
                        </thead>
                        <tbody onMouseMove={e => onMouseMoveTbody(e)}
                            onContextMenu={e => tbodyOnMouseLick(e)}
                        >
                            {renderedReports}
                        </tbody>
                    </table>

                </div>

            </div>

        </div>
    );
}
