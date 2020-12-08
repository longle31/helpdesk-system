import React, { useState } from 'react';

export const ReportsFilters = ({ updateReportFilters, filters }) => {


    const onChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        updateReportFilters(name, value);
    }

    return (
        <tr>
            <td>
                <input type="text" className="form-control"
                    name="employeeNameFilter" id="employeeNameFilter"
                    placeholder="searching id"
                    value={filters.employeeNameFilter}
                    onChange={(e) => onChange(e)}
                />
            </td>
            <td>
                <input type="text" className="form-control"
                    name="deviceNameFilter" id="deviceNameFilter"
                    placeholder="searching device"
                    value={filters.deviceNameFilter}
                    onChange={e => onChange(e)}
                />
            </td>

            <td>
                <input type="text" className="form-control"
                    name="reportTitleFilter" id="reportTitleFilter"
                    placeholder="searching title"
                    value={filters.reportTitleFilter}
                    onChange={e => onChange(e)}
                />
            </td>

            <td>
                <input type="text" className="form-control"
                    name="reportDateFilter" id="reportDateFilter"
                    placeholder="searching date"
                    value={filters.reportDateFilter}
                    onChange={e => onChange(e)}
                />
            </td>

            <td>
                <select className="form-control" name="reportStatusFilter" id="reportStatusFilter"
                    value={filters.reportStatusFilter}
                    onChange={e => onChange(e)} >
                    <option value={-1}>all</option>
                    <option value={0}>new</option>
                    <option value={1}>solving</option>
                    <option value={2}>solved</option>
                </select>
            </td>
        </tr>
    );
}