import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import { apiService } from '../services/apiService'

// Configuration du store Redux avec Redux Toolkit.
// configureStore est une fonction qui simplifie la création du store et intègre déjà certains outils comme Redux DevTools.

export const store = configureStore({
  // Définition des différents réducteurs (reducers) qui géreront les parties de l'état global de l'application
  reducer: {
    // Le réducteur authReducer gère l'état d'authentification de l'utilisateur (login, token, user).
    auth: authReducer,

    // Le réducteur de apiService, géré par RTK Query, permet de centraliser les requêtes API
    // et d'avoir un cache automatique des données récupérées.
    [apiService.reducerPath]: apiService.reducer,
  },

  // Ajout d'un middleware personnalisé, ici on concatène le middleware par défaut avec celui fourni par RTK Query.
  // Ce middleware gère les requêtes réseau (côté API) et met à jour l'état des requêtes dans le store Redux.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiService.middleware),
})
