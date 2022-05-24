import { EmojiHappyIcon, HeartIcon, TrashIcon } from "@heroicons/react/outline"
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid"
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query, serverTimestamp, setDoc, where } from "firebase/firestore"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { db } from '../../firebase'
import Moment from 'react-moment'
import DeletePost from "./DeletePost"
import 'reactjs-popup/dist/index.css';
import { useRecoilState } from "recoil"
import { popupState } from "../../atoms/modalAtom"

function Post({id, uid, username, userImg, img, caption, timeStamp}) {
  const { data:session } = useSession()
  const [comments,setComments] = useState([])
  const [comment,setComment] = useState("")
  const [likes,setLikes] = useState([])
  const [hasLiked, setHasLiked] = useState(false)
  const [popup,setPopup] = useRecoilState(popupState)

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
  }}

  const sameUser = session?.user?.id === uid

  const ondeletePost = () => {
    setPopup(id)
  }

  const sendComment = async (e) => {
    e.preventDefault()

    const commentToSend = comment
    setComment("");

    await addDoc(collection(db, 'posts', id, 'comments'),{
    userId : session.user.id,
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
    <p className="flex text-xs text-slate-400"> Posted 
    <Moment className='pb-5 pl-1 pr-2' fromNow >
    {timeStamp?.toDate()}
    </Moment> 

    {/* Deleting Posts */}

    {sameUser && (
      <TrashIcon onClick= {ondeletePost}
      className="btn text-red-300 h-4">
      </TrashIcon>
      )}
      </p>
    </div>
    
    <div>
      <img src={img} className="object-contain w-full" alt="" />
    </div>
    {session && (
    <div className="flex justify-between px-4 pt-4">
      <div className="flex space-x-2">

        {/* Likes */}

        {hasLiked ? (
          <HeartIconFilled 
          onClick={likePost} 
          className="btn text-red-500"/>
        ) : (
          <HeartIcon onClick={likePost} className="btn"/>
        )
        }
        {likes.length > 0 && (
        <p className="font-xs text-white">{likes.length} </p>
        )}
      </div>
    </div>
  )}

  <p className="p-4 text-slate-400" >
    <span className="font-bold mr-2 text-white">{username}</span>
    {caption}
  </p>

  {/* Comments */}

  {comments.length > 0 && (
    <div className="ml-5 h-15 overflow-y-scroll scrollbar-thumb-black
    scrollbar-thin pl-5">
    {comments.map((comment) => (
      <div key={comment.id} className="flex items-center space-x-2 mb-3">
      <img 
      className="h-7 rounded-full"
      src = {comment.data().userImage}
      alt=""
      />
      <p className="flex-1 text-sm text-white">
        <span className="font-bold pr-2">{comment.data().username}
        </span>{" "}
        {comment.data().comment}
      </p>
      <Moment fromNow className="text-xs text-slate-400 pr-2">
      {comment.data().timeStamp?.toDate()}
      </Moment>

      {/*  Deleting comments*/}

      {(comment.data().userId === session?.user?.id) && (
        <TrashIcon className='btn h-5 pr-2'
        onClick= {() => {
          deleteDoc(doc(db, 'posts', id, 'comments', comment.id))
        }
      }/>
      )}
      </div>
    ))}
    </div>
    )
  }
  {/* Adding comments*/}

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
