import React, { useEffect, useState } from 'react';
import Fan_off from '../img/fan_off.png';
import Fan_on from '../img/fan_on.gif';
import Air_on from '../img/air_on.jpg';
import Air_off from '../img/air_off.jpg';

import io from 'socket.io-client';

const Led = () => {
    const [isCheckedLight, setIsCheckedLight] = useState(null);
    const [isCheckedAirCon, setIsCheckedAirCon] = useState(null);
    const [isCheckedFan, setIsCheckedFan] = useState(null);

    const socket = io('http://localhost:8688');

    const [relay1, setRelay1] = useState(null);
    const [relay2, setRelay2] = useState(null);
    const [relay3, setRelay3] = useState(null);

    useEffect(() => {
        socket.on('relay_1', (data_received) => {
            setRelay1(data_received);
            if (data_received === 0) {
                setIsCheckedLight(false);
            } else if (data_received === 1) {
                setIsCheckedLight(true);
            }
        });

        socket.on('relay_3', (data_received) => {
            setRelay3(data_received);
            if (data_received === 0) {
                setIsCheckedAirCon(false);
            } else if (data_received === 1) {
                setIsCheckedAirCon(true);
            }
        });

        socket.on('relay_2', (data_received) => {
            setRelay2(data_received);
            if (data_received === 0) {
                setIsCheckedFan(false);
            } else if (data_received === 1) {
                setIsCheckedFan(true);
            }
        });

        // Clean up the socket listener when the component unmounts
        return () => {
            socket.disconnect();
        };
    }, []);

    const handleTurnOnLight = () => {
        if (relay1 !== 1) {
            socket.emit('control_relay_1', 1);
        }
    };

    const handleTurnOffLight = () => {
        if (relay1 !== 0) {
            socket.emit('control_relay_1', 0);
        }
    };

    const handleTurnOnAirCon = () => {
        if (relay3 !== 1) {
            socket.emit('control_relay_3', 1);
        }
    };

    const handleTurnOffAirCon = () => {
        if (relay3 !== 0) {
            socket.emit('control_relay_3', 0);
        }
    };

    const handleTurnOnFan = () => {
        if (relay2 !== 1) {
            socket.emit('control_relay_2', 1);
        }
    };

    const handleTurnOffFan = () => {
        if (relay2 !== 0) {
            socket.emit('control_relay_2', 0);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col justify-center items-center bg-white rounded-2xl shadow-md p-6 border border-gray-200">
                {isCheckedLight ? (
                    <img
                        src="https://webvn.com/wp-content/uploads/2015/08/pic_bulbon.gif"
                        className="h-20 mb-4"
                        alt="Light is on"
                    />
                ) : (
                    <img
                        src="https://www.w3schools.com/js/pic_bulboff.gif"
                        className="h-20 mb-4"
                        alt="Light is off"
                    />
                )}
                <button
                    className={`w-24 h-10 rounded-lg font-semibold transition-transform transform hover:scale-105 ${isCheckedLight
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-300 text-gray-700'
                        }`}
                    onClick={isCheckedLight ? handleTurnOffLight : handleTurnOnLight}
                >
                    {isCheckedLight ? 'ON' : 'OFF'}
                </button>
            </div>

            <div className="flex flex-col justify-center items-center bg-white rounded-2xl shadow-md p-6 border border-gray-200">
                {isCheckedAirCon ? (
                    <img
                        src={Air_on}
                        className="h-20 mb-4"
                        alt="AirConditioner is on"
                    />
                ) : (
                    <img
                        src={Air_off}
                        className="h-20 mb-4"
                        alt="AirConditioner is off"
                    />
                )}
                <button
                    className={`w-24 h-10 rounded-lg font-semibold transition-transform transform hover:scale-105 ${isCheckedAirCon
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-300 text-gray-700'
                        }`}
                    onClick={isCheckedAirCon ? handleTurnOffAirCon : handleTurnOnAirCon}
                >
                    {isCheckedAirCon ? 'ON' : 'OFF'}
                </button>
            </div>

            <div className="flex flex-col justify-center items-center bg-white rounded-2xl shadow-md p-6 border border-gray-200">
                {isCheckedFan ? (
                    <img
                        src={Fan_on}
                        className="h-20 mb-4"
                        alt="Fan is on"
                    />
                ) : (
                    <img
                        src={Fan_off}
                        className="h-20 mb-4"
                        alt="Fan is off"
                    />
                )}
                <button
                    className={`w-24 h-10 rounded-lg font-semibold transition-transform transform hover:scale-105 ${isCheckedFan
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-300 text-gray-700'
                        }`}
                    onClick={isCheckedFan ? handleTurnOffFan : handleTurnOnFan}
                >
                    {isCheckedFan ? 'ON' : 'OFF'}
                </button>
            </div>
        </div>
    );
};

export default Led;
