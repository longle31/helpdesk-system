import React, { useState } from 'react';
import './NavBar.css';
import {Link} from 'react-router-dom';
const host = document.location.host;
export const NavBar = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const logOut = () =>{
        fetch(`http://${host}/logout`,{method:'GET'});
        document.location.replace(`http://${host}/logout`);
    }
    return (
        <div className="wrapper">
            <nav id="sidebar">
                
                <ul className="list-unstyled components">
                    <li className={currentPage === 0? "active":''}>
                        <Link to="/solving/home" onClick={()=>setCurrentPage(0)}><i className="fa fa-home reg-icon" aria-hidden="true"></i></Link> 
                    </li>
                    <li className={currentPage === 1? "active":''}>
                        <Link to="/solving/user" onClick={()=>setCurrentPage(1)}><i className="fa fa-address-card-o reg-icon" aria-hidden="true"></i></Link> 
                    </li>
                    <li className={currentPage === 2? "active":''}>
                        <Link to="/solving/tasks" onClick={()=>setCurrentPage(2)}><i className="fa fa-tasks reg-icon" aria-hidden="true"></i></Link>
                    </li>
                    <li>
                        <Link to="" onClick={logOut}>
                        <i className="fa fa-sign-out reg-icon"></i>
                        </Link>
                    </li>
                </ul>

            </nav>

        </div>
    );
}