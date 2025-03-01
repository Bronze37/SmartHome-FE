import React, { useState, useEffect } from 'react';
import Cards from '../components/Cards';
import Led from '../components/Led';
import DataChart from '../components/DataChart';

const Dashboard = () => {
    return (
        <div>
            <hr className="mr-[100px]" />

            <div className="mr-[100px] mt-10">
                <Cards />
            </div>

            <div className="mt-[40px] mr-[120px] flex justify-around items-center">
                <div className="w-[70%]">
                    <DataChart />
                </div>
                <div className="w-[30%]">
                    <Led />
                </div>
            </div>

            
        </div>
    );
};

export default Dashboard;