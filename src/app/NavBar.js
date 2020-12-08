import React, { useState } from 'react';
import './NavBar.css';
import {Link} from 'react-router-dom';
const host = document.location.host;
export const NavBar = () => {
    const [currentPage, setCurrentPage] = useState(0);

    const logOut = () =>{
        fetch(`http://${host}/logout`, {method :'GET'});
        window.location.replace(`http://${host}/logout`);
    }
    
    return (
        <div className="wrapper">
            <nav id="sidebar">
                <div className="sidebar-header">
                </div>
                <ul className="list-unstyled components">
                    <li className={currentPage === 0? "active":''}>
                        <Link to="/reporting/home" onClick={()=>setCurrentPage(0)}><i className="fa fa-home reg-icon" aria-hidden="true"></i></Link> 
                    </li>
                    <li className={currentPage === 1? "active":''}>
                        <Link to="/reporting/user" onClick={()=>setCurrentPage(1)}><i className="fa fa-address-card-o reg-icon" aria-hidden="true"></i></Link> 
                    </li>
                    <li className={currentPage === 2? "active":''}>
                        <Link to="/reporting/reports" onClick={()=>setCurrentPage(2)}><i className="fa fa-file-text reg-icon" aria-hidden="true"></i></Link>
                    </li>
                    <li>
                        <Link onClick={logOut}>
                            <i className="fa fa-sign-out reg-icon" aria-hidden="true"></i>
                        </Link>
                    </li>
                </ul>

            </nav>

        </div>
    );
}