import React, { useEffect, useState } from 'react';
import './Home.css';

const Home = () => {

    // Api Key for the Api string
    const apiKey = '383824eaecc7d80737ecf7a5cf964baa';

    // Data for the app
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
        const url =  `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${apiKey}`;

        // Try get the data from the Api and save data
        try {
            const response = await fetch(url);
            const data = await response.json();

            // Values are asigned to variables
            setLat(data[0].lat);
            setLon(data[0].lon);
        }
        catch(error) {
            console.log(error)
        }
    }


    // function to get the data weather
    const getWeather = async(lat, lon) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        // Try get the data from the Api and save data
        try {
            const response = await fetch(url);
            const data = await response.json();

            // Values are asigned to variables
            console.log(data)
            setTemperature(data.main.temp);
            setMax(data.main.temp_max);
            setMin(data.main.temp_min);
        }catch(error) {
            console.log(error);
        }
    }

    // Call the functions
    useEffect(() => {
        getGeo('Puebla',1);
        getWeather(lat, lon);
    }, []);


    return (
        <>
            <h1>Hola</h1>
            
        </>
    )
}

export default Home