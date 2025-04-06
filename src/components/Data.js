import React, { useState, useEffect } from "react";
import sunnyIcon from "../assets/icons/sunny.png";
import rainyIcon from "../assets/icons/rainy.png";
import cloudyIcon from "../assets/icons/cloudy.png";
import nightIcon from "../assets/icons/night.png";

const Data = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_KEY = 'ecd20555e6714771bbc220032252703'; // Thay bằng API key của bạn
    const CITY = 'Hanoi'; // Thành phố bạn muốn lấy thông tin thời tiết

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(
                    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${CITY}`
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
        sunny: ["sun", "sunny", "clear"],
        rainy: ["rain", "rainy", "drizzle", "shower", "storm"],
        cloudy: ["cloud", "cloudy", "overcast", "misty"],
    };

    const getWeatherIcon = (condition) => {
        const text = condition.condition.text.toLowerCase();
        if (condition.is_day === 1) {
            if (weatherIcons.sunny.some((item) => text.includes(item))) return sunnyIcon;
            if (weatherIcons.rainy.some((item) => text.includes(item))) return rainyIcon;
            if (weatherIcons.cloudy.some((item) => text.includes(item))) return cloudyIcon;
        }
        return nightIcon;
    };

    return (
        <div className="p-6 text-white rounded-2xl shadow-xl" style={{ backgroundColor: "#24204B" }}>
            <div className="text-left">
                <div className="text-2xl font-bold">Hi {localStorage.getItem("name") }!</div>
                <div className="text-lg font-bold">Welcome you to IoT Dashboard!</div>
            </div>

            {/* Thông tin thời tiết */}
            <div className="w-full flex justify-center">
                {loading ? (
                    <div className="flex flex-col items-center">
                        <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-3 text-lg font-semibold">Đang tải...</p>
                    </div>
                ) : error ? (
                    <p className="text-lg font-semibold text-red-500">{error}</p>
                ) : (
                    <div className="flex items-center justify-between w-full">

                        <div className="flex flex-col items-start">
                            <p className="text-lg font-semibold">{weather.temp_c}°C</p>
                            <p>Outdoor Temperature</p>
                            <p className="text-sm">{weather.condition.text}</p>
                        </div>
                        <img src={getWeatherIcon(weather)} alt="weather-icon" className="w-24 h-24 drop-shadow-lg" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Data;
