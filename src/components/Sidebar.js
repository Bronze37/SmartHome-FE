import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className='sticky top-0 left-0 '>
            <div className="z-10 top-0 pb-3 px-6 w-full justify-between h-screen border-r bg-white transition duration-300">
                <div className='flex flex-col justify-between h-screen'>
                    <ul className="space-y-2 tracking-wide mt-8">
                        <li>
                            <NavLink
                                to="/"
                                aria-label="dashboard"
                                className={({ isActive }) =>
                                    isActive
                                        ? 'relative px-4 py-3 flex items-center space-x-4 rounded-lg text-white bg-gradient-to-r from-sky-600 to-cyan-400'
                                        : 'px-4 py-3 flex items-center space-x-4 rounded-md text-gray-700 group'
                                }
                            >
                                <svg
                                    className={({ isActive }) =>
                                        isActive ? 'h-6 w-6 text-white' : 'h-6 w-6 text-gray-700'
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
                                        : 'px-4 py-3 flex items-center space-x-4 rounded-md text-gray-700 group'
                                }
                            >
                                <svg
                                    className={({ isActive }) =>
                                        isActive ? 'h-6 w-6 text-white' : 'h-6 w-6 text-gray-700'
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
                                <span className="group-hover:text-gray-700">Data Sensor</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/actionhistory"
                                className={({ isActive }) =>
                                    isActive
                                        ? 'relative px-4 py-3 flex items-center space-x-4 rounded-lg text-white bg-gradient-to-r from-sky-600 to-cyan-400'
                                        : 'px-4 py-3 flex items-center space-x-4 rounded-md text-gray-700 group'
                                }
                            >
                                <svg
                                    className={({ isActive }) =>
                                        isActive ? 'h-6 w-6 text-white' : 'h-6 w-6 text-gray-700'
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
                                <span className="group-hover:text-gray-700">Action History</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/profile"
                                className={({ isActive }) =>
                                    isActive
                                        ? 'relative px-4 py-3 flex items-center space-x-4 rounded-lg text-white bg-gradient-to-r from-sky-600 to-cyan-400'
                                        : 'px-4 py-3 flex items-center space-x-4 rounded-md text-gray-700 group'
                                }
                            >
                                <svg
                                    className={({ isActive }) =>
                                        isActive ? 'h-6 w-6 text-white' : 'h-6 w-6 text-gray-700'
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
                                <span className="group-hover:text-gray-700">Profile</span>
                            </NavLink>
                        </li>
                    </ul>
                    <div className='relative bottom-10 flex justify-center'>
                        <button
                            onClick={() => {
                                localStorage.removeItem('token');
                                window.location.href = '/login';
                            }}
                            className="px-6 py-3 flex items-center space-x-4 rounded-lg text-white bg-gradient-to-r from-red-500 to-red-400 shadow-lg hover:from-red-600 hover:to-red-800 transition duration-300 transform hover:scale-105"
                        >
                            <svg
                                className="h-6 w-6 text-white"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                stroke-width="2"
                                stroke="currentColor"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <path d="M10 12h10m-5 -5l5 5l-5 5" />
                                <path d="M14 4h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7" />
                            </svg>
                            <span className="font-semibold text-lg">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
