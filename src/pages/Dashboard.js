import React, { useState, useEffect } from 'react';
import Cards from '../components/Cards';
import Led from '../components/Led';
import DataChart from '../components/DataChart';
import Overview from '../components/Overview';
import Data from '../components/Data';

const Dashboard = () => {
    return (
        <div className='row'>
            <div className='col-8'>
                <div className='row my-3'>
                    <div className='col-8'>
                        <Overview />
                    </div>
                    <div className='col-4'>
                        <Data />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <Led />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12 mt-3'>
                        <DataChart />
                    </div>
                </div>
            </div>
            <div className='col-4'>
                <div className='row'>
                    <div className='col-12'>Dong ho</div>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <Cards />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;