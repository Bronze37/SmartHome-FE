import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Xóa token hoặc thông tin đăng nhập khỏi localStorage/sessionStorage
        localStorage.removeItem('token');
        // Chuyển hướng người dùng về trang đăng nhập
        window.location.href = '/login';
    };

    return (
        <div>
            <div className="z-10 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r transition duration-300"
                style={{ backgroundColor: "white" }}>
                <div>
                    {/* <div>
                        <NavLink to="/" title="home">
                            <img src={logo} className="w-100 object-contain" alt="POC WCS" />
                        </NavLink>
                    </div> */}
                    {/* <hr className="mt-4" /> */}
                    <hr />
                    <ul className="space-y-2 tracking-wide mt-8">
                        <li>
                            <NavLink
                                to="/"
                                aria-label="dashboard"
                                className={({ isActive }) =>
                                    isActive
                                        ? 'relative px-4 py-3 flex items-center space-x-4 rounded-lg text-white bg-gradient-to-r from-sky-600 to-cyan-400'
                                        : 'px-4 py-3 flex items-center space-x-4 rounded-md text-black group'
                                }
                            >
                                <svg
                                    className={({ isActive }) =>
                                        isActive ? 'h-6 w-6 text-white' : 'h-6 w-6 text-black'
                                    }
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    stroke-width="2"
                                    stroke="currentColor"
                                    fill="none"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" />{' '}
                                    <polyline points="5 12 3 12 12 3 21 12 19 12" />{' '}
                                    <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                                    <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                                </svg>
                                <span className="-mr-1 font-medium">Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/datasensor"
                                className={({ isActive }) =>
                                    isActive
                                        ? 'relative px-4 py-3 flex items-center space-x-4 rounded-lg text-white bg-gradient-to-r from-sky-600 to-cyan-400'
                                        : 'px-4 py-3 flex items-center space-x-4 rounded-md text-black group'
                                }
                            >
                                <svg
                                    className={({ isActive }) =>
                                        isActive ? 'h-6 w-6 text-white' : 'h-6 w-6 text-black'
                                    }
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    stroke-width="2"
                                    stroke="currentColor"
                                    fill="none"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" />{' '}
                                    <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
                                    <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
                                </svg>
                                <span className="-mr-1 font-medium">Data Sensor</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/actionhistory"
                                className={({ isActive }) =>
                                    isActive
                                        ? 'relative px-4 py-3 flex items-center space-x-4 rounded-lg text-white bg-gradient-to-r from-sky-600 to-cyan-400'
                                        : 'px-4 py-3 flex items-center space-x-4 rounded-md text-black group'
                                }
                            >
                                <svg
                                    className={({ isActive }) =>
                                        isActive ? 'h-6 w-6 text-white' : 'h-6 w-6 text-black'
                                    }
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    stroke-width="2"
                                    stroke="currentColor"
                                    fill="none"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" /> <polyline points="16 3 20 7 16 11" />
                                    <line x1="10" y1="7" x2="20" y2="7" /> <polyline points="8 13 4 17 8 21" />{' '}
                                    <line x1="4" y1="17" x2="13" y2="17" />
                                </svg>
                                <span className="-mr-1 font-medium">Action History</span>
                            </NavLink>
                        </li>
                        {/* <li>
                            <NavLink
                                to="/profile"
                                className={({ isActive }) =>
                                    isActive
                                        ? 'relative px-4 py-3 flex items-center space-x-4 rounded-lg text-white bg-gradient-to-r from-sky-600 to-cyan-400'
                                        : 'px-4 py-3 flex items-center space-x-4 rounded-md text-blackgroup'
                                }
                            >
                                <svg
                                    className={({ isActive }) =>
                                        isActive ? 'h-6 w-6 text-white' : 'h-6 w-6 text-black'
                                    }
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    stroke-width="2"
                                    stroke="currentColor"
                                    fill="none"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" /> <circle cx="12" cy="7" r="4" />
                                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                </svg>
                                <span className="-mr-1 font-medium">Profile</span>
                            </NavLink>
                        </li> */}
                    </ul>
                </div>

                <div>
                    <button
                        onClick={handleLogout}
                        className="w-full px-4 py-3 flex items-center space-x-4 rounded-lg text-white bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-700 shadow-md hover:shadow-lg transition duration-300"
                    >
                        <svg
                            className="h-6 w-6 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
                            />
                        </svg>
                        <span className="font-medium text-lg">Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
