import React, { useEffect, useState } from 'react';
import Clock from '../components/Clock';
import axios from 'axios';

const ActionHistory = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [relay, setRelay] = useState([]);
    const [query, setQuery] = useState("");
    const [sortField, setSortField] = useState("id");
    const [sortDirection, setSortDirection] = useState("DESC");
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/history_actions/search",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                        params: {
                            query,
                            sortField,
                            sortDirection,
                            pageNumber,
                            pageSize,
                        },
                    }
                );

                if (JSON.stringify(response.data.data) !== JSON.stringify(relay)) {
                    setRelay(response.data.data);
                    setTotalPages(response.data.data.metadata.totalPages);
                }
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        };

        fetchData();
    }, [pageNumber, pageSize, query, sortField, sortDirection]);

    return (
        <div className='p-4'>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl shadow-md mb-8">
                <div className="max-w-4xl mx-auto">
                    <div className="transform hover:scale-105 transition-all duration-300">
                        <label
                            htmlFor="searchQuery"
                            className="block text-lg font-semibold text-gray-800 mb-3"
                        >
                            <span className="flex items-center">
                                <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                Search
                            </span>
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                id="searchQuery"
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    setPageNumber(1);
                                }}
                                placeholder="Search by device name or action..."
                                className="w-full px-6 py-3 bg-white border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 shadow-sm"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Table Section */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gradient-to-r from-purple-50 to-pink-50">
                                <th
                                    className="px-6 py-4 text-left text-sm font-semibold text-gray-700 hover:bg-purple-100 transition-colors duration-200 cursor-pointer"
                                    style={{ width: "8%" }}
                                    onClick={() => {
                                        setSortField("id");
                                        setSortDirection(sortDirection === "ASC" ? "DESC" : "ASC");
                                    }}
                                >
                                    <div className="flex items-center justify-center space-x-1">
                                        <span>ID</span>
                                    </div>
                                </th>
                                <th
                                    className="px-6 py-4 text-left text-sm font-semibold text-gray-700 hover:bg-purple-100 transition-colors duration-200 cursor-pointer"
                                    style={{ width: "22%" }}
                                    onClick={() => {
                                        setSortField("device");
                                        setSortDirection(sortDirection === "ASC" ? "DESC" : "ASC");
                                    }}
                                >
                                    <div className="flex items-center justify-center space-x-1">
                                        <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        <span>Device</span>
                                    </div>
                                </th>
                                <th
                                    className="px-6 py-4 text-left text-sm font-semibold text-gray-700 hover:bg-purple-100 transition-colors duration-200 cursor-pointer"
                                    style={{ width: "20%" }}
                                    onClick={() => {
                                        setSortField("action");
                                        setSortDirection(sortDirection === "ASC" ? "DESC" : "ASC");
                                    }}
                                >
                                    <div className="flex items-center justify-center space-x-1">
                                        <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        <span>Action</span>
                                    </div>
                                </th>
                                <th
                                    className="px-6 py-4 text-left text-sm font-semibold text-gray-700 hover:bg-purple-100 transition-colors duration-200 cursor-pointer"
                                    style={{ width: "30%" }}
                                    onClick={() => {
                                        setSortField("createdAt");
                                        setSortDirection(sortDirection === "ASC" ? "DESC" : "ASC");
                                    }}
                                >
                                    <div className="flex items-center justify-center space-x-1">
                                        <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>Created At</span>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {Array.isArray(relay.data) &&
                                relay.data.map((action) => (
                                    <tr key={action.id} className="hover:bg-gray-50 transition-colors duration-200">
                                        <td className="px-6 py-4 text-sm text-gray-600">{action.id}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center">
                                                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                                                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                    </svg>
                                                </div>
                                                <span className="text-sm font-medium text-gray-900">{action.device}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${action.action === 'ON' || action.action === 'Turn On'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                }`}>
                                                <span className={`w-2 h-2 rounded-full mr-2 ${action.action === 'ON' || action.action === 'Turn On'
                                                        ? 'bg-green-500'
                                                        : 'bg-red-500'
                                                    }`}></span>
                                                {action.action}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {new Date(action.createdAt).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Section */}
                <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        {/* Page Size Selector */}
                        <div className="flex items-center space-x-3">
                            <label htmlFor="pageSize" className="text-sm font-medium text-gray-700">
                                Rows per page:
                            </label>
                            <div className="relative">
                                <select
                                    id="pageSize"
                                    value={pageSize}
                                    onChange={(e) => {
                                        setPageSize(Number(e.target.value));
                                        setPageNumber(1);
                                    }}
                                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                                >
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={15}>15</option>
                                    <option value={20}>20</option>
                                </select>
                            </div>
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center space-x-2">
                            {/* First & Previous */}
                            {pageNumber > 1 && (
                                <>
                                    <button
                                        onClick={() => setPageNumber(1)}
                                        className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                                    >
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                                        </svg>
                                        First
                                    </button>
                                    <button
                                        onClick={() => setPageNumber(pageNumber - 1)}
                                        className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                                    >
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                        </svg>
                                        Prev
                                    </button>
                                </>
                            )}

                            {/* Page Numbers */}
                            <div className="flex items-center space-x-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1)
                                    .filter(page => (page >= pageNumber - 2 && page <= pageNumber + 2))
                                    .map(page => (
                                        <button
                                            key={page}
                                            onClick={() => setPageNumber(page)}
                                            className={`inline-flex items-center justify-center w-8 h-8 text-sm font-medium rounded-lg transition-colors duration-200 ${pageNumber === page
                                                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                                                    : 'text-gray-700 hover:bg-gray-100'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                            </div>

                            {/* Next & Last */}
                            {pageNumber < totalPages && (
                                <>
                                    <button
                                        onClick={() => setPageNumber(pageNumber + 1)}
                                        className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                                    >
                                        Next
                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => setPageNumber(totalPages)}
                                        className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                                    >
                                        Last
                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActionHistory;