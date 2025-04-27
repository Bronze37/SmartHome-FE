import '@fortawesome/fontawesome-free/css/all.min.css';

const Cards = () => {
    // Dữ liệu thời tiết fake
    const fakeWeather = {
        location: "Hanoi",
        temperature: 28,
        condition: "Sunny",
        airQuality: "Good",
    };

    return (
        <div className="w-full shadow-md rounded-3xl p-8 mb-6 text-white bg-gradient-to-r from-[#41BED8] to-[#4290E7]">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Hi there! 👋</h2>
                    <p className="text-lg mt-2">Welcome back to your smart home dashboard.</p>
                </div>
                <div className="flex items-center gap-2 text-4xl p-3 rounded-xl bg-[#52A2E9]">
                    <i className="fas fa-sun text-yellow-400"></i>
                    <div className="text-right text-white text-base">
                        <p>{fakeWeather.temperature}°C</p>
                        <p className="text-sm">{fakeWeather.condition}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cards;