import Footer from '../../components/footer/Footer'
import ModalConnexion from '../../components/modalConnexion/ModalConnexion'
import NavBar from '../../components/navBar/NavBar'

import './Login.css'

function Login() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="main bg-dark">
        <ModalConnexion />
      </main>
      <Footer />
    </>
  )
}

export default Login
