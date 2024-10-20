import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'

function ProtectedRoute({ children }) {
  const token = useSelector((state) => state.auth.token)
  const user = useSelector((state) => state.auth.user)

  // Si l'utilisateur et le token sont absents, rediriger vers la page de login
  if (!token || !user) {
    return <Navigate to="/login" />
  }

  return children
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
}
export default ProtectedRoute
