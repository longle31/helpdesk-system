import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AddNewReportForm } from './AddNewReportForm';

export const ReportModal = ({reportModal, displayModal}) => {
    const { isModalDisplayed, modalOption } = reportModal;
   

    const onCloseModalCheckly = (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const modal = document.getElementById("taskModalContent");
        const modalBoundary = modal.getBoundingClientRect();
        if(mouseX === 0 || mouseY === 0);
        else
        if (mouseX < modalBoundary.left || mouseX > modalBoundary.right ||
            mouseY < modalBoundary.top || mouseY > modalBoundary.bottom) {
            
            displayModal(false, 0);
        }

    }
    const OptionnedContent = () =>{
        if(modalOption === 0) return <AddNewReportForm displayModal={displayModal}/>;
        return '';
    }

    
    return (
        <div className="modal fade show"
            style=
            {{
                display:  'block'
            }}
            id="taskModal"
            tabIndex="-1" role="dialog" aria-labelledby="taskModalTitle" aria-hidden="true"
            onClick={(e) => { onCloseModalCheckly(e) }}

        >
            <div className="modal-dialog" role="document">
                <div className="modal-content" id="taskModalContent">
                    <div className="modal-header">
                        <h5 className="modal-title" id="taskModalTitle">{modalOption===0?'Add New Report':'Analyze Report'}</h5>
                        <button type="button" className="close" data-   dismiss="modal" aria-label="Close"
                            onClick={()=>displayModal(false, 0)}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    {OptionnedContent()}
                    
                </div>
            </div>
        </div>
    );
}