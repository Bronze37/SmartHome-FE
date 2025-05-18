import React, { useEffect, useState, useRef } from "react";
import Fan_off from "../img/fan_off.png";
import Fan_on from "../img/fan_on.gif";
import Air_on from "../img/air_on.jpg";
import Air_off from "../img/air_off.jpg";
import Swal from "sweetalert2";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import io from "socket.io-client";

const Led = () => {
    const [isCheckedLight, setIsCheckedLight] = useState(null);
    const [isCheckedAirCon, setIsCheckedAirCon] = useState(null);
    const [isCheckedFan, setIsCheckedFan] = useState(null);

    const socket = io("http://localhost:8688");

    const [relay1, setRelay1] = useState(null);
    const [relay2, setRelay2] = useState(null);
    const [relay3, setRelay3] = useState(null);

    const [tempCard, setTempCard] = useState(null);
    const [humiCard, setHumiCard] = useState(null);
    const [lightCard, setLightCard] = useState(null);

    const lastAlertTime = useRef(0);

    useEffect(() => {
        socket.on("relay_1", (data_received) => {
            setRelay1(data_received);
            if (data_received === 0) {
                setIsCheckedLight(false);
            } else if (data_received === 1) {
                setIsCheckedLight(true);
            }
        });

        socket.on("relay_3", (data_received) => {
            setRelay3(data_received);
            if (data_received === 0) {
                setIsCheckedAirCon(false);
            } else if (data_received === 1) {
                setIsCheckedAirCon(true);
            }
        });

        socket.on("relay_2", (data_received) => {
            setRelay2(data_received);
            if (data_received === 0) {
                setIsCheckedFan(false);
            } else if (data_received === 1) {
                setIsCheckedFan(true);
            }
        });

        socket.on("temp", (data) => {
            setTempCard(data);
        });

        socket.on("humi", (data) => {
            setHumiCard(data);
        });

        socket.on("light", (data) => {
            setLightCard(data);
        });

        // Clean up the socket listener when the component unmounts
        return () => {
            socket.disconnect();
        };
    }, []);

    const handleTurnOnLight = () => {
        if (relay1 !== 1) {
            socket.emit("control_relay_1", 1);
        }
    };

    const handleTurnOffLight = () => {
        if (relay1 !== 0) {
            socket.emit("control_relay_1", 0);
        }
    };

    const handleTurnOnAirCon = () => {
        if (relay3 !== 1) {
            socket.emit("control_relay_3", 1);
        }
    };

    const handleTurnOffAirCon = () => {
        if (relay3 !== 0) {
            socket.emit("control_relay_3", 0);
        }
    };

    const handleTurnOnFan = () => {
        if (relay2 !== 1) {
            socket.emit("control_relay_2", 1);
        }
    };

    const handleTurnOffFan = () => {
        if (relay2 !== 0) {
            socket.emit("control_relay_2", 0);
        }
    };

    const sendWarningEmail = (type, value) => {
        axios
            .post(
                "http://localhost:8000/api/mail/send-warning",
                {
                    type: type,
                    value: value,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            )
            .then((response) => {
                console.log("Warning email sent successfully:", response);
            })
            .catch((error) => {
                console.error("Error sending warning email:", error);
            });
    };

    // Hàm cảnh báo nhiệt độ cao
    useEffect(() => {
        const now = Date.now();
        if (tempCard > 35 && now - lastAlertTime.current > 5000) {
            Swal.fire({
                title: "Cảnh báo!",
                text: "Nhiệt độ cao!",
                icon: "warning",
                confirmButtonText: "OK",
                confirmButtonColor: "#333333",
            });
            sendWarningEmail("temperature", tempCard);
            lastAlertTime.current = now;
        }

        // Hàm cảnh báo độ ẩm cao
        if (humiCard > 80 && now - lastAlertTime.current > 5000) {
            Swal.fire({
                title: "Cảnh báo!",
                text: "Độ ẩm cao!",
                icon: "warning",
                confirmButtonText: "OK",
                confirmButtonColor: "#333333",
            });
            sendWarningEmail("humidity", humiCard);
            lastAlertTime.current = now;
        }

        // Hàm cảnh báo độ sáng cao
        if (lightCard > 1000 && now - lastAlertTime.current > 5000) {
            Swal.fire({
                title: "Cảnh báo!",
                text: "Độ sáng cao!",
                icon: "warning",
                confirmButtonText: "OK",
                confirmButtonColor: "#333333",
            });
            sendWarningEmail("light", lightCard);
            lastAlertTime.current = now;
        }
    }, [tempCard]);

    return (
        <div className="flex flex-col justify-around px-4">
            <div>
                <h1 className="text-gray-400 text-xl font-thin my-3">Data Sensor</h1>
                <div>
                    <div className="flex mb-3">
                        <div
                            className="w-[60px] h-[60px] rounded-2xl mr-4 flex justify-center items-center"
                            style={{ backgroundColor: "#FF9166" }}
                        >
                            <i
                                className="fas fa-thermometer-half text-white"
                                style={{ fontSize: "30px" }}
                            ></i>
                        </div>
                        <div className="flex flex-col justify-evenly align-items-start">
                            <div className="font-bold">Temperature</div>
                            <h5 className="text-xl font-medium leading-tight text-gray-500">
                                {tempCard} &deg; C
                            </h5>
                        </div>
                    </div>

                    <div className="flex mb-3">
                        <div
                            className="w-[60px] h-[60px] rounded-2xl mr-4 flex justify-center items-center"
                            style={{ backgroundColor: "#31C6FF" }}
                        >
                            <i
                                className="fas fa-tint text-white"
                                style={{ fontSize: "30px" }}
                            ></i>
                        </div>
                        <div className="flex flex-col justify-evenly align-items-start">
                            <div className="font-bold">Humidity</div>
                            <h5 className="text-xl font-medium leading-tight text-gray-500">
                                {humiCard} %
                            </h5>
                        </div>
                    </div>

                    <div className="flex mb-3">
                        <div
                            className="w-[60px] h-[60px] rounded-2xl mr-4 flex justify-center items-center"
                            style={{ backgroundColor: "#FFCD3E" }}
                        >
                            <i
                                className="fas fa-lightbulb text-white"
                                style={{ fontSize: "30px" }}
                            ></i>
                        </div>
                        <div className="flex flex-col justify-evenly align-items-start">
                            <div className="font-bold">Light</div>
                            <h5 className="text-xl font-medium leading-tight text-gray-500">
                                {lightCard} lux
                            </h5>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h1 className="text-gray-400 text-xl font-thin my-3">Devices</h1>
                <div className="flex mb-3 flex-wrap">
                    <div
                        className="w-[60px] h-[60px] rounded-xl mr-3 mb-3 flex justify-center items-center bg-white shadow-md"
                        onClick={
                            isCheckedFan
                                ? handleTurnOffFan
                                : handleTurnOnFan
                        }
                    >
                        {isCheckedFan ? (
                            <img
                                src={Fan_on}
                                className="object-contain h-[75px]"
                                alt="Fan is on"
                            />
                        ) : (
                            <img
                                src={Fan_off}
                                className="object-contain h-[75px]"
                                alt="Fan is off"
                            />
                        )}
                    </div>

                    <div
                        className="w-[60px] h-[60px] rounded-xl mr-3 flex justify-center items-center bg-white shadow-md"
                        onClick={
                            isCheckedAirCon
                                ? handleTurnOffAirCon
                                 : handleTurnOnAirCon
                        }
                    >
                        {isCheckedAirCon ? (
                            <img
                                src={Air_on}
                                className="object-contain h-[75px]"
                                alt="AirConditioner is on"
                            />
                        ) : (
                            <img
                                src={Air_off}
                                className="object-contain h-[75px]"
                                alt="AirConditioner is off"
                            />
                        )}
                    </div>

                    <div
                        className="w-[60px] h-[60px] rounded-xl flex justify-center items-center bg-white shadow-md"
                        onClick={
                            isCheckedLight
                                ? handleTurnOffLight
                                : handleTurnOnLight
                        }
                    >
                        {isCheckedLight ? (
                            <img
                                src="https://webvn.com/wp-content/uploads/2015/08/pic_bulbon.gif"
                                className="object-contain h-[40px]"
                                alt="AirConditioner is on"
                            />
                        ) : (
                            <img
                                src="https://www.w3schools.com/js/pic_bulboff.gif"
                                className="object-contain h-[40px]"
                                alt="AirConditioner is off"
                            />
                        )}
                    </div>

                    <div
                        className="w-[60px] h-[60px] rounded-xl flex justify-center items-center bg-white border-2 border-dashed xl:ml-3"
                    >
                        <i
                            className="fas fa-plus text-gray-300"
                            style={{ fontSize: "30px" }}
                        ></i>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </div>
    );
};

export default Led;
