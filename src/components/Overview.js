import React, { useState, useEffect } from 'react';
import sunnyImage from '../assets/images/background2.jpg';
import tempIcon from '../assets/icons/temp.png';
import humidityIcon from '../assets/icons/humidity.png';
import rainyImage from '../assets/images/mua.jpg';
import cloudyImage from '../assets/images/may.jpg';
import nightImage from '../assets/images/night.jpg';

const Overview = () => {
    const [time, setTime] = useState(new Date());
    const [weather, setWeather] = useState({
        temperature: null,
        humidity: null,
        onDay: 'Đang tải...',
        condition: 'Đang tải...',
    });

    const API_KEY = 'ecd20555e6714771bbc220032252703'; // Thay bằng API key của bạn
    const CITY = 'Hanoi'; // Thành phố bạn muốn lấy thông tin thời tiết

    useEffect(() => {
        // Cập nhật thời gian mỗi giây
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        // Lấy thông tin thời tiết từ WeatherAPI
        const fetchWeather = async () => {
            try {
                const response = await fetch(
                    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${CITY}`
                );
                const data = await response.json();
                setWeather({
                    temperature: data.current.temp_c,
                    humidity: data.current.humidity,
                    onDay: data.current.is_day,
                    condition: data.current.condition.text,
                });
            } catch (error) {
                console.error('Lỗi khi lấy thông tin thời tiết:', error);
                setWeather({
                    temperature: 'N/A',
                    humidity: 'N/A',
                    onDay: 'Không xác định',
                    condition: 'Không thể lấy dữ liệu',
                });
            }
        };

        fetchWeather();

        return () => clearInterval(timer); // Dọn dẹp timer khi component bị unmount
    }, []);

    const weatherIcons = {
        sunny: ['sun', 'sunny', 'clear', 'bright', 'radiant', 'beaming', 'golden'],
        rainy: ['rain', 'rainy', 'drizzling', 'showering', 'pouring', 'heavy rain', 'light rain', 'downpour', 'thunderstorm', 'torrential rain'],
        cloudy: ['cloud', 'cloudy', 'overcast', 'partly cloudy', 'mostly cloudy', 'grey sky', 'dull', 'foggy', 'hazy', 'misty', 'gloomy'],
    };

    const getWeatherIcon = (weather) => {
        if (weather.onDay === 1) {
            if (weatherIcons.sunny.some(item => weather.condition.includes(item))) return sunnyImage;
            if (weatherIcons.rainy.some(item => weather.condition.includes(item))) return rainyImage;
            if (weatherIcons.cloudy.some(item => weather.condition.includes(item))) return cloudyImage;
        }
        return nightImage;
    };

    return (
        <div className="col-12 h-full">
            <div
                className="flex flex-col justify-around items-center rounded-xl text-gray-700 border h-full p-4 relative"
                style={{
                    backgroundImage: `url(${getWeatherIcon(weather)})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className='absolute top-4 left-4 flex gap-2'>
                    <div className="bg-white bg-opacity-70 p-2 rounded-md shadow-md flex items-center gap-2">
                        <img src={tempIcon} alt="Temperature Icon" className="w-4 h-4" />
                        <p className="text-sm font-semibold">{weather.temperature} °C</p>
                    </div>
                    <div className="bg-white bg-opacity-70 p-2 rounded-md shadow-md flex items-center gap-2">
                        <img src={humidityIcon} alt="Temperature Icon" className="w-4 h-4" />
                        <p className="text-sm font-semibold">{weather.humidity} %</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;