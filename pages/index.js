import homeStyle from '../styles/Home.module.css'
import React, { useState } from 'react';
import CityWeather from '../components/CityWeather';
import { loadGetInitialProps } from 'next/dist/next-server/lib/utils';

export default function Home() {
  const [weather, setWeather] = useState({});
  const [message, setMessage] = useState('select City');
  const [cityName, setCityName] = useState('');
  var unitsValue = 'metric'
  if (typeof window !== "undefined") {
    unitsValue = localStorage.getItem('units')
  }
  const [units, setUnits] = useState(unitsValue);
  const searchCiry = async (event) => {
    event.preventDefault()
    const cityName = event.target.name.value
    setCityName(cityName)
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=446ddecef77cf67d31df1c128ef3bbdb`)
      const weather = await res.json();
      if (weather.cod === 200) {
        setWeather(weather)
      } else {
        setMessage('City Not found');
        setWeather({});
      }
    } catch (err) {
      console.log('empty')
    }
  }


  const handelChange = (event) => {
    if (typeof window !== "undefined") {
      localStorage.setItem('units', event.target.value)
    }
    loadGetInitialProps
    setUnits(event.target.value);
  }

  return (

    <div>
      {console.log(units)}
      <lable>Units:</lable>
      <select id="units" onChange={handelChange} value={units} className={homeStyle.cityText}>     
        <option value="metric">metric</option>
        <option value="imperial">imperial</option>
      </select>
      <form onSubmit={searchCiry}>
        <input id="name" type="text" autoComplete="City" className={homeStyle.cityText} required />
        <button type="submit" className={homeStyle.submit}>search</button>
      </form>
      {
        (Object.keys(weather).length !== 0 ? <CityWeather weather={weather} units={units} cityName={cityName}/> : <h2>{message}</h2>)
      }
    </div>
  )
}

