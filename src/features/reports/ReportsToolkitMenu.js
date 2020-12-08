import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkReportStatus, deleteReport} from './reportsSlice';
export const ReportsToolkitMenu = ({displayToolbar, displayModal,currentReportId, toolbar}) => {

    const dispatch = useDispatch();
    const { top, left, isDisplay } = toolbar;

    
    const onEditReport = () => {
        displayToolbar(false);
        displayModal(true, 1);
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
        <span className="menu-toolbar" style={{ top: top, left: left, display: isDisplay ? 'block' : 'none' }}>
            
            {currentReportId?<button type="button" className="btn btn-success"
                onClick={onEditReport}
            >
                <i className="fa fa-pencil-square-o reg-icon" aria-hidden="true">
                </i>
            </button>:''}
            &nbsp;
            
            {currentReportId?<button type="button" className="btn btn-danger" onClick={onDeleteReport}>
                <i className="fa fa-trash reg-icon" aria-hidden="true"></i>    
            </button>:''}
                       
        </span>
    );
}