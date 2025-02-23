import { Link } from "react-router-dom";
import React from "react";

// Transfer isAdmin as an object of props in this {}
const Navbar = ({ isAdmin }) => {
    return (
        <>
            <div className="navbar">
                <div className="navbar-wrapper">
                    <ul>
                        <li>
                            <button>
                                <Link to="/">
                                    <i
                                        className="fa-solid fa-house fa-2x"
                                        style={{ color: "white" }}
                                    ></i>
                                </Link>
                            </button>
                        </li>
                        <li>
                            <button>
                                <Link to="/library">
                                    <i
                                        className="fa-solid fa-magnifying-glass fa-2x"
                                        style={{ color: "white" }}
                                    ></i>
                                </Link>
                            </button>
                        </li>
                        <li>
                            <button>
                                <Link to="/upload">
                                    <i
                                        className="fa-solid fa-plus fa-2x"
                                        style={{ color: "white" }}
                                    ></i>
                                </Link>
                            </button>
                        </li>
                        <li>
                            <button>
                                <Link to="/user">
                                    <i
                                        className="fa-solid fa-user fa-2x"
                                        style={{ color: "white" }}
                                    ></i>
                                </Link>
                            </button>
                        </li>
                        {/* DISPLAY THIS ONLY IF USER IS ADMIN  */}
                        {isAdmin ? (
                            <li>
                                <button>
                                    <Link to="/admin">
                                        <i
                                            className="fa-solid fa-shield-halved fa-2x"
                                            style={{ color: "white" }}
                                        ></i>
                                    </Link>
                                </button>
                            </li>
                        ) : null}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Navbar;
