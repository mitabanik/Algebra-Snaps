import { useSession } from "next-auth/react"
import MiniProfile from "./MiniProfile"
import Posts from "./postComponent/posts"
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
    <body className="bg-slate-500">
    <main className= {`grid grid-cols-1 md:grid-cols-5 md:max-w-5xl md:gap-4
    xl:grid-cols-7 xl:max-w-screen-2xl ml-auto xl:ml-40 ${!session 
      && "!grid-col-3"}`}>
        <div className="xl:col-start-1 xl:col-span-4 md:col-span-3">
          <Posts />
        </div>
        
        {/* Mini Profile Sidebar*/}

        <div className="hidden xl:inline-grid md:inline-grid bg-slate-800 xl:col-start-6 xl:col-span-2 md:col-start-4 md:col-span-2">
          <div className="fixed top-20 grid grid-col-1 divide-y">
          {session && (
            <MiniProfile />)}
            <div className=" text-white pt-5">

            {/* Showing all the recent snaphots */}

            <section className="hidden xl:grid xl:grid-col-1 xl:divide-y md:inline-grid">
                <div className="h-60 overflow-auto scrollbar-thumb-black
                  scrollbar-thin text-white grid grid-cols-1 divide-y-[1px] divide-gray-600">
                {currPosts.map((post) => (
                  <div key={post.id} className="flex items-center space-x-2">
                    <img 
                        className="h-7 rounded-full ml-5"
                        src = {post.data().profileImg}
                        alt=""
                    />
                  <p className="flex-1 text-sm text-white">
                      <span className="text-slate-400">{post.data().caption}
                      </span>{" "}
                  </p>
                  <Moment fromNow className="text-xs pr-2 text-slate-300">
                  {post.data().timeStamp?.toDate()}
                  </Moment>
                </div>
                )
              )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  </body>
  )
}

export default Feed
  