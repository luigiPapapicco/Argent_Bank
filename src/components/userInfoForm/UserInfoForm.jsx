import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useUpdateUserProfileMutation } from '../../services/apiService'
import { setCredentials } from '../../features/auth/authActions'
import PropTypes from 'prop-types'

import './UserInfoForm.css'

function UserInfoForm({ onSave, onCancel }) {
  const dispatch = useDispatch()

  // Récupérer les informations utilisateur depuis Redux
  const { user } = useSelector((state) => state.auth)
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  useEffect(() => {
    if (user?.userName || user?.firstName) {
      setUsername(user?.userName || '')
      setFirstName(user?.firstName || '')
      setLastName(user?.lastName || '')
    }
  }, [user])

  const [updateUserProfile] = useUpdateUserProfileMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Appeler l'API pour mettre à jour le userName
      const updatedUser = await updateUserProfile({
        userName: username,
      }).unwrap()

      // Vérifiez le retour de l'API
      console.log('Updated user response:', updatedUser)

      // Conserver le token actuel dans localStorage et Redux
      const token = localStorage.getItem('token') // Récupérer le token depuis localStorage

      dispatch(
        setCredentials({
          token: token, // Conserver le token inchangé
          user: {
            ...user, // Conserver les autres informations utilisateur
            userName: updatedUser.body.userName, // Mettre à jour uniquement le userName
          },
        })
      )

      onSave() // Fermer le formulaire après la sauvegarde
    } catch (error) {
      console.error('Error updating user name:', error)
    }
  }

  return (
    <form className="edit-user-info-form" onSubmit={handleSubmit}>
      <h2>Edit user info</h2>

      <div className="input-wrapper">
        <label htmlFor="username">User Name :</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
      </div>

      <div className="input-wrapper">
        <label htmlFor="firstName">First Name :</label>
        <input type="text" id="firstName" value={firstName} readOnly />
      </div>

      <div className="input-wrapper">
        <label htmlFor="lastName">Last Name :</label>
        <input type="text" id="lastName" value={lastName} readOnly />
      </div>

      <div className="div-button">
        <button type="submit" className="user-info-button">
          Save
        </button>
        <button type="button" className="user-info-button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  )
}

UserInfoForm.propTypes = {
  onSave: PropTypes.func.isRequired, // onSave est une fonction requise
  onCancel: PropTypes.func.isRequired, // onCancel est une fonction requise
}

export default UserInfoForm
