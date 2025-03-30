import React, { useState, useEffect } from 'react';
import sunnyIcon from '../assets/icons/sunny.png';
import rainyIcon from '../assets/icons/rainy.png';
import cloudyIcon from '../assets/icons/cloudy.png';
import nightIcon from '../assets/icons/night.png';

const Data = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(
                    `https://api.weatherapi.com/v1/current.json?key=ecd20555e6714771bbc220032252703&q=Hanoi`
                );
                if (!response.ok) throw new Error("Không thể lấy dữ liệu");
                const data = await response.json();
                setWeather(data.current);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    const weatherIcons = {
        sunny: ['sun', 'sunny', 'clear', 'bright', 'radiant', 'beaming', 'golden'],
        rainy: ['rain', 'rainy', 'drizzling', 'showering', 'pouring', 'heavy rain', 'light rain', 'downpour', 'thunderstorm', 'torrential rain'],
        cloudy: ['cloud', 'cloudy', 'overcast', 'partly cloudy', 'mostly cloudy', 'grey sky', 'dull', 'foggy', 'hazy', 'misty', 'gloomy'],
    };

    const getWeatherIcon = (condition) => {
        const text = condition.condition.text.toLowerCase();
        console.log(text); // Debugging line to check the condition text

        if (condition.is_day === 1) {
            if (weatherIcons.sunny.some(item => text.includes(item))) return sunnyIcon;
            if (weatherIcons.rainy.some(item => text.includes(item))) return rainyIcon;
            if (weatherIcons.cloudy.some(item => text.includes(item))) return cloudyIcon;
        }

        return nightIcon;
    };


    return (
        <div className="col-12">
            <div className="flex flex-col justify-around items-center rounded-xl bg-white text-gray-700 shadow-md border p-4 h-[200px]">
                {loading ? (
                    <p>Đang tải...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <div className="flex flex-col items-center justify-center">
                        <img src={getWeatherIcon(weather)} alt="weather-icon" className="w-24 h-24" />
                        
                        <p className="text-sm text-gray-500">{weather.condition.text}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Data;
