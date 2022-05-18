import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase"

function deletePost({id}) {

  deleteDoc(doc(db, 'posts', id))
  
return }

export default deletePost