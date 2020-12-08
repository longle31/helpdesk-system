import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllDevices, selectDeviceById } from '../devices/devicesSlice';
import { selectAllEmployees, selectEmployeeById } from '../employees/employeesSlice';
import { selectAllReports, selectReportById } from './reportsSlice';

export const AnalyzeReportForm = ({
    displayModal, onNext, setReport,
    currentReportId, setCurrentReportId, numberOfTasks, setNumberOfTasks }) => {

    const employees = useSelector(selectAllEmployees);
    const devices = useSelector(selectAllDevices);
    const reports = useSelector(selectAllReports);
    
    const currentReport = useSelector(state =>!selectReportById(state, currentReportId)?reports[0]:selectReportById(state, currentReportId));
    
    const currentEmployee = useSelector(state => selectEmployeeById(state, currentReport.employee));
    const currentDevice = useSelector(state => selectDeviceById(state, currentReport.device));

    const [reportData, setReportData] = useState({ ...currentReport, severity: 3 });// report



    const reportersOption = employees.filter(
        reporter => reporter.position !== 'technician'
            && reports.find(report => report.employee === reporter._id));

    const renderedReporters = reportersOption.map(rep =>
        <option value={rep._id} key={rep._id}>{rep.name}</option>

    );

    const devicesOption = devices.filter(device =>
        device.employee === currentReport.employee
    );

    const renderedDevices = devicesOption.map(device =>
        <option value={device._id} key={device._id}>{device.deviceName}</option>
    );


    const reportsOption = reports.filter(report =>
        report.employee === currentEmployee._id
        && report.device === currentDevice._id

    );

    const renderedReports = reportsOption.map(report =>
        <option value={report._id} key={report._id}>{report.title}</option>);

    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === "currentEmployee") {
            const report = reports.find(report => report.employee === value);
            setCurrentReportId(report ? report._id : currentReportId);
        }
        if (name === 'currentDevice') {
            const report = reports.find(report => report.device === value);
            setCurrentReportId(report ? report._id : currentReportId);
        }

        if (name === 'title') {
            const report = reports.find(report => report._id === value);
            setCurrentReportId(report ? report._id : currentReportId);
        }
    }
    const onNextForm = () => {
        setReport(reportData);
        onNext();
    }
    return (
        <div>
            <div className="modal-body">
                <div className='input-group flex-nowrap mb-2'>
                    <div className="input-group-prepend">
                        <span className="input-group-text">Employee Name</span>
                    </div>

                    <select name="currentEmployee" id="input"
                        className="form-control" required="required"
                        value={currentEmployee._id}
                        onChange={e => onChange(e)}
                    >
                        {renderedReporters}
                    </select>

                    <div className="input-group-append ">

                    </div>
                </div>
                <div className='input-group flex-nowrap mb-2'>
                    <div className="input-group-prepend">
                        <span className="input-group-text">Device</span>
                    </div>


                    <select name="currentDevice" id="input"
                        className="form-control" required="required"
                        value={currentDevice._id}
                        onChange={e => onChange(e)}
                    >
                        {renderedDevices}
                    </select>

                    <div className="input-group-append ">

                    </div>
                </div>
                <div className='input-group flex-nowrap mb-2'>
                    <div className="input-group-prepend">
                        <span className="input-group-text">title</span>
                    </div>

                    <select name="title" id="input" className="form-control" required="required"
                        value={currentReportId}
                        onChange={e => onChange(e)}
                    >
                        {renderedReports}
                    </select>

                    <div className="input-group-append ">
                    </div>
                </div>
                <div className='input-group flex-nowrap mb-2'>
                    <div className="input-group-prepend">
                        <span className="input-group-text">Report Date</span>
                    </div>

                    <input type="text" name="reportDate" id="reportDate" className="form-control"
                        value={currentReport.reportDate === undefined ? '' : currentReport.reportDate.toString()}
                        readOnly="readOnly"
                    />

                </div>

                <div className='input-group flex-nowrap mb-2'>
                    <div className="input-group-prepend">
                        <span className="input-group-text">detail</span>
                    </div>
                    <textarea type="text" name="detail" id="detail" className="form-control"
                        rows='4'
                        value={currentReport.detail}
                        readOnly="readOnly"
                    />
                    <div className="input-group-append ">
                    </div>
                </div>

                <div className='input-group flex-nowrap mb-2'>
                    <div className="input-group-prepend">
                        <span className="input-group-text">Severity</span>
                    </div>

                    <select name="severity" className="form-control" required="required"
                        value={reportData.severity}
                        onChange={e => setReportData({ ...reportData, severity: e.target.value })}
                    >
                        <option value={1}>Emergency</option>
                        <option value={2}>Serious</option>
                        <option value={3}>not Serious</option>
                    </select>

                    <div className="input-group-append ">
                    </div>
                </div>

                <div className='input-group flex-nowrap mb-2'>
                    <div className="input-group-prepend">
                        <span className="input-group-text">Numof Tasks</span>
                    </div>


                    <input type="number" name="numberOfTask"
                        className="form-control" value={numberOfTasks}
                        onChange={(e) => setNumberOfTasks(e.target.value)}
                        min={1} max={10} step={1} required="required" title=""
                    />


                    <div className="input-group-append ">
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
                    onClick={onNextForm}
                >

                    Next &nbsp; <i className="fa fa-chevron-right" aria-hidden="true"></i>
                </button>

            </div>
        </div>
    );
}