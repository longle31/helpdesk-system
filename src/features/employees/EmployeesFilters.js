import React, { useState } from 'react';
export const EmployeesFilters = (props) => {
    const filters = props.filters;


    const onChange = (e) =>{
        let name = e.target.name;
        let value = e.target.value;
        props.filtersUpdated(name,value);
    }

    return (
        <tr>
            <td>
                <input type="text" className="form-control"
                    name="idFilter" id="idFilter" aria-describedby="helpId" 
                    placeholder="searching id"
                    value = {filters.idFilter}
                    onChange = {(e)=> onChange(e)}
                />
            </td>
            <td>
                <input type="text" className="form-control"
                    name="nameFilter" id="nameFilter" aria-describedby="helpId"
                    placeholder="searching name"
                    value = {filters.nameFilter}
                    onChange = {e => onChange(e)}
                    />
            </td>
           

            <td>
                <input type="text" className="form-control"
                    name="phoneNumberFilter" id="phoneNumberFilter" aria-describedby="helpId"
                    placeholder="searching phone" 
                    value = {filters.phoneNumberFilter}
                    onChange = {e => onChange(e)}
                    />
            </td>
            <td>
                <input type="text" className="form-control"
                    name="emailFilter" id="emailFilter" aria-describedby="helpId" 
                    placeholder="searching email" 
                    value = {filters.email}
                    onChange = {e => onChange(e)}
                    />
            </td>
          
            <td>
                <select className="form-control" name="positionFilter" id="positionFilter" value = {filters.positionFilter} 
                onChange={e => onChange(e)} >
                    <option value='all'>all</option>
                    <option value='technician'>tenchnician</option>
                    <option value='employee'>employee</option>
                    <option value='manager'>manager</option>
                </select>
            </td>
        </tr>
    );
}