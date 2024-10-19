import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { setCredentials, logoutUser } from './authActions'
import { apiService } from '../../services/apiService'

// Async thunk pour gérer le login utilisateur. Il permet de créer une action asynchrone
// qui va envoyer les identifiants de l'utilisateur et gérer la logique liée à la réponse de l'API.
export const loginUser = createAsyncThunk(
  'auth/loginUser', // Nom de l'action générée
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      // Envoie une requête API via RTK Query pour authentifier l'utilisateur
      const response = await dispatch(
        apiService.endpoints.loginUser.initiate(credentials)
      ).unwrap() // unwrap permet d'obtenir directement le résultat ou de lever une erreur si nécessaire

      // Récupère le token de la réponse
      const token = response.body.token

      // Si un token est renvoyé, il est stocké et on récupère le profil utilisateur
      if (token) {
        dispatch(setCredentials({ token, user: null })) // Sauvegarder temporairement le token, sans user

        // Envoie une autre requête pour récupérer le profil de l'utilisateur
        const profileResponse = await dispatch(
          apiService.endpoints.fetchUserProfile.initiate()
        ).unwrap()
        const user = profileResponse.body // Récupérer les données de l'utilisateur

        // Si l'utilisateur est trouvé, on met à jour les informations dans le store Redux
        if (user) {
          dispatch(setCredentials({ token, user })) // Met à jour le token et l'utilisateur dans Redux
        }

        // Retourne le token et l'utilisateur pour mettre à jour l'état
        return { token, user }
      }
    } catch (error) {
      // Si une erreur survient, on la retourne via rejectWithValue pour gérer l'erreur proprement
      return rejectWithValue(error.message || 'Login failed')
    }
  }
)

// État initial pour l'authentification de l'utilisateur
const initialState = {
  token: null, // Récupérer le token du localStorage s'il existe
  user: null, // Stocke les informations de l'utilisateur
  loading: false, // Indicateur de chargement lors des actions asynchrones
  error: null, // Gestion des erreurs
}

// Création d'un slice pour l'authentification avec Redux Toolkit
const authSlice = createSlice({
  name: 'auth', // Nom du slice
  initialState, // Définit l'état initial défini plus haut
  reducers: {}, // Pas de reducers locaux, ceux-ci sont gérés par les actions asynchrones

  // extraReducers est utilisé pour gérer les actions asynchrones et externes au slice
  extraReducers: (builder) => {
    builder
      // Lorsqu'on appelle setCredentials (action de mise à jour des identifiants), on met à jour le token et l'utilisateur
      .addCase(setCredentials, (state, action) => {
        const { token, user } = action.payload
        state.token = token
        state.user = user
        // Sauvegarde du token dans le localStorage pour persistance
        localStorage.setItem('token', token)
      })

      // Lorsqu'on appelle logoutUser (action de déconnexion), on réinitialise l'état
      .addCase(logoutUser, (state) => {
        state.token = null
        state.user = null
        // Supprime le token du localStorage lors de la déconnexion
        localStorage.removeItem('token')
      })

      // Gestion de l'état pendant l'exécution du login (l'action est en cours)
      .addCase(loginUser.pending, (state) => {
        state.loading = true // Indique que le chargement est en cours
        state.error = null // Réinitialise l'erreur
      })

      // Lorsque l'action loginUser réussit (avec token et user), on met à jour l'état
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false // Arrête le chargement
        state.token = action.payload.token // Met à jour le token
        state.user = action.payload.user // Met à jour l'utilisateur
      })

      // Si le login échoue, on capture l'erreur et on la stocke dans l'état
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false // Arrête le chargement
        state.error = action.payload || 'Login failed' // Stocke l'erreur dans l'état
      })
  },
})

// Action de déconnexion qui réinitialise le cache de RTK Query et l'état d'authentification
export const logoutWithReset = () => (dispatch) => {
  dispatch(logoutUser()) // Réinitialise l'état d'authentification
  dispatch(apiService.util.resetApiState()) // Réinitialise le cache des requêtes API
}

// Exporte le reducer pour être utilisé dans le store Redux
export default authSlice.reducer
