import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReportModal } from './ReportModal';
import { ReportRow } from './ReportRow';
import { ReportsFilters } from './ReportsFilters';
import { ReportsToolkitMenu } from './ReportsToolkitMenu';
import { fetchReportsByEmployeeId, selectAllReports, selectReportIds } from './reportsSlice';
import { fetchDevices, getDevicesByEmployeeId, selectAllDevices } from '../devices/devicesSlice';
import { fetchUser } from '../user/userSlice';
import { TableHeading } from '../../unities/TableHeading';

const cookie = document.cookie.split(';')
.map(cookie => cookie.split('='))
.reduce((accumulator, [key, value])=>({...accumulator, [key.trim()]: decodeURIComponent(value)}),
{});


export const ReportsPage = () => {
    const devices = useSelector(selectAllDevices);
    const reports = useSelector(selectAllReports);
    const userStatus = useSelector(state => state.user.status);
    const devicesStatus = useSelector(state => state.devices.status);
    const reportStatus = useSelector(state => state.reports.status);
    const error = useSelector(state => state.reports.error);
    const dispatch = useDispatch();

    const [filters, setFilters] = useState({
        deviceNameFilter: '',
        reportTitleFilter: '',
        reportDateFilter: '',
        reportStatusFilter: -1,
    });

    const [sorters, setSorters] = useState({
        deviceNameSorter: 0,
        reportTitleSorter: 0,
        reportDateSorter: 0,
        reportStatusSorter: 0,
    });
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
    const [content, setContent] = useState();
    const [isUpdate, setUpdate] = useState(true);

    let renderedReports;

    useEffect(() => {
        if (userStatus === 'idle') {
            console.log(cookie.loadingToken);
            dispatch(fetchUser(cookie.loadingToken));
        }
    }, [userStatus])
    useEffect(() => {
        if (devicesStatus === 'idle')
            dispatch(getDevicesByEmployeeId(cookie.loadingToken));
    }, [devicesStatus]);

    useEffect(() => {

        if (reportStatus === 'idle') {
            dispatch(fetchReportsByEmployeeId(cookie.loadingToken));
        }

    }, [reportStatus]);

    useEffect(() => {
        setUpdate(true);
    }, [reports])



    if (userStatus === 'succeeded' && devicesStatus === 'succeeded' && reportStatus === 'succeeded') {
        if (isUpdate) {
            setContent(reports.map(report => ({
                ...report,
                deviceName: devices.find(device => device._id === report.device).deviceName,

            })));
            setUpdate(false);
        }
    } else if (userStatus === 'failed' || devicesStatus === 'failed' || reportStatus === 'failed') {
        renderedReports = <div>{error}</div>
    } else if (userStatus === 'loading' || devicesStatus === 'loading' || reportStatus === 'loading') {
        renderedReports = <div>Loading</div>
    }

    var tempReports = Object.assign([], content);

    // deviceNameFilter: '',
    // reportTitleFilter: '',
    // reportDateFilter: '',
    // reportStatusFilter: -1,

    if (filters.deviceNameFilter) {
        tempReports = tempReports.filter((report) => {
            return report.deviceName.toLowerCase().indexOf(filters.deviceNameFilter.toLowerCase()) !== -1;
        });
    }
    if (filters.reportTitleFilter) {
        tempReports = tempReports.filter(report =>
            (report.title.toLowerCase().indexOf(filters.reportTitleFilter.toLowerCase()) !== -1)
        );
    }
    if (filters.reportDateFilter) {
        tempReports = tempReports.filter((report) => {
            return report.reportDate.toLowerCase().indexOf(filters.reportDateFilter.toLowerCase()) !== -1;
        });
    }
    if (parseInt(filters.reportStatusFilter) !== -1)
        tempReports = tempReports.filter((report) =>
            report.status === parseInt(filters.reportStatusFilter)
        );

    if (sorters.deviceNameSorter !== 0) {
        tempReports = tempReports.sort((a, b) =>{
            if(a.deviceName === b.deviceName) return 0;
            return a.deviceName > b.deviceName ? sorters.deviceNameSorter : -sorters.deviceNameSorter
        })
    }

    if (sorters.reportTitleSorter !== 0) {
        tempReports = tempReports.sort((a, b) =>{
            if(a.title === b.title) return 0;
            return a.title > b.title ? sorters.reportTitleSorter : -sorters.reportTitleSorter});
    }

    if (sorters.reportDateSorter !== 0) {
        tempReports = tempReports.sort((a, b) => { 
            if(a.reportDate.localeCompare(b.reportDate) === 0) return 0;
            return a.reportDate.localeCompare(b.reportDate) > 0 ? sorters.reportDateSorter :-sorters.reportDateSorter ;
        });
    }

    if(sorters.reportStatusSorter !== 0){
        tempReports = tempReports.sort((a, b) => { 
            if(a.status === b.status) return 0;
            return a.status > b.status ? sorters.reportStatusSorter :-sorters.reportStatusSorter ;
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


    renderedReports = tempReports.map(report => {
        return (
            <ReportRow
                report={report}
                key={report._id}
                setCurrentReport={onSetCurrentReport}
            />
        );
    });
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
    const onSetSorter = (name, value) => setSorters({
        deviceNameSorter: 0,
        reportTitleSorter: 0,
        reportDateSorter: 0,
        reportStatusSorter: 0,
        [name]: value
    });

    useEffect(() => {
        console.log(sorters);
    })
    return (
        <div className={reportModal.isModalDisplayed ? "modal-open container-fluid" : "container-fluid"}
        >
            {toolbar.isDisplay ? <ReportsToolkitMenu toolbar={toolbar} displayToolbar={onDisplayToolbar}
                displayModal={onDisplayModal} currentReportId={reportModal.currentReportId} /> : ''}
            {reportModal.isModalDisplayed ? <ReportModal reportModal={reportModal} displayModal={onDisplayModal} /> : ""}
            <h3 className="text-center">Report Management</h3>
            <div className="row justify-content-center">

                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-11">

                    <table className='table table-bordered table-hover' >
                        <thead className="thead-dark">
                            <tr>
                                <TableHeading title='Device Name' sortName='deviceNameSorter'
                                    sortOrder={sorters.deviceNameSorter} setSortOrder={onSetSorter}
                                />
                                <TableHeading title='Title' sortName='reportTitleSorter'
                                    sortOrder={sorters.reportTitleSorter} setSortOrder={onSetSorter}
                                />

                                <TableHeading title='Report Date' sortName='reportDateSorter'
                                    sortOrder={sorters.reportDateSorter} setSortOrder={onSetSorter}
                                />
                                <TableHeading title='Report Status' sortName='reportStatusSorter'
                                    sortOrder={sorters.reportStatusSorter} setSortOrder={onSetSorter}
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
