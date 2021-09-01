import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Weather } from './Weather';
import WeatherInfo from './WeatherInfo';

const App: React.FC = () => {
  const appId = '0961c7d4a45ac4c9aeaad58419175f0c';
  const units = 'imperial';
  const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
  const suffix = `&units=${units}&appid=${appId}`;

  const [weather, setWeather] = useState<Weather | null>(null);

  const getWeather = async (city: string): Promise<void> => {
    const response = await fetch(baseUrl + city + suffix);
    if (response.status === 200) {
      const data = await response.json();
      const weather: Weather = data.main;
      weather.city = data.name;
      setWeather(weather);
    } else {
      setWeather(null);
    }
  }

  const [ city, setCity ] = useState<string>('London');
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setCity(event.target.value);
  }

  const handleSummit = (event: FormEvent): void => {
      event.preventDefault();
      getWeather(city);
  }

  useEffect(() => {
    getWeather(city);
  }, []);

  const has = (value: any): value is boolean => !!value;

  return (
    <>
      <form onSubmit={handleSummit}>
        <h2>City: {city}</h2>
        <input type="text" placeholder="Enter city" onChange={handleChange}></input>
        <button type="submit">Get Weather</button>
      </form>
      {has(weather) ? (
        <WeatherInfo weather={weather} />
      ) : (
        <p>No weather available</p>)
      }
    </>
  );
}

export default App;
