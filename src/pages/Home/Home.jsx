import Banner from '../../components/banner/Banner'
import NavBar from '../../components/navBar/NavBar'
import FeatureItem from '../../components/featureItem/FeatureItem'
import featuresData from '../../data/argentBankData.json'
import Footer from '../../components/footer/Footer'
import './Home.css'

function Home() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <Banner />
        <section className="features">
          <h2 className="sr-only">Features</h2>
          {featuresData.features.map((features) => (
            <FeatureItem
              key={features.id}
              imgSrc={features.imgSrc}
              imgAlt={features.imgAlt}
              title={features.title}
              description={features.description}
            />
          ))}
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Home
