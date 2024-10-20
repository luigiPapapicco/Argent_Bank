import Footer from '../../components/footer/Footer'
import NavBar from '../../components/navBar/NavBar'
import UserAccount from '../../components/userAccount/UserAccount'

function Dashboard() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="main bg-dark">
        <UserAccount />
      </main>
      <Footer />
    </>
  )
}

export default Dashboard
