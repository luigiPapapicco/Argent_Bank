import Logger from '../Logger/Logger'
import Logo from '../Logo/Logo'
import { Link } from 'react-router-dom'
import './NavBar.css'

function NavBar() {
  return (
    <nav className="main-nav">
      <Link to="/index" className="main-nav-logo">
        <Logo />
      </Link>
      <div className="main-nav-item">
        <Logger />
      </div>
    </nav>
  )
}

export default NavBar
