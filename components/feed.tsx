import { useSession } from "next-auth/react"
import MiniProfile from "./MiniProfile"
import Posts from "./posts"
import { db } from '../firebase'
import { useEffect, useState } from "react"
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore"
import Moment from 'react-moment'


function Feed() {
    const {data : session } = useSession()
    const [currPosts,setPosts] = useState([])

    useEffect (() => 
        onSnapshot(query(collection(db,'posts'), 
        orderBy('timeStamp','desc')
        ),
        (snapshot) => setPosts(snapshot.docs)),
        [db]
    )

    return (
      <body className="bg-black">
      <main className= {`grid grid-cols-1 md:grid-cols-2 md:max-w-3xl 
      xl:grid-cols-3 xl:max-w-4xl mx-auto ${!session 
        && "!grid-col-1 !max-w-4xl"}`}>
          <section className="col-span-2">
            <Posts />
          </section>
        
          <section className="hidden xl:inline-grid" >
            <div className="fixed top-20">
            {session && (
              <MiniProfile />)}
              <div className="mt-10 ml-10 text-white pt-5">
                <h1 className="pb-5">Recent Snaps</h1>
                <div className="ml-2 h-40 overflow-auto scrollbar-thumb-black
            scrollbar-thin text-white">
                {currPosts.map((post) => (
                  <div key={post.id} className="flex items-center space-x-2 mb-3">
                    <img 
                        className="h-7 rounded-full"
                        src = {post.data().profileImg}
                        alt=""
                    />
                  <p className="flex-1 text-sm text-white">
                      <span className="font-bold ">{post.data().caption}
                      </span>{" "}
                  </p>
                  <Moment fromNow className="pr-20 text-xs text-white">
                  {post.data().timeStamp?.toDate()}
                  </Moment>
              </div>

                )
                )}
                </div>
                
                

              </div>
            </div>
            
            
          </section>
        
      </main>
      </body>
    )
  }
  
  export default Feed
  