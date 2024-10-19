import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import './ModalConnexion.css'

function ModalConnexion() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Récupérer les états de loading, error, user et token depuis Redux
  const { loading, error, user, token } = useSelector((state) => state.auth)

  useEffect(() => {
    if (user && token) {
      navigate('/dashboard')
    }
  }, [user, token, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(loginUser({ email: username, password }))
  }

  return (
    <section className="sign-in-content">
      <FontAwesomeIcon icon={faUserCircle} className="svg-user-icon" />
      <h2>Sign In</h2>

      <form onSubmit={handleSubmit}>
        <div className="div-wrapper">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </div>

        <div className="div-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>
        <div className="input-remember">
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>

        <button className="sign-in-button" type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Sign In'}
        </button>

        {error && <p className="error-message">{error}</p>}
      </form>
    </section>
  )
}

export default ModalConnexion
