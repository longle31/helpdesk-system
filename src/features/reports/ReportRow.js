import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectDeviceById } from '../devices/devicesSlice';

import { selectReportById } from './reportsSlice';


export const ReportRow = ({report, setCurrentReport}) => {

    const onClickOver = (e) => {
        setCurrentReport(report._id);
    }
    const ReportStatus = (status) =>{
        if(status === 0)
        {return <span className="badge badge-pill badge-danger">New</span>;}
        if(status === 1)
       { return <span className="badge badge-pill badge-primary">Solving</span>;}
        if(status === 2)
       { return <span className="badge badge-pill badge-success">Solved</span>;}
        
    }
    return (
        <tr onContextMenu={e => onClickOver(e)}>
            <td>{report.deviceName}</td>
            <td>{report.title}</td>
            <td>{report.reportDate?report.reportDate.toString():''}</td>
            <td>{ReportStatus(report.status)}</td>
        </tr>
    );
}