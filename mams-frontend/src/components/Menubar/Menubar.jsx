import React, {useContext} from 'react';
import './Menubar.css';
import {Link, useNavigate} from 'react-router-dom';
import { assets } from "../../assets/assets.js";
import {AppContext} from "../../contex/AppConatiner.jsx";

const Menubar = () => {
    const nevigat = useNavigate();
    const { setAuthData,auth } = useContext(AppContext);
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setAuthData(null,null);
        nevigat("/login");
    };

    const isAdmin = auth.role === 'ROLE_ADMIN';

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-2">
            <Link className="navbar-brand" to="/dashbord"> {/* ✅ use Link instead of <a> */}
                <img src={assets.logo} alt="Logo" height="40" />
            </Link>

            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse p-2" id="navbarNav">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" to="/dashbord">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/purchase">Purchases</Link>
                    </li>
                    {
                        isAdmin&&(
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/transfer">Transfer</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/category">Assets Categories</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/users">Manage Users</Link>
                                </li>
                            </>
                        )
                    }
                </ul>

                <ul className="navbar-nav ms-auto me-3 me-lg-4">
                    <li className="nav-item dropdown">
                        <a
                            href="#"
                            id="navbarDropdown"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            className="nav-link dropdown-toggle"
                        >
                            <img src={assets.profile} alt="Profile" height={32} width={32} />
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li>
                                <Link className="dropdown-item" to="/settings">Settings</Link>
                            </li>
                            <li>
                                <Link className="dropdown-item" to="/activity-log">Activity Log</Link>
                            </li>
                            <li><hr className="dropdown-divider" /></li>
                            <li>
                                <button className="dropdown-item" onClick={logout}>Logout</button>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Menubar;
