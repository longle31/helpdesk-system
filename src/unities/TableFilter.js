import React from 'react';

export const TableFilter =({name, value, changeFilterContent, placeholder, type}) =>{

    if(type === 'text'){
        return(
            <td>
                <input type="text" className="form-control"
                    name={name} id={name} 
                    placeholder={placeholder}
                    value = {value}
                    onChange = {(e)=> changeFilterContent(e.target.name, e.target.value)}
                />
            </td>
        );
    }else if(type === 'selector'){
        return(
            <td>
                <select className="form-control" name={name} id={name} value = {value} 
                onChange={e=> changeFilterContent(e.target.name, e.target.value)} >
                    <option value='all'>all</option>
                    <option value='technician'>tenchnician</option>
                    <option value='employee'>employee</option>
                    <option value='manager'>manager</option>
                </select>
            </td>
        );
    }
    return '';
}