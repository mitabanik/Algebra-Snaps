import { deleteDoc, doc } from "firebase/firestore";
import { useRecoilState } from "recoil";
import { db } from "../../firebase"
import {popupState} from "../../atoms/modalAtom";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

function deletePost() {

  const [postToDelete, setpostToDelete] = useRecoilState(popupState)
  const popup = postToDelete != null
  
return (
  <Transition.Root
        show={popup}
        as={Fragment}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Dialog
        as='div'
        className='fixed z-10 inset-0 overflow-y-auto'
        onClose={() => setpostToDelete(null)}>

        <div className="flex item-end justify-center min-h-[800px] 
        sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
           <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveTo="opacity-100"
            leaveFrom="opacity-0"
            >
           <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

           </Transition.Child>
              <span 
              className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
               &#8203
              </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveTo="opacity-100 translate-y-0 sm:scale-100"
              leaveFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
        
              <div className="inline-block align-center bg-white rounded-lg px-4
              pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8
              sm:max-w-sm sm:w-full sm:p-6">
                <p className="flex items-center justify-center m-10">
                  Delete this post?
                </p>
                <div className="flex items-center justify-center">
                  <button className="mt-2 flex-auto  rounded-md border
                    border-transparent shadow-sm py-2 bg-red-600 text-base font-medium
                    text-white hover:bg-red-700 focus:outline-none focus:ring-offset-2 focus:ring-red-500 
                    sm:text-sm disabled:bg-gray-300" onClick={() => {
                    deleteDoc(doc(db, 'posts', postToDelete))
                    setpostToDelete(null)}
                    }>Yes</button>

                  <button className="mt-2 flex-auto  ml-3 rounded-md border
                    border-transparent shadow-sm py-2 bg-slate-400 text-base font-medium
                    text-white hover:bg-slate-400 focus:outline-none focus:ring-offset-2 focus:ring-slate-400
                    sm:text-sm disabled:bg-gray-300"  onClick={() => setpostToDelete(null)}>No</button>
                </div>
              </div>
            </Transition.Child>
        </div>
    </Dialog>
</Transition.Root>
)
  
}

export default deletePost





