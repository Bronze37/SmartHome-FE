import React, { useState, useEffect } from 'react';
import Cards from '../components/Cards';
import Led from '../components/Led';
import DataChart from '../components/DataChart';
import Clock from '../components/Clock';

const Dashboard = () => {
    return (
        <div>
            <div className="flex justify-around">
                <div className="w-[75%] h-screen overflow-y-auto p-3">
                    <Cards />
                    <DataChart />
                </div>
                <div className="w-[25%] h-screen overflow-y-auto" style={{ backgroundColor: "#F6F5FA" }}>
                    <Led />
                </div>
            </div>


        </div>
    );
};

export default Dashboard;