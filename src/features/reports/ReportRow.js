import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectDeviceById } from '../devices/devicesSlice';
import { selectEmployeeById } from '../employees/employeesSlice';
import { selectReportById } from './reportsSlice';


export const ReportRow = ({ report, setCurrentReport }) => {

   
    const employeeName = useSelector(state =>
        selectEmployeeById(state, report.employee) ? selectEmployeeById(state, report.employee) : { name: '' }).name;
    const deviceName = useSelector(state =>
        selectDeviceById(state, report.device) ? selectDeviceById(state, report.device) : { deviceName: '' }).deviceName;

    const onClickOver = (e) => {
        e.preventDefault();
        setCurrentReport(report._id);
    }

    const ReportStatus = (status) => {
        if (status === 0) { return <span className="badge badge-pill badge-danger">New</span>; }
        if (status === 1) { return <span className="badge badge-pill badge-primary">Solving</span>; }
        if (status === 2) { return <span className="badge badge-pill badge-success">Solved</span>; }

    }
    return (
        <tr onContextMenu={e => onClickOver(e)}>
            <td>{employeeName}</td>
            <td>{deviceName}</td>
            <td>{report.title}</td>
            <td>{report.reportDate ? report.reportDate.toString() : ''}</td>
            <td>{ReportStatus(report.status)}</td>
        </tr>
    );
}