import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sticky top-0 left-0 h-screen text-white shadow-lg" style={{ backgroundColor: '#24204B' }}>
            <div className="flex flex-col justify-between h-full px-6 py-4">
                

                {/* Navigation Links */}
                <ul className="space-y-4">
                    <li>
                        <NavLink
                            to="/"
                            aria-label="dashboard"
                            className={({ isActive }) =>
                                isActive
                                    ? 'flex items-center space-x-4 px-4 py-3 rounded-lg bg-cyan-500 text-white shadow-md'
                                    : 'flex items-center space-x-4 px-4 py-3 rounded-lg hover:bg-gray-700 hover:text-cyan-400 transition'
                            }
                            
                        >
                            <svg
                                className="h-6 w-6"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <polyline points="5 12 3 12 12 3 21 12 19 12" />
                                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                                <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                            </svg>
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/datasensor"
                            className={({ isActive }) =>
                                isActive
                                    ? 'flex items-center space-x-4 px-4 py-3 rounded-lg bg-cyan-500 text-white shadow-md'
                                    : 'flex items-center space-x-4 px-4 py-3 rounded-lg hover:bg-gray-700 hover:text-cyan-400 transition'
                            }
                        >
                            <svg
                                className="h-6 w-6"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
                                <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
                            </svg>
                            <span>Data Sensor</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/actionhistory"
                            className={({ isActive }) =>
                                isActive
                                    ? 'flex items-center space-x-4 px-4 py-3 rounded-lg bg-cyan-500 text-white shadow-md'
                                    : 'flex items-center space-x-4 px-4 py-3 rounded-lg hover:bg-gray-700 hover:text-cyan-400 transition'
                            }
                        >
                            <svg
                                className="h-6 w-6"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <polyline points="16 3 20 7 16 11" />
                                <line x1="10" y1="7" x2="20" y2="7" />
                                <polyline points="8 13 4 17 8 21" />
                                <line x1="4" y1="17" x2="13" y2="17" />
                            </svg>
                            <span>Action History</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                                isActive
                                    ? 'flex items-center space-x-4 px-4 py-3 rounded-lg bg-cyan-500 text-white shadow-md'
                                    : 'flex items-center space-x-4 px-4 py-3 rounded-lg hover:bg-gray-700 hover:text-cyan-400 transition'
                            }
                        >
                            <svg
                                className="h-6 w-6"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <circle cx="12" cy="7" r="4" />
                                <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                            </svg>
                            <span>Profile</span>
                        </NavLink>
                    </li>
                </ul>

                {/* Logout Button */}
                <div className="mt-8">
                    <button
                        onClick={() => {
                            localStorage.removeItem('token');
                            window.location.href = '/login';
                        }}
                        className="w-full flex items-center justify-center space-x-4 px-4 py-3 rounded-lg bg-red-500 text-white shadow-lg hover:bg-red-600 transition transform hover:scale-105"
                    >
                        <svg
                            className="h-6 w-6"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <path d="M10 12h10m-5 -5l5 5l-5 5" />
                            <path d="M14 4h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7" />
                        </svg>
                        <span className="font-semibold">Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;