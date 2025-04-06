import React from 'react';
import Cards from '../components/Cards';
import Led from '../components/Led';
import DataChart from '../components/DataChart';
import Overview from '../components/Overview';
import Data from '../components/Data';

const Dashboard = () => {
    return (
        <div className="grid grid-cols-12 gap-6 py-4 min-h-screen">
            {/* Main Content */}
            <div className="col-span-8 space-y-6">
                {/* Overview and Data */}
                <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-2 bg-transparent">
                        <Data />
                    </div>
                    <div className="col-span-1 bg-transparent">
                        <Overview />
                    </div>
                </div>

                {/* LED Section */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <Led />
                </div>

                {/* Data Chart */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <DataChart />
                </div>
            </div>

            {/* Sidebar */}
            <div className="col-span-4 space-y-6">

                {/* Cards */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <Cards />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;