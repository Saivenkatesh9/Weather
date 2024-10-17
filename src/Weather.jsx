import React, { useState } from 'react';
import './weather.css';

const Weather = () => {
    let [search, setsearch] = useState({});
    let [wea, setwea] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    let api = {
        key: "329175032e839ce57dbd6d618a542604",
        website: "https://api.openweathermap.org/data/2.5/weather"
    };

    async function getweather(e) {
        setIsLoading(true);
        const response = await fetch(`${api.website}?q=${search}&appid=${api.key}`);
        const data = await response.json();
        setwea(data);
        setIsLoading(false);
    }

    const cli = (e) => {
        if (e.key === 'Enter') {
            getweather();
            e.target.value = "";
        }
    }

    return (
        <div className="container">
            <input type="text" placeholder="Enter City Name" onChange={(e) => setsearch(e.target.value)} onKeyDown={cli} />
            <button onClick={getweather}>Click here to display weather</button>
            <br />
            <br />
            <div id='mat'>
            {isLoading ? (
                <h2>Loading...</h2>
            ) : ((wea.main !== undefined) ? (
                <h1>
                    Weather Location: {wea.name} <br />
                    Longitude: {wea.coord.lon} <br />
                    Latitude: {wea.coord.lat} <br />
                    Humidity: {wea.main.humidity} <br />
                    Temp: {wea.main.temp}
                </h1>
            ) : (
                (wea.cod === '404') ? (
                    <h1 className="red">Data Not Found</h1>
                ) : ("")
            ))}
            </div>
        </div>
    );
};

export default Weather;
