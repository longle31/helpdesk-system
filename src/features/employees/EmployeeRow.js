import React, { useState } from 'react';
import { useDispatch } from 'react-redux';


export const EmployeeRow = (props) => {

    const emp = props.emp;
    const onClickChooseThisRow = () =>{
        props.currentEmployeeIdUpdated(emp._id);
    }
    return (
        <tr key={emp._id} onContextMenu = {onClickChooseThisRow}>

            <td>{emp._id}</td>
            <td>{emp.name}</td>
            
            <td>{emp.phoneNumber}</td>
            <td>{emp.email}</td>
          
            <td>{emp.position}</td>
        </tr>

    );
}