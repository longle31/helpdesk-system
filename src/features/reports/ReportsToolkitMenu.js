import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkReportStatus, deleteReport, fetchReports, modalDisplayUpdapted, toolbarDisplayUpdated } from './reportsSlice';
export const ReportsToolkitMenu = ({displayToolbar, displayModal,currentReportId, toolbar}) => {

    const dispatch = useDispatch();
    const { top, left, isDisplay } = toolbar;

    const onAddNewReport = () => {
        displayToolbar(false);
        displayModal(true, 0);
    }
    
    const onDeleteReport = () =>{
        checkReportStatus(currentReportId)
        .then(status =>{
            
            if(status === 0){
                dispatch(deleteReport(currentReportId));
                
            }
            else {
                alert('cannot delete Report');
            }
        })
        .catch(error => alert(error));
        displayToolbar(false);
        
    }
    return (
        <span className="menu-toolbar" style={{ top: top, left: left, display:'block' }}>
            <button type="button" className="btn btn-primary"
                onClick={onAddNewReport}
            >
                <i className="fa fa-plus reg-icon" aria-hidden="true"></i>
            </button>
            &nbsp;
            
            <button type="button" class="btn btn-danger" onClick={onDeleteReport}>
                <i class="fa fa-trash reg-icon" aria-hidden="true"></i>    
            </button>
                       
        </span>
    );
}