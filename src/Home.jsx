import React, { useEffect, useState } from 'react';
import './Home.css';
import Icons from './components/icons';

const Home = () => {

    // Api Key for the Api string
    const apiKey = '383824eaecc7d80737ecf7a5cf964baa';

    // Data for the app
    const [searchQuery, setSearchQuery] = useState('');
    const [city, setCity] = useState('Puebla');
    const [temperature, setTemperature] = useState(0);
    const [max, setMax] = useState(0);
    const [min, setMin] = useState(0);
    const [feel, setFeel] = useState(0);
    const [wind, setWind] = useState(0);
    const [description, setDescription] = useState('');
    const [humidity, setHumidity] = useState(0);

    // Data returned for function getGeo
    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);


    // Function to get the latitude and longitude
    const getGeo = async (city, limit) => {
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${apiKey}`;

        // Try get the data from the Api and save data
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data)
            // Values are asigned to variables
            setLat(data[0].lat);
            setLon(data[0].lon);
        }
        catch (error) {
            console.log(error)
        }
    }


    // function to get the data weather
    const getWeather = async (lat, lon) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

        // Try get the data from the Api and save data
        try {
            const response = await fetch(url);
            const data = await response.json();

            // Values are asigned to variables
            console.log(data)
            setTemperature(data.main.temp);
            setMax(data.main.temp_max);
            setMin(data.main.temp_min);
            setWind(data.wind.speed);
            setHumidity(data.main.humidity);
            setFeel(data.main.feels_like);
            setDescription(data.weather[0].main)

        } catch (error) {
            console.log(error);
        }
    }

    
    /*
    if (description === 'Clear') {
        setDescription('despejado')
    } else if (description === 'Clouds') {
        setDescription('nublado')
    }
    */

    // Call the functions
    useEffect(() => {
        getGeo(city, 1);
    }, [city]);

    useEffect(() => {
        if (lat !== 0 && lon !== 0) {
            getWeather(lat, lon);
        }
    }, [lat, lon]);

    const handleSearch = () => {
        setCity(searchQuery);
    }


    return (
        <>
            <header className='header'>
                <div className="container">
                    <div className="card">

                        <div className="search">
                            <input type="text" name="text" placeholder="Busca tu ciudad..." className="input" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                            <button className="btn-search" onClick={handleSearch}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                                    <path d="M21 21l-6 -6" />
                                </svg>
                            </button>
                        </div>

                        <h2 className='city_title'>{city}, {description}</h2>


                        <div className="datos w-100 row">
                            <div className='temperature col-lg-4 col-sm-12'>
                                <h3 className='temperature__title'>Temperatura Actual</h3>
                                <p className='temperature__data'>{temperature}°</p>
                                <img className='icon-w' src={Icons(description)} alt="" />
                            </div>


                            <div className='general_data col-lg-8 col-sm-12 row'>
                                <div className='wind col-lg-4 col-sm-12'>
                                    <h3>Viento: </h3>
                                    <p>{wind} km/h</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-wind" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M5 8h8.5a2.5 2.5 0 1 0 -2.34 -3.24" />
                                        <path d="M3 12h15.5a2.5 2.5 0 1 1 -2.34 3.24" />
                                        <path d="M4 16h5.5a2.5 2.5 0 1 1 -2.34 3.24" />
                                    </svg>
                                </div>

                                <div className='wind col-lg-4 col-sm-12'>
                                    <h3>Humedad: </h3>
                                    <p>{humidity} %</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-droplet" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M7.502 19.423c2.602 2.105 6.395 2.105 8.996 0c2.602 -2.105 3.262 -5.708 1.566 -8.546l-4.89 -7.26c-.42 -.625 -1.287 -.803 -1.936 -.397a1.376 1.376 0 0 0 -.41 .397l-4.893 7.26c-1.695 2.838 -1.035 6.441 1.567 8.546z" />
                                    </svg>
                                </div>

                                <div className='wind col-lg-4 col-sm-12'>
                                    <h3>Sensación térmica: </h3>
                                    <p>{feel}°</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-temperature" width="40" height="40" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M10 13.5a4 4 0 1 0 4 0v-8.5a2 2 0 0 0 -4 0v8.5" />
                                        <path d="M10 9l4 0" />
                                    </svg>
                                </div>
                            </div>
                        </div>



                        <div className="minmaxContainer">
                            <div className="min">
                                <p className="minHeading">Min</p>
                                <p className="minTemp">{min}°</p>
                            </div>
                            <div className="max">
                                <p className="maxHeading">Max</p>
                                <p className="maxTemp">{max}°</p>
                            </div>
                        </div>


                    </div>
                </div>

            </header >
        </>
    )
}

export default Home