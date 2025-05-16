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
            <div className="row mb-3">
                <div className="col-md-4">
                    <label htmlFor="searchQuery">Search</label>
                    <input
                        type="text"
                        id="searchQuery"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setPageNumber(1);
                        }}
                        className="form-control"
                    />
                </div>
            </div>

            <div className="flex justify-end">
                <table
                    className="table table-bordered"
                    style={{ borderCollapse: "collapse", tableLayout: "fixed", width: "100%", userSelect: "none" }}
                >
                    <thead>
                        <tr>
                            <th
                                className="px-4 py-2"
                                style={{ border: "none", width: "8%", cursor: "pointer" }}
                                onClick={() => {
                                    setSortField("id");
                                    setSortDirection(sortDirection === "ASC" ? "DESC" : "ASC");
                                }}
                            >
                                ID
                            </th>
                            <th
                                className="px-4 py-2"
                                style={{ border: "none", width: "22%", cursor: "pointer" }}
                                onClick={() => {
                                    setSortField("device");
                                    setSortDirection(sortDirection === "ASC" ? "DESC" : "ASC");
                                }}
                            >
                                Device
                            </th>
                            <th
                                className="px-4 py-2"
                                style={{ border: "none", width: "20%", cursor: "pointer" }}
                                onClick={() => {
                                    setSortField("action");
                                    setSortDirection(sortDirection === "ASC" ? "DESC" : "ASC");
                                }}
                            >
                                Action
                            </th>
                            <th
                                className="px-4 py-2"
                                style={{ border: "none", width: "30%", cursor: "pointer" }}
                                onClick={() => {
                                    setSortField("createdAt");
                                    setSortDirection(sortDirection === "ASC" ? "DESC" : "ASC");
                                }}
                            >
                                Created At
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(relay.data) &&
                            relay.data.map((action) => (
                                <tr key={action.id}>
                                    <td className="px-4 py-2" style={{ border: "none" }}>{action.id}</td>
                                    <td className="px-4 py-2" style={{ border: "none" }}>{action.device}</td>
                                    <td className="px-4 py-2" style={{ border: "none" }}>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${action.action === 'ON' || action.action === 'Turn On'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                            }`}>
                                            ● {action.action}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2" style={{ border: "none" }}>
                                        {new Date(action.createdAt).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>


            <div className="d-flex justify-content-between align-items-center mr-[100px]">
                <div className="col-md-2">
                    <div className="d-flex">
                        <label htmlFor="pageSize">Page Size:</label>
                        <select
                            id="pageSize"
                            className="form-control"
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(Number(e.target.value));
                                setPageNumber(1);
                            }}
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option value={20}>20</option>
                        </select>
                    </div>
                </div>

                <div className="col-md-8 d-flex justify-content-end gap-2">
                    {pageNumber > 1 && (
                        <>
                            <button
                                onClick={() => setPageNumber(1)}
                                className="btn btn-outline-primary"
                            >
                                « First
                            </button>
                            <button
                                onClick={() => setPageNumber(pageNumber - 1)}
                                className="btn btn-outline-primary"
                            >
                                ‹ Prev
                            </button>
                        </>
                    )}

                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(page => (page >= pageNumber - 2 && page <= pageNumber + 2))
                        .map(page => (
                            <button
                                key={page}
                                onClick={() => setPageNumber(page)}
                                className={`btn ${pageNumber === page ? "btn-primary" : "btn-outline-primary"}`}
                            >
                                {page}
                            </button>
                        ))}

                    {pageNumber < totalPages && (
                        <>
                            <button
                                onClick={() => setPageNumber(pageNumber + 1)}
                                className="btn btn-outline-primary"
                            >
                                Next ›
                            </button>
                            <button
                                onClick={() => setPageNumber(totalPages)}
                                className="btn btn-outline-primary"
                            >
                                Last »
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ActionHistory;