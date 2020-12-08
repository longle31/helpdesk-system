import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewEmployee, checkMail } from './employeesSlice';
import './employeesStyle.css';
export const AddNewEmpForm = ({ closeModal }) => {
    const dispatch = useDispatch();
    const [nameValidation, setNameValidation] = useState(false);
    const [addressValidation, setAddressValidation] = useState(false);
    const [phoneValidation, setPhoneValidation] = useState(false);
    const [emailValidation, setEmailValidation] = useState(false);
    const [birthDateValidation, setBirthDateValidation] = useState(false);
    const [loadingStatus, setLoadingStatus] = useState(false);
    const [emailCheckStatus, setEmailCheckStatus] = useState(true);
    const [technique, setTechnique] = useState('hardware');
    const initFormat = {
        name: '',
        address: '',
        phoneNumber: '',
        email: '',
        birthDate: '',
        position: 'employee'
    }
    const [currentData, setCurrentData] = useState(initFormat);
    const nameReg = /[A-Za-z]+/;
    const addressReg = /\w+[-/]*/;
    const phoneReg = /\d+/;
    const emailReg = /^[\D]\w+@.+\./;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const validate = () => {
        if (!currentData.name.match(nameReg)) {
            setNameValidation(false);
        } else {
            setNameValidation(true);
        }
        if (!currentData.address.match(addressReg)) {
            setAddressValidation(false);
        } else {
            setAddressValidation(true);
        }
        if (!currentData.phoneNumber.match(phoneReg)) {
            setPhoneValidation(false)
        } else {
            setPhoneValidation(true);
        }
        if (!currentData.email.match(emailReg)) {
            setEmailValidation(false);
        } else {
            setEmailValidation(true);
        }
        if (!currentData.birthDate) {
            setBirthDateValidation(false);
        } else {
            setBirthDateValidation(true);
        }

    }

    useEffect(() => {
        validate();
    },
        [currentData]
    );


    const onChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setCurrentData({
            ...currentData,
            [name]: value
        });

    };

    const createWarningApearance = (warningText, status) => {
        if (status === false)
            return (
                <i className="fa fa-exclamation-circle input-group-text reg-icon"
                    style={{ color: "red" }} aria-hidden="true"
                >
                </i>
            );
        else {
            return (<i className="fa fa-check input-group-text reg-icon"
                style={{ color: "green" }} aria-hidden="true"
            >
            </i>)
        }
    }


    const onSave = (e) => {
        setLoadingStatus(true);
        checkMail(currentData.email)
            .then(msg => {

                if (msg === 'valid_email') {
                    setEmailCheckStatus(true);
                    dispatch(
                        addNewEmployee(
                            currentData.position === 'technician' ? { ...currentData, technique } : currentData
                        )
                    )
                        .then(emp => {
                            setCurrentData(initFormat);
                            setLoadingStatus(false);
                        });
                } else if (msg === 'invalid_email') {

                    setEmailCheckStatus(false);
                    setLoadingStatus(false);
                }

            })
            .catch(err => {
                setEmailCheckStatus(false);
                setLoadingStatus(false);
            });
    }

    return (
        <div>
            <div className="modal-body">
                <form id="empModalAddContent">
                    <div className='input-group flex-nowrap mb-2' >
                        <div className="input-group-prepend">
                            <span className="input-group-text">Name</span>
                        </div>

                        <input type="text" name="name" id="name"
                            className="form-control" onChange={e => onChange(e)} value={currentData.name}
                            style={{ borderColor: !nameValidation ? 'red' : 'green' }}

                        />
                        <div className="input-group-append ">
                            {createWarningApearance('chua nhap ten', nameValidation)}
                        </div>


                    </div>
                    <div className='input-group flex-nowrap mb-2'>
                        <div className="input-group-prepend">
                            <span className="input-group-text">Address</span>
                        </div>

                        <input type="text" name="address" id="address"
                            datatoggle="tooltip" title="Some tooltip text!"
                            className="form-control" onChange={e => onChange(e)} value={currentData.address}
                            style={{ borderColor: !addressValidation ? 'red' : 'green' }}
                        />
                        <div className="input-group-append ">
                            {createWarningApearance('', addressValidation)}
                        </div>

                    </div>
                    <div className='input-group flex-nowrap mb-2'>
                        <div className="input-group-prepend">
                            <span className="input-group-text">Phone</span>
                        </div>

                        <input type="text" name="phoneNumber" id="phoneNumber" className="form-control"
                            onChange={e => onChange(e)} value={currentData.phoneNumber}
                            style={{ borderColor: !phoneValidation ? 'red' : 'green' }}
                        />
                        <div className="input-group-append ">
                            {createWarningApearance('', phoneValidation)}
                        </div>
                    </div>

                    <div className='input-group flex-nowrap mb-2'>
                        <div className="input-group-prepend">
                            <span className="input-group-text">Email</span>
                        </div>

                        <input type="text" name="email" id="email" className="form-control"
                            onChange={e => onChange(e)} value={currentData.email}
                            style={{ borderColor: (!emailValidation || !emailCheckStatus) ? 'red' : 'green' }}
                        />
                        <div className="input-group-append ">
                            {createWarningApearance('', emailValidation && emailCheckStatus)}

                        </div>
                    </div>
                    <div className='input-group flex-nowrap mb-2'>
                        <div className="input-group-prepend">
                            <span className="input-group-text">BirthDate</span>
                        </div>

                        <input type="date" name="birthDate" id="birthDate" className="form-control"
                            onChange={e => onChange(e)} value={currentData.birthDate}
                            style={{ borderColor: !birthDateValidation ? 'red' : 'green' }}
                        />
                        <div className="input-group-append ">
                            {createWarningApearance('', birthDateValidation)}
                        </div>
                    </div>


                    <div className="input-group flex-nowrap mb-2">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Position</span>
                        </div>
                        <select className="form-control" name="position" id="position"
                            onChange={e => onChange(e)} value={currentData.position}
                        >
                            <option value="employee">Employee</option>
                            <option value="technician">Technician</option>
                        </select>
                    </div>
                    {currentData.position === 'technician' ?
                        <div className="input-group flex-nowrap mb-2">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Technique</span>
                            </div>
                            <select className="form-control" name="technique" id="position"
                                onChange={e => setTechnique(e.target.value)} value={technique}
                            >
                                <option value="hardware">Hardware</option>
                                <option value="software">Software</option>
                                <option value="network">Network</option>
                            </select>
                        </div>
                        : ''}
                </form>

            </div>
            <div className="modal-footer">
                <button
                    type="button" className="btn btn-secondary" data-dismiss="modal"
                    onClick={() => {
                        closeModal();
                    }}
                >
                    Close
            </button>
                <button
                    type="button" className="btn btn-primary"
                    disabled={!(nameValidation && phoneValidation && birthDateValidation && addressValidation && emailValidation)}
                    onClick={e => onSave(e)}
                >
                    {loadingStatus ? <i className="fa fa-circle-o-notch fa-spin"></i> : ''}
                    &nbsp;Save
            </button>
            </div>

        </div>
    );
}