import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import './Logger.css'
import { useSelector, useDispatch } from 'react-redux'
import { logoutWithReset } from '../../features/auth/authSlice' // Importe la nouvelle action
import { Link, useNavigate } from 'react-router-dom'

function Logger() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Accède à l'état d'authentification dans Redux
  const { token, user } = useSelector((state) => state.auth)

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    dispatch(logoutWithReset()) // Réinitialiser l'état et le cache avec la nouvelle action
    navigate('/') // Redirige vers la page d'accueil après la déconnexion
  }

  return (
    <div className="div-login">
      {token ? (
        // Affichage lorsque l'utilisateur est connecté
        <>
          <div className="user-info">
            <FontAwesomeIcon icon={faUserCircle} className="svg-user-icon" />
            {user?.userName || 'User'}
          </div>
          <button onClick={handleLogout} className="logout-button">
            <FontAwesomeIcon icon={faSignOutAlt} className="svg-logout-icon" />
            Sign Out
          </button>
        </>
      ) : (
        // Affichage lorsque l'utilisateur est déconnecté
        <Link to="/login" className="sign-in-link">
          <FontAwesomeIcon icon={faUserCircle} className="svg-user-icon" />
          Sign In
        </Link>
      )}
    </div>
  )
}

export default Logger
