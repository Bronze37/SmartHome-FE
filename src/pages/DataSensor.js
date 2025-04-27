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
    const [softField, setSoftField] = useState("light");
    const [softDirection, setSoftDirection] = useState("ASC");
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
                            softField,
                            softDirection,
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

    }, [pageNumber, pageSize, query, softField, softDirection, type]);

    console.log(dataSensor);

    return (
        <div className="p-4">
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

                <div className="col-md-4">
                    <label htmlFor="typeQuery">Field</label>
                    <select
                        id="typeQuery"
                        value={type}
                        onChange={(e) => {
                            setType(e.target.value);
                            setPageNumber(1);
                        }}
                        className="form-control"
                    >
                        <option value="all">All</option>
                        <option value="temperature">Temperature</option>
                        <option value="humidity">Humidity</option>
                        <option value="light">Light</option>
                    </select>
                </div>
            </div>

            <div className="flex justify-end">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Temperature</th>
                            <th className="px-4 py-2">Humidity</th>
                            <th className="px-4 py-2">Light</th>
                            <th className="px-4 py-2">Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(dataSensor.data) &&
                            dataSensor.data.map((sensor) => (
                                <tr key={sensor.id}>
                                    <td className="border px-4 py-2">{sensor.id}</td>
                                    <td className="border px-4 py-2">{sensor.temperature}</td>
                                    <td className="border px-4 py-2">{sensor.humidity}</td>
                                    <td className="border px-4 py-2">{sensor.light}</td>
                                    <td className="border px-4 py-2">
                                        {new Date(sensor.createdAt).toLocaleString()}
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

export default DataSensor;