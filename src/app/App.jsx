import { Provider } from 'react-redux'
import { store } from './store'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import Home from '../pages/Home/Home'
import Error from '../pages/Error/Error'
import Login from '../pages/Login/Login'

import ProtectedRoute from '../components/protectedRoute/ProtectedRoute'
import Dashboard from '../pages/Dashboard/Dashboard'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/index" />} />
          <Route path="/index" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* Cette route ne sera accessible que si l'utilisateur est connecté */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
