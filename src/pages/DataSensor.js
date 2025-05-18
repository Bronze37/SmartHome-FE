import React, { useEffect, useState } from "react";
import Clock from "../components/Clock";
import axios from "axios";
import { use } from "react";

const DataSensor = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [dataSensor, setDataSensor] = useState([]);
    const [type, setType] = useState("all");
    const [query, setQuery] = useState("");
    const [sortField, setSortField] = useState("id");
    const [sortDirection, setSortDirection] = useState("DESC");
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/data_sensors/search",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                        params: {
                            type,
                            query,
                            sortField,
                            sortDirection,
                            pageNumber,
                            pageSize,
                        },
                    }
                );

                if (JSON.stringify(response.data.data) !== JSON.stringify(dataSensor)) {
                    setDataSensor(response.data.data);
                    setTotalPages(response.data.data.metadata.totalPages);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

    }, [pageNumber, pageSize, query, sortField, sortDirection, type]);

    console.log(dataSensor);

    return (
        <div className="p-4">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-md mb-8">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Search Section */}
                        <div className="transform hover:scale-105 transition-all duration-300">
                            <label
                                htmlFor="searchQuery"
                                className="block text-lg font-semibold text-gray-800 mb-3"
                            >
                                <span className="flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                    placeholder="Type to search..."
                                    className="w-full px-6 py-3 bg-white border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-300 shadow-sm"
                                />
                            </div>
                        </div>

                        {/* Filter Section */}
                        <div className="transform hover:scale-105 transition-all duration-300">
                            <label
                                htmlFor="typeQuery"
                                className="block text-lg font-semibold text-gray-800 mb-3"
                            >
                                <span className="flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                    </svg>
                                    Filter
                                </span>
                            </label>
                            <select
                                id="typeQuery"
                                value={type}
                                onChange={(e) => {
                                    setType(e.target.value);
                                    setPageNumber(1);
                                }}
                                className="w-full px-6 py-3 bg-white border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-300 shadow-sm appearance-none cursor-pointer"
                            >
                                <option value="all" className="py-2">All Devices</option>
                                <option value="temperature" className="py-2">Temperature Sensors</option>
                                <option value="humidity" className="py-2">Humidity Sensors</option>
                                <option value="light" className="py-2">Light Sensors</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Table Section */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gradient-to-r from-blue-50 to-indigo-50">
                                <th
                                    className="px-6 py-4 text-left text-sm font-semibold text-gray-700 hover:bg-blue-100 transition-colors duration-200 cursor-pointer"
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
                                    className="px-6 py-4 text-left text-sm font-semibold text-gray-700 hover:bg-blue-100 transition-colors duration-200 cursor-pointer"
                                    style={{ width: "18%" }}
                                    onClick={() => {
                                        setSortField("temperature");
                                        setSortDirection(sortDirection === "ASC" ? "DESC" : "ASC");
                                    }}
                                >
                                    <div className="flex items-center justify-center space-x-1">
                                        <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                        <span>Temperature</span>
                                    </div>
                                </th>
                                <th
                                    className="px-6 py-4 text-left text-sm font-semibold text-gray-700 hover:bg-blue-100 transition-colors duration-200 cursor-pointer"
                                    style={{ width: "18%" }}
                                    onClick={() => {
                                        setSortField("humidity");
                                        setSortDirection(sortDirection === "ASC" ? "DESC" : "ASC");
                                    }}
                                >
                                    <div className="flex items-center justify-center space-x-1">
                                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                        </svg>
                                        <span>Humidity</span>
                                    </div>
                                </th>
                                <th
                                    className="px-6 py-4 text-left text-sm font-semibold text-gray-700 hover:bg-blue-100 transition-colors duration-200 cursor-pointer"
                                    style={{ width: "18%" }}
                                    onClick={() => {
                                        setSortField("light");
                                        setSortDirection(sortDirection === "ASC" ? "DESC" : "ASC");
                                    }}
                                >
                                    <div className="flex items-center justify-center space-x-1">
                                        <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                        <span>Light</span>
                                    </div>
                                </th>
                                <th
                                    className="px-6 py-4 text-left text-sm font-semibold text-gray-700 hover:bg-blue-100 transition-colors duration-200 cursor-pointer"
                                    style={{ width: "38%" }}
                                    onClick={() => {
                                        setSortField("createdAt");
                                        setSortDirection(sortDirection === "ASC" ? "DESC" : "ASC");
                                    }}
                                >
                                    <div className="flex items-center justify-center space-x-1">
                                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>Created At</span>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {Array.isArray(dataSensor.data) &&
                                dataSensor.data.map((sensor) => (
                                    <tr key={sensor.id} className="hover:bg-gray-50 transition-colors duration-200">
                                        <td className="px-6 py-4 text-sm text-gray-600">{sensor.id}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center">
                                                <span className="text-sm font-medium text-gray-900">{sensor.temperature}°C</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center">
                                                <span className="text-sm font-medium text-gray-900">{sensor.humidity}%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center">
                                                <span className="text-sm font-medium text-gray-900">{sensor.light} lux</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {new Date(sensor.createdAt).toLocaleString()}
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
                                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
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
                                        className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                    >
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                                        </svg>
                                        First
                                    </button>
                                    <button
                                        onClick={() => setPageNumber(pageNumber - 1)}
                                        className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
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
                                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
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
                                        className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                    >
                                        Next
                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => setPageNumber(totalPages)}
                                        className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
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

export default DataSensor;