
import React, { useState } from 'react';
    
export const TableHeading = ({ title, sortName, setSortOrder, sortOrder }) => {
    const [sorterDisplayer, setSorterDisplayer] = useState(false);
    const onSetSortOder = () => {
        setSortOrder(sortName, sortOrder < 1 ? sortOrder + 1 : -1);
    }

    return (
        <th
            onMouseOver={e => setSorterDisplayer(true)}
            onMouseOut={e => setSorterDisplayer(false)}
            onClick={onSetSortOder}       
        >
            <span style={{float:'left'}}>
            {title}
            </span>
            
            {sorterDisplayer
                ? <span className="sorter" style={{float:"right", color: 'darksalmon'}} >
                    {sortOrder === -1
                        ? <i className="fa fa-sort-desc" ></i>
                        : (
                            sortOrder === 1
                                ? <i className="fa fa-sort-asc"></i>
                                : <i class="fa fa-random" aria-hidden="true"></i>
                        )
                    }
                </span> : ''}
        </th>

    )
}