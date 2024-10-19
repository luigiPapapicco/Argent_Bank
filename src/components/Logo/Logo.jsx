import logoImg from '../../assets/argentBankLogo.png'
import './Logo.css'

function Logo() {
  return (
    <>
      <img
        className="main-nav-logo-image"
        src={logoImg}
        alt="Argent Bank Logo"
      />
      <h1 className="sr-only">Argent Bank</h1>
    </>
  )
}

export default Logo
