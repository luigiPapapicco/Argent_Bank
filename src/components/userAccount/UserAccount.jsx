import { useState } from 'react'
import { useSelector } from 'react-redux'
import AccountSection from '../accountSection/AccountSection'
import userDataBank from '../../data/argentBankData.json'
import './UserAccount.css'
import UserInfoForm from '../userInfoForm/UserInfoForm'

function UserAccount() {
  // Récupérer les informations utilisateur depuis Redux
  const user = useSelector((state) => state.auth.user)

  // useEffect(() => {
  //   // Log détaillé pour vérifier l'état actuel de l'utilisateur dans Redux
  //   console.log('User in UserAccount:', user)
  // }, [user])

  const [isEditing, setIsEditing] = useState(false)

  const toggleEditMode = () => {
    setIsEditing(!isEditing)
  }

  const handleFormClose = () => {
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
  }

  const userName = user?.userName || user?.firstName || 'User' // Utiliser le firstName s'il est disponible

  return (
    <>
      {!isEditing ? (
        <div className="div-title">
          <h2 className="main-title">
            Welcome back <br />
            {userName}!
          </h2>
          <button
            type="button"
            className="edit-button"
            onClick={toggleEditMode}
          >
            Edit Name
          </button>
        </div>
      ) : (
        <div className="header">
          <UserInfoForm onSave={handleFormClose} onCancel={handleCancelEdit} />
        </div>
      )}

      <h2 className="sr-only">Account</h2>
      {userDataBank.dataBank.map((data) => (
        <AccountSection
          key={data.id}
          accTitle={data.accountTitle}
          accAmount={data.accountAmount}
          accAmountDescription={data.accountAmountDescription}
        />
      ))}
    </>
  )
}

export default UserAccount
