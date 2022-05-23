import Header from '../components/header'
import Feed from '../components/feed'
import Modal from '../components/Modal'
import DeletePost from '../components/postComponent/DeletePost'

function Home()  {
  return (
    <div>
      <section>
        <Header/>
        <Feed />
        <Modal />
        <DeletePost/>
      </section>

    </div>
  )
}

export default Home

