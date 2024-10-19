import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiService = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/api/v1',
    prepareHeaders: (headers) => {
      // Récupérer le token depuis le localStorage à chaque requête
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: '/user/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    fetchUserProfile: builder.query({
      query: () => '/user/profile', // Endpoint pour récupérer le profil utilisateur
      providesTags: ['UserProfile'], // Marque les données pour une gestion du cache
    }),
    updateUserProfile: builder.mutation({
      query: (updatedUserData) => ({
        url: '/user/profile',
        method: 'PUT',
        body: updatedUserData,
      }),
      invalidatesTags: ['UserProfile'], // Invalide le cache après mise à jour
    }),
  }),
})

export const {
  useLoginUserMutation,
  useFetchUserProfileQuery,
  useUpdateUserProfileMutation,
} = apiService
