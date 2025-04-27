import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useEffect, useState } from 'react';

const Cards = () => {
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
        rainy: ['rain', 'rainy', 'drizzle', 'showering', 'pouring', 'heavy rain', 'light rain', 'downpour', 'thunderstorm', 'torrential rain'],
        cloudy: ['cloud', 'cloudy', 'overcast', 'partly cloudy', 'mostly cloudy', 'grey sky', 'dull', 'foggy', 'hazy', 'misty', 'gloomy'],
    };

    return (
        <div className={`w-full shadow-md rounded-3xl p-8 mb-6 text-white bg-gradient-to-r ${weather.onDay === 1
            ? 'from-[#41BED8] to-[#4290E7]'
            : 'from-gray-800 to-gray-900'
            }`}>
            <div className="flex justify-between items-center">
                <div className='text-left'>
                <h2 className="text-2xl font-bold">
        {(() => {
            if (weatherIcons.sunny.some(item => weather.condition.trim().toLowerCase().includes(item.toLowerCase()))) {
                return "It's a sunny day! ☀️";
            } else if (weatherIcons.rainy.some(item => weather.condition.trim().toLowerCase().includes(item.toLowerCase()))) {
                return "Don't forget your umbrella! 🌧️";
            } else if (weatherIcons.cloudy.some(item => weather.condition.trim().toLowerCase().includes(item.toLowerCase()))) {
                return "It's a bit cloudy today. ☁️";
            } else {
                return "Welcome back! 👋";
            }
        })()}
    </h2>
    <p className="text-lg mt-2">
        {(() => {
            if (weather.temperature !== null && weather.temperature !== "N/A") {
                if (weather.temperature > 30) {
                    return "It's quite hot outside, stay hydrated! 💧";
                } else if (weather.temperature < 15) {
                    return "It's chilly, wear something warm! 🧥";
                } else {
                    return "The weather is pleasant, enjoy your day! 😊";
                }
            } else {
                return "Welcome back to your smart home dashboard.";
            }
        })()}
    </p>
                </div>
                <div className={`flex items-center gap-2 text-4xl p-3 rounded-xl ${weather.onDay === 1 ? 'bg-[#52A2E9]' : 'bg-gray-700'
                    }`}>
                    {(() => {
                        if (weather.onDay === 0) {
                            return <i className="fas fa-moon text-yellow-400"></i>
                        } else {
                            if (weatherIcons.sunny.some(item => weather.condition.trim().toLowerCase().includes(item.toLowerCase()))) {
                                return <i className="fas fa-sun text-yellow-400"></i>;
                            } else if (weatherIcons.rainy.some(item => weather.condition.trim().toLowerCase().includes(item.toLowerCase()))) {
                                return <i className="fas fa-cloud-rain text-white"></i>;
                            } else {
                                return <i className="fas fa-cloud text-white"></i>;
                            }
                        }
                    })()}
                    <div className="text-right text-white text-base ml-3">
                        <p>{weather.temperature}°C</p>
                        <p className="text-sm">{weather.condition}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cards;