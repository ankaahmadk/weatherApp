import CityWeatherStyle from '../styles/CityWeather.module.css'
import Link from 'next/link'

const CityWeather = ({ weather ,units ,cityName}) => {
  return (
      <Link href={{ pathname: '/cityWeatherDetails', query: {cityName:cityName, units:units,lon: weather.coord.lon, lat:weather.coord.lat }} }>
        <div className={CityWeatherStyle.card}>
        <p><strong>Condition:</strong>{weather.weather[0].description} </p>
        <p>Click Here to see 7 days Forcast </p>
        </div>
      </Link>
  )
}

export default CityWeather
