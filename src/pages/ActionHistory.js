import React, { useEffect, useState } from 'react';
import Clock from '../components/Clock';
import axios from 'axios';

const ActionHistory = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [relay, setRelay] = useState([]);
    const [query, setQuery] = useState("");
    const [softField, setSoftField] = useState("id");
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
                            softField,
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
    }, [pageNumber, pageSize, query, softField]);

    return (
        <div>
            <strong className="h-[90px] border-b mr-[100px] flex justify-start items-center">
                <h1>ACTION HISTORY</h1>
                <Clock />
            </strong>

            <hr className="mr-[100px]" />

            <br></br>

            <div className="row mb-3 mr-[100px]">
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

            <div className="flex justify-end mr-[100px]">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Device</th>
                            <th className="px-4 py-2">Action</th>
                            <th className="px-4 py-2">Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(relay.data) &&
                            relay.data.map((action) => (
                                <tr key={action.id}>
                                    <td className="border px-4 py-2">{action.id}</td>
                                    <td className="border px-4 py-2">{action.device}</td>
                                    <td className="border px-4 py-2">{action.action}</td>
                                    <td className="border px-4 py-2">
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