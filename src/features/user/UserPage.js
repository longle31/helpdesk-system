import React from 'react';
import { DisplayUserForm } from './DisplayUserForm';
import './style.css';
export const UserPage = () => {

    return (
        <div className="container-fluid">
            <h3 className="text-center">Private Information</h3>
            <div className="row   justify-content-center mt-50" >
                
                <div className="col-xs-12 col-sm-10 col-md-8 col-lg-6">
                <DisplayUserForm/>
                </div>
                
            </div>
            
        </div>
    );
}