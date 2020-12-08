import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, userUpdated, fetchUser, updateUser } from './userSlice';
import './style.css';
import { checkMail } from '../employees/employeesSlice';

const cookie = document.cookie.split(';')
  .map(cookie => cookie.split('='))
  .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }),
    {});


export const DisplayUserForm = (props) => {


  const inititaluser = useSelector(selectUser);
  const userStatus = useSelector(state => state.user.status);
  const [isEmailUpdated, setIsEmailUpdated] = useState(-1);
  const [user, setUser] = useState({
    _id: '',
    name: '',
    address: '',
    email: '',
    phoneNumber: '',
    birthDate: '',
    position: ''
  });

  const [loadingStatus, setLoadingStatus] = useState(false);

  const [inputStatus, setInputStatus] = useState({
    nameInputStatus: true,
    addressInputStatus: true,
    phoneNumberInputStatus: true,
    emailInputStatus: true,
    birthDateInputState: true,
  });
  const [emailValidation, setEmailValidation] = useState(true);
  const dispatch = useDispatch();

  const onClickCancel = () => {
    setUser(inititaluser);
    onClockInputs();
    setEmailValidation(true);
  }

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch((fetchUser(cookie.loadingToken)));

    }
    if (userStatus === 'succeeded') {
      setUser(inititaluser);
      setIsEmailUpdated(0);
    }

  }, [dispatch, inititaluser, userStatus]);

  useEffect(() => {
    if (user.email.localeCompare(inititaluser.email) !== 0 && isEmailUpdated === 0) {
      setIsEmailUpdated(1);
    }
  }, [user.email])

  const onSave = () => {
    setLoadingStatus(true);
    if (isEmailUpdated)
      checkMail(user.email)
        .then(error => {
          if (error === 'invalid_email') {
            setLoadingStatus(false);
            setEmailValidation(false);
            setIsEmailUpdated(0);
            setUser({...user, email: inititaluser.email});
          } else if (error === 'valid_email') {
            dispatch(updateUser(user))
              .then(() => {
                setLoadingStatus(false);
                setEmailValidation(true);
                setIsEmailUpdated(0);
              });
          }
        })
        .catch(error => {
          alert(error);
          setEmailValidation(false);
          setIsEmailUpdated(0);
          setUser({...user, email: inititaluser.email});
        });
    else {
      dispatch(updateUser(user))
        .then(() => {
          setLoadingStatus(false);
        })
        .catch(err=> alert(err));
    }
  
  onClockInputs();
}
const onClockInputs = () => {
  setInputStatus({
    nameInputStatus: true,
    addressInputStatus: true,
    phoneNumberInputStatus: true,
    emailInputStatus: true,
    birthDateInputState: true,
  });
}
const onChange = (e) => {
  let name = e.target.name;
  let value = e.target.value;
  if(name=== 'birthDate'){
    setUser({...user, birthDate: value.toLocaleString()})
  }
  setUser({ ...user, [name]: value });

}

return (
  <div className="card" >
    <div className="card-header">
      Your usermation
      </div>
    <div className="card-body">
      <div className="input-group flex-nowrap mb-2">
        <div className="input-group-prepend">
          <span className="input-group-text" id="addon-wrapping">ID</span>
        </div>
        <input type="text" className="form-control" id='_id' name='_id' readOnly={true}

          value={user._id} aria-label="ID" />
      </div>

      <div className="input-group flex-nowrap mb-2">
        <div className="input-group-prepend">
          <span className="input-group-text" >Name</span>
        </div>
        <input type="text" className="form-control"
          aria-label="Name" id="name" name="name"
          readOnly={inputStatus.nameInputStatus}
          onDoubleClick={() => { setInputStatus({ ...inputStatus, nameInputStatus: !inputStatus.nameInputStatus }) }}
          value={user.name}
          onChange={e => onChange(e)}
        />
        <div className="input-group-appennd">
          <i className="fa fa-pencil  input-group-text reg-icon" aria-hidden="true"
            onClick={() => { setInputStatus({ ...inputStatus, nameInputStatus: !inputStatus.nameInputStatus }) }}
          >
          </i>
        </div>
      </div>


      <div className="input-group flex-nowrap mb-2">
        <div className="input-group-prepend">
          <label className="input-group-text">Adress</label>
        </div>
        <input type="text"
          className="form-control "
          id="address" name="address" readOnly={inputStatus.addressInputStatus}
          onDoubleClick={() => setInputStatus({ ...inputStatus, addressInputStatus: !inputStatus.addressInputStatus })}

          value={user.address}
          onChange={e => onChange(e)} />
        <div className="input-group-appennd">
          <i className="fa fa-pencil input-group-text reg-icon" aria-hidden="true"
            onClick={() => { setInputStatus({ ...inputStatus, addressInputStatus: !inputStatus.addressInputStatus }) }}
          >
          </i>
        </div>
      </div>


      <div className="input-group mb-2">
        <div className="input-group-prepend">
          <label className="input-group-text">Phone</label>
        </div>
        <input type="text"
          className="form-control "
          id="phoneNumber" name="phoneNumber" readOnly={inputStatus.phoneNumberInputStatus}
          onDoubleClick={() => setInputStatus({ ...inputStatus, phoneNumberInputStatus: !inputStatus.phoneNumberInputStatus })}


          value={user.phoneNumber}
          onChange={e => onChange(e)} />
        <div className="input-group-append">
          <i className="fa fa-pencil input-group-text reg-icon" aria-hidden="true"
            onClick={() => { setInputStatus({ ...inputStatus, phoneNumberInputStatus: !inputStatus.phoneNumberInputStatus }) }}
          >
          </i>
        </div>

      </div>
      <div className="input-group mb-2">
        <div className="input-group-prepend">
          <label className="input-group-text">Email</label>
        </div>
        <input type="text"
          className="form-control "
          id="email" name="email" readOnly={inputStatus.emailInputStatus}
          onDoubleClick={() => setInputStatus({ ...inputStatus, emailInputStatus: !inputStatus.emailInputStatus })}


          value={user.email}
          onChange={e => onChange(e)} />
        <div className="input-group-append">
          <i className="fa fa-pencil input-group-text reg-icon" aria-hidden="true"
            onClick={() => setInputStatus({ ...inputStatus, emailInputStatus: !inputStatus.emailInputStatus })}
          >
          </i>
        </div>
      </div>

      <div className="input-group mb-2">
        <div className="input-group-prepend">
          <label className="input-group-text">BirthDate:</label>
        </div>
        <input type="date"
          className="form-control "
          id="birthDate" name="birthDate" readOnly="readOnly"
          onDoubleClick={() => { setInputStatus({ ...inputStatus, birthDateInputState: !inputStatus.birthDateInputState }) }}
          value={user.birthDate !== undefined ? user.birthDate.substring(0, user.birthDate.indexOf('T')) : ''}
          onChange={e => onChange(e)}
        />


      </div>

      <div className="input-group mb-2">
        <div className="input-group-prepend">
          <label className="input-group-text">Position</label>
        </div>
        <input type="text"
          className="form-control "
          id="position" name="position" readOnly={true}
          value={user.position}
        />

      </div>

    </div>
    <div className="card-footer text-muted">

      <button type="button" className="btn btn-primary" onClick={onSave} >
        {loadingStatus ? <i className="fa fa-circle-o-notch fa-spin"></i> : ''}&nbsp;Save
        </button>
        &nbsp;
        <button type="button" className="btn btn-warning" onClick={onClickCancel}>Cancel</button>
        &nbsp;{emailValidation ? '' : <i className="fa fa-exclamation-triangle" style={{ color: "red" }}> Invalid Email</i>}
    </div>
  </div>
);

}
