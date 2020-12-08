
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddNewEmpForm } from './AddNewEmpForm';
import { addNewEmp } from './employeesSlice';
import { MoreDetailForm } from './MoreDetailForm';

export const EmployeeModal = (props) => {

    const { isEmployeeModalDisplayed, employeeModalStatus,currentEmployeeId } = props.employeeModal;

    const dispatch = useDispatch();


    const onCloseModalCheckly = (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const modal = document.getElementById("employeeModalContent");
        const modalBoundary = modal.getBoundingClientRect();
        if (mouseY === 0 && mouseX === 0);
        else if (isEmployeeModalDisplayed)
            if (mouseX < modalBoundary.left || mouseX > modalBoundary.right ||
                mouseY < modalBoundary.top || mouseY > modalBoundary.bottom) {
                
                props.updateEmployeeModal(false , 0);

            }

    }

    const onCloseModal = () =>{
        props.updateEmployeeModal(false , 0);
    }

    const loadOptionContent = () => {
        if (employeeModalStatus === 0) {
            return (
                <AddNewEmpForm closeModal={onCloseModal}/>
            );

        } else if (employeeModalStatus === 1) {
            return (
                <MoreDetailForm closeModal={onCloseModal} currentEmployeeId={currentEmployeeId}/>
            );
        }
        else if (employeeModalStatus === 2) {
            return ('');
        }
        return ('');
    }




    const optionedContent = loadOptionContent();




    return (
        <div className={isEmployeeModalDisplayed ? "modal fade show" : "modal fade"}
            style=
            {{
                display: isEmployeeModalDisplayed ? 'block' : 'none',
            }}
            id="employeeModal"
            tabIndex="-1" role="dialog" aria-labelledby="employeeModalTitle" aria-hidden="true"
            onClick={(e) => { onCloseModalCheckly(e) }}

        >
            <div className="modal-dialog" role="document">
                <div className="modal-content" id="employeeModalContent">
                    <div className="modal-header">
                        <h5 className="modal-title" id="employeeModalTitle">
                            {employeeModalStatus === 0 ? 'Add New Employee' : ''}
                        </h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                            onClick={
                                () => {
                                    props.updateEmployeeModal(false , 0) ;

                                }
                            }
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    {optionedContent}
                   
                </div>
            </div>
        </div>
    );
}