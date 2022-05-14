import { EmojiHappyIcon, HeartIcon } from "@heroicons/react/outline"
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid"
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, serverTimestamp, setDoc, where } from "firebase/firestore"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { db } from '../firebase'
import Moment from 'react-moment'

function Post({id, uid, username, userImg, img, caption, timeStamp}) {
  const { data:session } = useSession()
  const [comments,setComments] = useState([])
  const [comment,setComment] = useState("")
  const [likes,setLikes] = useState([])
  const [hasLiked, setHasLiked] = useState(false)

   

  useEffect (() => 
  onSnapshot(query(collection(db,'posts', id, 'comments'), 
  orderBy('timeStamp','desc')
  ),
  (snapshot) => setComments(snapshot.docs)),
    [db, id]
  )

  useEffect(() => {
    setHasLiked(likes.findIndex((like) => like.id === session?.user?.id) !== -1
    ),
    [likes]
  })

  useEffect(() => 
    onSnapshot(query(collection(db,'posts', id, 'likes')),
    (snapshot) => setLikes(snapshot.docs)
    ),
    [db,id]
  )

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, 'posts', id, 'likes', session.user.id))
    }
    else {
      await setDoc(doc(db, 'posts', id, 'likes', session.user.id),
      {
        username: session.user.name
      })
  }
}


  const sendComment = async (e) => {
    e.preventDefault()

    const commentToSend = comment
    setComment("");

    await addDoc(collection(db, 'posts', id, 'comments'),{
    comment: commentToSend,
    username: session.user.username,
    userImage: session.user.image,
    timeStamp: serverTimestamp()
  })
  }
  return (
  
  <div className="bg-black my-5 border rounded-lg">
    <div className="flex items-center p-4 text-white">
    <img src={userImg} className='rounded-full h-10 w-10
    object-contain border p-1' alt ="" />
    <p className="flex-1 font-bold text-white pl-3">{username}</p>
    <p className="pr-5 text-xs text-white"> Posted <Moment fromNow >
    {timeStamp?.toDate()}
    </Moment> </p>
    </div>
  
    <div>
    <img src={img} className="object-fit w-full" alt=""/>
    </div>
  {session && (
    <div className="flex justify-between px-4 pt-4">
    <div className="flex space-x-4">
      {hasLiked ? (
        <HeartIconFilled 
        onClick={likePost} 
        className="btn text-red-500"/>
      ) : (
        <HeartIcon onClick={likePost} className="btn"/>
      )
      }
    </div>
    </div>
  )}

  <p className="p-4 truncate text-white" >
    {likes.length > 0 && (
    <p className="font-bold mb-1">{likes.length} likes </p>
    )}
    <span className="font-bold mr-2">{username}</span>
    {caption}
  </p>

  {comments.length > 0 && (
    <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black
    scrollbar-thin">
    {comments.map((comment) => (
      <div key={comment.id} className="flex items-center space-x-2 mb-3">
      <img 
      className="h-7 rounded-full"
      src = {comment.data().userImage}
      alt=""
      />
      <p className="flex-1 text-sm text-white">
        <span className="font-bold ">{comment.data().username}
        </span>{" "}
        {comment.data().comment}
      </p>
      <Moment fromNow className="pr-5 text-xs text-white">
      {comment.data().timeStamp?.toDate()}
      </Moment>
      </div>
    ))}
    </div>
    )
  }

    {session && (
    <form className="flex items-center p-4">
      <EmojiHappyIcon className="h-5 stroke-white pr-4"/>
      <input 
      type="text"
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      className="border-none flex-1 focus:ring-0 outline-none " 
      placeholder=" Add a Comment"
      />
      <button 
      type='submit'
      disabled={!comment.trim()} 
      onClick={sendComment}
      className="font-semibold text-white pl-4">
      Post
      </button>
    </form>
    )}
    </div>
)}

  export default Post
