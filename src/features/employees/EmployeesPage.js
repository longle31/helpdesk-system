import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EmployeeRow } from './EmployeeRow';
import { EmployeesFilters } from './EmployeesFilters';
import { EmployeeModal } from './EmployeeModal';
import { TableHeading } from '../../unities/TableHeading';
import { EmployeesToolkitMenu } from './EmployeesToolkitMenu';

import { fetchEmployees, selectAllEmployees } from './employeesSlice';
import '../../App.css';
import { fetchDevices } from '../devices/devicesSlice';
import { TableFilter } from '../../unities/TableFilter';

export const EmployeesPage = () => {
    const dispatch = useDispatch();
    const employeeStatus = useSelector(state => state.employees.status);
    const error = useSelector(state => state.employees.error);

    const employees = useSelector(selectAllEmployees);

    useEffect(
        () => {
            if (employeeStatus === 'idle') {
                dispatch(fetchEmployees());
            }
        }, [employeeStatus, dispatch]
    );

    let content;

    if (employeeStatus === 'loading') {
        content = (
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>);
    } else if (employeeStatus === 'succeeded') {
        content = employees;
    } else if (employeeStatus === 'failed') {
        content = <div>{error}</div>;
    }

    const [filters, setFilters] = useState({
        idFilter: '',
        nameFilter: '',
        addressFilter: '',
        emailFilter: '',
        phoneNumberFilter: '',
        positionFilter: 'all',
    });
    const [employeesSorters, setEmployeesSorters] = useState({
        idSorter: 0,
        nameSorter: 0,
        addressSorter: 0,
        emailSorter: 0,
        phoneNumberSorter: 0,
        positionSorter: 0,
    });
    const [toolbar, setToolbar] = useState({
        top: 0,
        left: 0,
        isDisplay: false,
    });
    const [employeeModal, setEmployeeModal] = useState({
        isEmployeeModalDisplayed: false,
        currentEmployeeId: '',
        employeeModalStatus: -1 // 0: add option, 1 : more infor, 2 other

    });

    const setSortOrder = (name, value) => {
        setEmployeesSorters({
            idSorter: 0,
            nameSorter: 0,
            addressSorter: 0,
            emailSorter: 0,
            phoneNumberSorter: 0,
            positionSorter: 0,
            [name]: value,
        })
    }

    var tempEmployees = Object.assign([], content);

    if (filters.idFilter) tempEmployees = tempEmployees.filter(emp => {
        return emp._id.toString().toLowerCase().indexOf(filters.idFilter.toLowerCase()) !== -1;
    }
    );
    if (filters.nameFilter) tempEmployees = tempEmployees.filter(emp => {
        return emp.name.toString().toLowerCase().indexOf(filters.nameFilter.toLowerCase()) !== -1;
    }
    );
    if (filters.phoneNumberFilter) tempEmployees = tempEmployees.filter(emp => {
        return emp.phoneNumber.toString().toLowerCase().indexOf(filters.phoneNumberFilter.toLowerCase()) !== -1;
    }
    );
    if (filters.emailFilter) tempEmployees = tempEmployees.filter(emp => {
        return emp.email.toString().toLowerCase().indexOf(filters.emailFilter.toLowerCase()) !== -1;
    }
    );

    tempEmployees = tempEmployees.filter(emp => {
        if (filters.positionFilter === "all") return emp;
        if (filters.positionFilter === "employee") return emp.position === "employee";
        if (filters.positionFilter === "manager") return emp.position === "manager";
        return emp.position === "technician";
    });

    if (employeesSorters.idSorter !== 0)
        tempEmployees = tempEmployees.sort((a, b) => {
            return a._id > b._id ? employeesSorters.idSorter : - employeesSorters.idSorter;
        });

    if (employeesSorters.nameSorter !== 0)
        tempEmployees = tempEmployees.sort((a, b) => {
            if(a.name === b.name) return 0;
            return a.name > b.name ? employeesSorters.nameSorter : - employeesSorters.nameSorter;
        });

    if (employeesSorters.addressSorter !== 0)
        tempEmployees = tempEmployees.sort((a, b) => {
            if(a.address === b.address) return 0;
            return a.address > b.address ? employeesSorters.addressSorter : - employeesSorters.addressSorter;
        });

    if (employeesSorters.emailSorter !== 0)
        tempEmployees = tempEmployees.sort((a, b) => {
            if(a.email === b.email) return 0;
            return  a.email > b.email ? employeesSorters.emailSorter : - employeesSorters.emailSorter
        });

    if (employeesSorters.phoneNumberSorter !== 0)
        tempEmployees = tempEmployees.sort((a, b) => {
            if(a.phoneNumber === b.phoneNumber) return 0;
            return a.phoneNumber > b.phoneNumber ? employeesSorters.phoneNumberSorter : - employeesSorters.phoneNumberSorter;
        });

    if (employeesSorters.positionSorter !== 0)
        tempEmployees = tempEmployees.sort((a, b) => {
            if(a.position === b.position) return 0;
            return a.position > b.position ? employeesSorters.positionSorter : - employeesSorters.positionSorter
        });

    const onUpdateCurrentEmployee = (empId) => {
        setEmployeeModal({
            ...employeeModal,
            currentEmployeeId: empId
        })
    }
    const renderedEmployees = tempEmployees.map(emp => 
            <EmployeeRow emp={emp} key={emp._id} currentEmployeeIdUpdated={onUpdateCurrentEmployee} />

    );

    const onMouseMoveTbody = (e) => {
        if (toolbar.isDisplay) {
            setToolbar({ ...toolbar, isDisplay: false });

        }
    }
    const tbodyOnMouseLick = (e) => {
        e.preventDefault();
        setToolbar({ left: e.clientX, top: e.clientY - 35, isDisplay: true });
    }

    
    const onDisplayToolbar = (isDisplay) => {
        setToolbar({
            ...toolbar,
            isDisplay
        });
    }

    const onUpdateModal = (display , status ) => {

        setEmployeeModal({
            ...employeeModal,
            isEmployeeModalDisplayed: display,
            employeeModalStatus: status,
        });


    }

    const onUpdateFilters = (name, value) =>{
        setFilters({...filters, [name]: value});
    }

    return (
        <div className={employeeModal.isEmployeeModalDisplayed ? "modal-open container-fluid" : "container-fluid"}
        >

            {toolbar.isDisplay?<EmployeesToolkitMenu toolbar={toolbar}
                displayToolbar={onDisplayToolbar} updateEmployeeModal={onUpdateModal}
            />:''}
            {employeeModal.isEmployeeModalDisplayed?<EmployeeModal updateEmployeeModal={onUpdateModal}
                currentEmployeeId={employeeModal.currentEmployeeId}
                employeeModal={employeeModal} 
            />:''}
            <h3 className="text-center">Employees Management</h3>
            <div className="row justify-content-center">

                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-11">

                    <table className='table table-bordered table-hover' >
                        <thead className="thead-dark">
                            <tr>
                                <TableHeading
                                    title="ID"
                                    sortName="idSorter"
                                    sortOrder={employeesSorters.idSorter}
                                    setSortOrder={setSortOrder}
                                />
                                <TableHeading
                                    title="Name"
                                    sortName="nameSorter"
                                    sortOrder={employeesSorters.nameSorter}
                                    setSortOrder={setSortOrder}
                                />
                                <TableHeading
                                    title="Phone Number"
                                    sortName="phoneNumberSorter"
                                    sortOrder={employeesSorters.phoneNumberSorter}
                                    setSortOrder={setSortOrder}
                                />
                                <TableHeading
                                    title="Email"
                                    sortName="emailSorter"
                                    sortOrder={employeesSorters.emailSorter}
                                    setSortOrder={setSortOrder}
                                />
                                <TableHeading
                                    title="Position"
                                    sortName="positionSorter"
                                    sortOrder={employeesSorters.positionSorter}
                                    setSortOrder={setSortOrder}
                                />
                            </tr>
                          
                            <EmployeesFilters filters={filters} filtersUpdated={onUpdateFilters} />
                        </thead>
                        <tbody onMouseMove={e => onMouseMoveTbody(e)}
                            onContextMenu={e => tbodyOnMouseLick(e)}
                        >
                            {employees ? renderedEmployees : content}
                        </tbody>
                    </table>

                </div>

            </div>

        </div>
    );
}
