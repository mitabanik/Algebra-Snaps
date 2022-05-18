import Header from '../components/header'
import Feed from '../components/feed'
import Modal from '../components/postComponent/Modal'

function Home()  {
  return (
    <div>
      <section>
        <Header/>
        <Feed />
        <Modal />
      </section>

    </div>
  )
}

export default Home

