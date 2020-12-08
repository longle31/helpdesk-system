import React from 'react';
import { EditTaskForm } from './EditTaskForm';


export const TaskModal = ({ taskModal, setTaskModal, currentTaskId }) => {
   

    const onCloseModalCheckly = (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const modal = document.getElementById("taskModalContent");
        const modalBoundary = modal.getBoundingClientRect();
        if (mouseX < modalBoundary.left || mouseX > modalBoundary.right ||
            mouseY < modalBoundary.top || mouseY > modalBoundary.bottom) {
            setTaskModal({ ...taskModal, isDisplay: false })
        }

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
                        <h5 className="modal-title" id="taskModalTitle">Modal title</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                            onClick={() => {setTaskModal({ ...taskModal, isDisplay: false })}}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <EditTaskForm taskModal={taskModal} setTaskModal={setTaskModal} currentTaskId={currentTaskId}/>
                </div>
            </div>
        </div>
    );
}