import React from 'react';
import { Weather } from './Weather';

const WeatherInfo: React.FC<{weather: Weather}> = ({weather}) => {
  const { city, humidity, pressure, temp } = weather;

  return (
    <>
    <div>
      <h2>City: {city}</h2>
      <h2>Temperature: {temp}</h2>
      <h2>Humidity: {humidity}</h2>
      <h2>Pressure: {pressure}</h2>
    </div>
    </>
  )
}

export default WeatherInfo;