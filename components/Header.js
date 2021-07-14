import headerStyles from '../styles/Header.module.css'

const Header = () => {
  return (
    <div>
      <h1 className={headerStyles.title}>
        <span>Weather</span>App
      </h1> 
    </div>
  )
}

export default Header
