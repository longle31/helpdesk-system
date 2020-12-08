import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllDevices } from '../devices/devicesSlice';

import { addNewReport, selectAllReports } from './reportsSlice';
export const AddNewReportForm = (props) => {
    const userId = useSelector(state => state.user.user._id);
    const dispatch = useDispatch();
    const devices = useSelector(selectAllDevices);

    const devicesOption = devices.map(device => <option
        key={device._id} value={device.deviceName} id={device._id}>
        {device.deviceName}</option>
    );

    const [currentDevice, setCurrentDevice] = useState({
    
        deviceName : devices[0].deviceName
    });

    const [validation, setValidation] = useState(false);
    const [loadingStatus, setLoadingStatus] = useState(false);

    const [reportContent, setReportContent] = useState({
        employee: userId,
        device: devices[0]._id,
        title: '',
        detail: '',
        status: 0
    });
    
    const validate = () => {
        if (reportContent.employee === '') return false;
        if (reportContent.device === '') return false;
        if (reportContent.title === '') return false;
        if (reportContent.detail === '') return false;
        return true;
    }
    useEffect(() => {
        setValidation(validate());
    }, [reportContent])

    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setReportContent({ ...reportContent, [name]: value });
    }


    // eslint-disable-next-line array-callback-return

    const onSave = () => {
        setLoadingStatus(true);
        dispatch(addNewReport(reportContent))
            .then(() => {
                setLoadingStatus(false);
                setReportContent({
                    employee: '',
                    device: '',
                    title: '',
                    detail: '',
                    status: 0
                });
            })
            .catch(error => {
                setLoadingStatus(false);
                setReportContent({
                    employee: '',
                    device: '',
                    title: '',
                    detail: '',
                    status: 0
                });
                alert(error);
            });
    }

    useEffect(()=>{
        const deviceId = devices.find(device => device.deviceName === currentDevice.deviceName)._id;
        setReportContent({...reportContent, device: deviceId});
    },[currentDevice.deviceName])

    useEffect(()=>{
        console.log(reportContent.device);
    },[reportContent.device])
    return (
        <div>
            <div className="modal-body">

                <picture>
                    <source srcSet="..." type="image/svg+xml" />
                    <img srcSet="..." class="img-fluid img-thumbnail" alt="..." />
                </picture>

                <div className="input-group flex-nowrap mb-2">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Device</span>
                    </div>
                    <select className="form-control" name="device" id="device"
                        value={currentDevice.deviceName}
                        onChange={e =>
                            {
                                setCurrentDevice({ ...currentDevice, deviceName: e.target.value });

                            }
        
                        }

                    >
                        {devicesOption}
                    </select>
                </div>
                <div class="input-group flex-nowrap mb-2">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Title</span>
                    </div>
                    <input type="text" class="form-control" name="title" id="title"
                        onChange={e => onChange(e)}
                        value={reportContent.title}
                    ></input>
                </div>
                <div class="form-group">
                    <label htmlFor="detail">Description</label>
                    <textarea class="form-control" name="detail" id="detail" rows="4"
                        value={reportContent.detail}
                        onChange={e => onChange(e)}
                    ></textarea>
                </div>

            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal"
                    onClick={() => props.displayModal(false, 0)}
                >
                    Close
                </button>
                    &nbsp;
                <button type="button" className="btn btn-primary" data-dismiss="modal"
                    disabled={!validation}
                    onClick={onSave}
                >
                    {loadingStatus ? <i className="fa fa-circle-o-notch fa-spin"></i> : ''}
                    &nbsp;
                    Save
                </button>
            </div>
        </div>
    );
}