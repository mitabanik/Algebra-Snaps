import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Post from './Post'
import { db } from '../../firebase'

function Posts() {

  const [posts, setPosts] = useState([])

   useEffect(
    () => 
    onSnapshot(
      query(collection(db, 'posts'), orderBy('timeStamp','desc')),
      (snapshot) => {
        setPosts(snapshot.docs)
    }),
  [db]
  )
    
  return (
    <div>
    {posts.map((post) => (
      <Post key={post.id} 
      id={post.id}
      uid={post.data().uid}
      username={post.data().username}
      userImg={post.data().profileImg}
      img ={post.data().image}
      caption={post.data().caption}
      timeStamp={post.data().timeStamp}
      />
      ))}
    </div>
    )
  }

  export default Posts
