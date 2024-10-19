import PropTypes from 'prop-types'
import './AccountSection.css'

function AccountSection({ accTitle, accAmount, accAmountDescription }) {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{accTitle}</h3>
        <p className="account-amount">{accAmount}</p>
        <p className="account-amount-description">{accAmountDescription}</p>
      </div>
      <button className="transaction-button">View transactions</button>
    </section>
  )
}

AccountSection.propTypes = {
  accTitle: PropTypes.string.isRequired,
  accAmount: PropTypes.string.isRequired,
  accAmountDescription: PropTypes.string.isRequired,
}

export default AccountSection
