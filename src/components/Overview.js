import React, { useState, useEffect } from 'react';
import sunnyImage from '../assets/images/background2.jpg';
import tempIcon from '../assets/icons/temp.png';
import humidityIcon from '../assets/icons/humidity.png';
import rainyImage from '../assets/images/mua.jpg';
import cloudyImage from '../assets/images/may.jpg';
import nightImage from '../assets/images/night.jpg';
import { CiTempHigh } from "react-icons/ci";
import io from 'socket.io-client';

const Overview = () => {
    const [tempCard, setTempCard] = useState(null);


    useEffect(() => {
        const socket = io('http://localhost:8688');
        socket.on('temp', (data) => {
            console.log(data);
            setTempCard(data);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div className="col-12 h-full rounded-2xl shadow-xl py-4 px-2 flex flex-col gap-3" style={{ backgroundColor: "#24204B" }}>
            <div className='mb-3 text-white text-bold' style={{ fontWeight: "bold" }}>TEMPERATURE</div>
            <div className="flex items-center justify-center text-white text-2xl font-bold">
            <CiTempHigh size={80} color={"#97C5F3"} />
            
                {tempCard} &deg;C
            </div>
        </div>
    );
};

export default Overview;